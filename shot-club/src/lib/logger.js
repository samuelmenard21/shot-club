import fs from 'fs'
import path from 'path'

class Logger {
  constructor(logDir = './logs') {
    this.logDir = logDir
    this.ensureLogDir()
  }

  ensureLogDir() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true })
    }
  }

  getLogFileName(name) {
    const date = new Date().toISOString().split('T')[0]
    return path.join(this.logDir, `${name}-${date}.log`)
  }

  formatMessage(level, message, context = {}) {
    const timestamp = new Date().toISOString()
    const contextStr = Object.keys(context).length > 0 ? ` ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level}] ${message}${contextStr}\n`
  }

  log(name, level, message, context = {}) {
    const formatted = this.formatMessage(level, message, context)
    const filePath = this.getLogFileName(name)

    try {
      fs.appendFileSync(filePath, formatted, 'utf-8')
    } catch (error) {
      console.error(`Failed to write log: ${error.message}`)
    }
  }

  info(name, message, context = {}) {
    this.log(name, 'INFO', message, context)
  }

  error(name, message, context = {}) {
    this.log(name, 'ERROR', message, context)
  }

  warn(name, message, context = {}) {
    this.log(name, 'WARN', message, context)
  }

  debug(name, message, context = {}) {
    this.log(name, 'DEBUG', message, context)
  }
}

export default new Logger('./logs')
