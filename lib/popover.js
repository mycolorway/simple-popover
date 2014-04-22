(function() {
  var Popover,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Popover = (function(_super) {
    __extends(Popover, _super);

    function Popover() {
      this.destroy = __bind(this.destroy, this);
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
      verticalAlign: "middle"
    };

    Popover.arrowWidth = 16;

    Popover.arrowHeight = 16;

    Popover._tpl = {
      popover: "<div class=\"simple-popover\">\n  <div class=\"simple-popover-content\"></div>\n  <div class=\"simple-popover-arrow\">\n    <i class=\"arrow arrow-border-shadow\"></i>\n    <i class=\"arrow arrow-border\"></i>\n    <i class=\"arrow\"></i>\n  </div>\n</div> "
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
        return $(document).on("mousedown.simple-popover", (function(_this) {
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
    };

    Popover.prototype._unbind = function() {
      this.el.off(".simple-popover");
      return $(document).off(".simple-popover");
    };

    Popover.prototype.destroy = function() {
      if (this.pointTo.triggerHandler("popover:beforeDestroy", [this]) === false) {
        return;
      }
      this._unbind();
      this.el.remove();
      this.pointTo.removeClass("popover-pointTo").removeData("popover");
      return $(document).trigger("popover:destroy", [this.pointTo, this.el]);
    };

    Popover.prototype.refresh = function() {
      var arrowHeight, arrowOffset, arrowWidth, bottomNotEnough, direction, directions, left, pointToHeight, pointToOffset, pointToWidth, popoverHeight, popoverWidth, rightNotEnough, scrollLeft, scrollTop, top, winHeight, winWidth;
      pointToOffset = this.pointTo.offset();
      pointToWidth = this.pointTo.outerWidth();
      pointToHeight = this.pointTo.outerHeight();
      winHeight = $(window).height();
      winWidth = $(window).width();
      popoverWidth = this.el.outerWidth();
      popoverHeight = this.el.outerHeight();
      scrollTop = $(document).scrollTop();
      scrollLeft = $(document).scrollLeft();
      arrowWidth = Popover.arrowWidth;
      arrowHeight = Popover.arrowHeight;
      arrowOffset = 8;
      top = 0;
      left = 0;
      directions = ["direction-left-top", "direction-left-middle", "direction-left-bottom", "direction-right-top", "direction-right-bottom", "direction-right-middle", "direction-top-left", "direction-top-right", "direction-top-center", "direction-bottom-left", "direction-bottom-right", "direction-bottom-center"];
      this.el.removeClass(directions.join(" "));
      if (this.opts.position) {
        this.el.addClass("direction-" + this.opts.position);
      } else {
        bottomNotEnough = winHeight + scrollTop - pointToOffset.top - pointToHeight < popoverHeight + 10;
        rightNotEnough = winWidth + scrollLeft - pointToOffset.left - pointToWidth < popoverWidth + 20;
        direction = ["right", "bottom"];
        if (rightNotEnough) {
          direction[0] = "left";
        }
        if (bottomNotEnough) {
          direction[1] = "top";
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
      if (/direction-[top|bottom]/.test(this.el.attr("class"))) {
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
      if (/direction-[left|right]/.test(this.el.attr("class"))) {
        switch (this.opts.verticalAlign) {
          case "top":
            left -= pointToHeight / 2;
            break;
          case "bottom":
            left += pointToHeight / 2;
            break;
          default:
            break;
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
