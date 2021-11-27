const {createLogger, format, transports, config} = require('winston');
const winston = require('winston/lib/winston/config');

//TODOL consider adding file level logs and AWS CloudWatch here to transports
const eventsLogger = createLogger({
    levels: config.syslog.levels,
    transports : [
        new transports.Console({level: 'error', timestamp: true, colorize: true}),
        new transports.File({
            filename: 'info.log', 
            level: `info`
        }),
        new transports.File({
            filename: 'error.log',
            level: `error`
        })
    ]
});

module.exports = eventsLogger;
