import winston from "winston";

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'logs/server.log'
        }),
        new winston.transports.Console()
    ],
    'format': winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
}

export const logger = winston.createLogger(logConfiguration);

