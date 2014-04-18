# 
# describe 'basic usage', ->
#   it 'should replace variables with data params', ->
#     tpl = '''
#       <p>{{ x }}</p>
#       <p>{{ y.str }}</p>
#     '''
# 
#     result = simple.tpl(tpl, {
#       x: 'basic usage'
#       y: {
#         str: 'deep data'
#       }
#     })
# 
#     expect(result).toEqual($.trim('''
#       <p>basic usage</p>
#       <p>deep data</p>
#     '''))
# 
# 
# describe 'template with filter', ->
#   it 'should filter data while replacing the variables', ->
#     tpl = '''
#       <p>{{ timeFormat | strftime 'YYYY-MM-DD' }}</p>
#       <p>{{ default | default 'This is default value' }}</p>
#       <p>{{ prettyDate | prettyDate }}</p>
#       <p>{{ humanSize | humanSize }}</p>
#       <p>{{ truncate | truncate 10 }}</p>
#     '''
# 
#     result = simple.tpl(tpl, {
#       timeFormat: 'Tue Mar 25 2014 18:06:51 GMT+0800',
#       default: null,
#       prettyDate: moment().add('hour', -4).toString(),
#       humanSize: 2048,
#       truncate: '这里只能显示十个字超过就会被截断'
#     })
# 
#     expect(result).toEqual($.trim('''
#       <p>2014-03-25</p>
#       <p>This is default value</p>
#       <p>4小时前</p>
#       <p>2K</p>
#       <p>这里只能显示十个字超...</p>
#     '''))
    
