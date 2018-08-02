const schedule = require('node-schedule')
const moment = require('moment')
const fs = require('fs')

module.exports =  ({
    folder = './logs',
    hour = 0,
    minute = 1,
})=>{

    schedule.scheduleJob({
        hour,
        minute,
    }, () => {
        const dir = moment().format('YYYY-MM-DD-HH-mm')
        console.log('日志更新了')
        fs.exists(folder,exists=>{
            if(!exists){
                fs.mkdir(folder)
            }

            let logs = []

            fs.readdirSync(folder)
            .filter(x=>{
                var stat = fs.lstatSync(`${folder}/${x}`)
                if(!stat.isDirectory()){
                    logs.push(x)
                }
            })

            fs.mkdir(`./${folder}/${dir}`, () => {
                logs.map(itm => {
                    const readerStream = fs.createReadStream(`./logs/${itm}`);
                    let data = '';
                    readerStream.setEncoding('UTF8');
                    readerStream.on('data', chunk=> data += chunk);
                    readerStream.on('end', () => {
                        let writerStream = fs.createWriteStream(`./logs/${dir}/${itm}`);
                        writerStream.write(data, 'UTF8');
                        writerStream.end();
                        writerStream.on('finish', () => {
                            writerStream = fs.createWriteStream(`./logs/${itm}`);
                            writerStream.write('');
                            writerStream.end();
                        });
                    });
                })
            })
        });
    })
}
