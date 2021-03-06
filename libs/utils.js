const path = require('path')

// 以项目根目录生成路径
exports.resolveProjectPath = (...toPath) => path.join(process.cwd(), ...toPath)

// 以脚手架目录生成路径
exports.resolveAutosPath = (...toPath) => path.join(__dirname, '../../', ...toPath)
