const files = require.context('.', false, /\.js$/)
const fileObj = {}
const data = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  fileObj[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

for (let item in fileObj) {
  data[item] = fileObj[item]
//   Object.assign(data, fileObj[item])
}

export default data