import path from 'node:path'

export default {
  mini: {
    compile: {
      include: [path.resolve(__dirname, '..', '..', 'node_modules', 'chart.js')]
    }
  }
}
