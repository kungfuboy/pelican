import EditTable from '../EditTable'
import { Component } from 'react'

class RenderTemplate extends Component {
  constructor(props) {
    super()
  }
  updateFile = (data, index, ast) => {
    // 组合数据结构
    const _data = Object.assign({}, data)
    _data.children[index] = ast
    this.props.updateFile(_data)
  }
  selectTemplate = data => {
    if (!data) {
      return ''
    }
    return data.children.map((element, index) => {
      if (element.tagName === 'el-table') {
        return (
          <EditTable
            key={index}
            data={element}
            updateFile={ast => this.updateFile(data, index, ast)}
          />
        )
      }
    })
  }
  render() {
    return <section>{this.selectTemplate(this.props.data)}</section>
  }
}

export default RenderTemplate
