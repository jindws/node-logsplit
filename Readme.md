> 定时任务,每天切割 日志文件

```
const logsplit = require('node-logsplit')

logsplit({
    // folder:'./logs',//日志所在的目录,默认 './logs'
    // hour:0,//定时任务启动时间 小时数,默认0
    // minute:1,//定时任务启动时间 分钟数,默认1
})

```
