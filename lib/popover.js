(function() {
  var Popover,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Popover = (function(_super) {
    __extends(Popover, _super);

    function Popover() {
      return Popover.__super__.constructor.apply(this, arguments);
    }

    Popover.prototype.opts = {
      pointTo: null,
      content: null,
      position: null,
      offset: null,
      autohide: true,
      cls: null,
      align: "center",
      verticalAlign: "middle",
      autoAdjustPosition: true
    };

    Popover._directions = ["direction-left-top", "direction-left-middle", "direction-left-bottom", "direction-right-top", "direction-right-bottom", "direction-right-middle", "direction-top-left", "direction-top-right", "direction-top-center", "direction-bottom-left", "direction-bottom-right", "direction-bottom-center"];

    Popover._tpl = {
      popover: "<div class=\"simple-popover\">\n  <div class=\"simple-popover-content\"></div>\n  <div class=\"simple-popover-arrow\">\n    <i class=\"arrow arrow-shadow-1\"></i>\n    <i class=\"arrow arrow-shadow-0\"></i>\n    <i class=\"arrow arrow-border\"></i>\n    <i class=\"arrow arrow-basic\"></i>\n  </div>\n</div>"
    };

    Popover.prototype._init = function() {
      if (this.opts.pointTo === null) {
        throw "[Popver] - pointTo 位置不明";
      }
      if (this.opts.content === null) {
        throw "[Popver] - 内容不能为空";
      }
      Popover.destroyAll();
      this._render();
      this._bind();
      this.el.data("popover", this);
      return this.refresh();
    };

    Popover.prototype._render = function() {
      this.el = $(Popover._tpl.popover).addClass(this.opts.cls);
      this.pointTo = this.opts.pointTo;
      this.arrow = this.el.find(".simple-popover-arrow");
      this.el.find(".simple-popover-content").append(this.opts.content);
      this.el.appendTo("body");
      return this.pointTo.addClass("popover-pointTo").data("popover", this);
    };

    Popover.prototype._bind = function() {
      this.el.on("click.simple-popover", ".simple-popover-destroy", (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.destroy();
        };
      })(this));
      if (this.opts.autohide) {
        $(document).on("mousedown.simple-popover", (function(_this) {
          return function(e) {
            var target;
            if ($(document).triggerHandler("popover:beforeAutohide", [_this]) === false) {
              return;
            }
            target = $(e.target);
            if (target.is(_this.pointTo) || _this.el.has(target).length || target.is(_this.el)) {
              return;
            }
            return _this.destroy();
          };
        })(this));
      }
      return $(window).on("resize.simple-popover", (function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this));
    };

    Popover.prototype._unbind = function() {
      this.el.off(".simple-popover");
      $(document).off(".simple-popover");
      return $(window).off(".simple-popover");
    };

    Popover.prototype.destroy = function() {
      if (this.triggerHandler("popover:beforeDestroy") === false) {
        return;
      }
      this._unbind();
      this.el.remove();
      this.pointTo.removeClass("popover-pointTo").removeData("popover");
      return $(document).trigger("popover:destroy", [this.pointTo, this.el]);
    };

    Popover.prototype.refresh = function() {
      var arrowHeight, arrowOffset, arrowWidth, bottomSpace, delta, direction, directions, left, leftSpace, pointToHeight, pointToOffset, pointToWidth, popoverHeight, popoverWidth, rightSpace, scrollLeft, scrollTop, top, topSpace, verticalAlign, winHeight, winWidth;
      pointToOffset = this.pointTo.offset();
      pointToWidth = this.pointTo.outerWidth();
      pointToHeight = this.pointTo.outerHeight();
      winHeight = $(window).height();
      winWidth = $(window).width();
      popoverWidth = this.el.outerWidth();
      popoverHeight = this.el.outerHeight();
      scrollTop = $(document).scrollTop();
      scrollLeft = $(document).scrollLeft();
      arrowWidth = this.arrow.width();
      arrowHeight = this.arrow.height();
      arrowOffset = 16;
      top = 0;
      left = 0;
      directions = Popover._directions;
      this.el.removeClass(directions.join(" "));
      if (this.opts.position) {
        direction = "direction-" + this.opts.position;
        if (directions.indexOf(direction) === -1) {
          throw "[Popver] - position 参数不合法，无法正确显示 popover 位置";
        }
        this.el.addClass(direction);
      } else {
        leftSpace = pointToOffset.left - scrollLeft;
        rightSpace = scrollLeft + winWidth - pointToOffset.left - pointToWidth;
        topSpace = pointToOffset.top - scrollTop;
        bottomSpace = scrollTop + winHeight - pointToOffset.top - pointToHeight;
        direction = ["right", "bottom"];
        verticalAlign = "top";
        if (rightSpace < popoverWidth + arrowOffset && leftSpace > rightSpace && leftSpace > popoverWidth + arrowOffset) {
          direction[0] = "left";
        }
        if (topSpace > bottomSpace) {
          direction[1] = "top";
          verticalAlign = "bottom";
        }
        this.el.addClass("direction-" + (direction.join("-")));
      }
      direction = this.el.attr("class").match(/direction-([a-z]+)-([a-z]+)/).slice(1);
      switch (direction[0]) {
        case "left":
          left = pointToOffset.left - arrowHeight - popoverWidth;
          break;
        case "right":
          left = pointToOffset.left + pointToWidth + arrowHeight;
          break;
        case "top":
          top = pointToOffset.top - arrowHeight - popoverHeight;
          break;
        case "bottom":
          top = pointToOffset.top + pointToHeight + arrowHeight;
          break;
        default:
          break;
      }
      switch (direction[1]) {
        case "top":
          top = pointToOffset.top + pointToHeight / 2 + arrowWidth / 2 + arrowOffset - popoverHeight;
          break;
        case "bottom":
          top = pointToOffset.top + pointToHeight / 2 - arrowWidth / 2 - arrowOffset;
          break;
        case "left":
          left = pointToOffset.left + pointToWidth / 2 + arrowWidth / 2 + arrowOffset - popoverWidth;
          break;
        case "right":
          left = pointToOffset.left + pointToWidth / 2 - arrowWidth / 2 - arrowOffset;
          break;
        case "center":
          left = pointToOffset.left + pointToWidth / 2 - popoverWidth / 2;
          break;
        case "middle":
          top = pointToOffset.top + pointToHeight / 2 - popoverHeight / 2;
          break;
        default:
          break;
      }
      if (/top|bottom/.test(direction[0])) {
        switch (this.opts.align) {
          case "left":
            left -= pointToWidth / 2;
            break;
          case "right":
            left += pointToWidth / 2;
            break;
          default:
            break;
        }
      }
      if (/left|right/.test(direction[0])) {
        switch (this.opts.verticalAlign) {
          case "top":
            top -= pointToHeight / 2;
            break;
          case "bottom":
            top += pointToHeight / 2;
            break;
          default:
            break;
        }
      }
      if (this.opts.autoAdjustPosition) {
        if (/top|bottom/.test(direction[0]) && left < scrollLeft) {
          delta = scrollLeft - left;
          left += delta;
          switch (direction[1]) {
            case "left":
              this.arrow.css("right", arrowOffset + delta);
              break;
            case "right":
              this.arrow.css("left", Math.max(arrowOffset - delta, arrowOffset));
              break;
            default:
              this.arrow.css("marginLeft", -arrowOffset / 2 - delta);
          }
        }
        if (/left|right/.test(direction[0]) && top < scrollTop) {
          delta = scrollTop - top;
          top += delta;
          switch (direction[1]) {
            case "top":
              this.arrow.css("bottom", arrowOffset + delta);
              break;
            case "bottom":
              this.arrow.css("top", Math.max(arrowOffset - delta, arrowOffset));
              break;
            default:
              this.arrow.css("marginTop", -arrowOffset / 2 - delta);
          }
        }
      }
      if (this.opts.offset) {
        top += this.opts.offset.top;
        left += this.opts.offset.left;
      }
      return this.el.css({
        top: top,
        left: left
      });
    };

    Popover.destroyAll = function() {
      return $(".simple-popover").each(function() {
        var $this, popover;
        $this = $(this);
        popover = $this.data("popover");
        if (popover.pointTo.index() === -1) {
          return $this.remove();
        } else {
          return popover.destroy();
        }
      });
    };

    return Popover;

  })(Widget);

  this.simple || (this.simple = {});

  this.simple.popover = function(opts) {
    return new Popover(opts);
  };

  this.simple.popover.destroyAll = Popover.destroyAll;

}).call(this);
