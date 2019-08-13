import { Component } from 'react'
import Button from './Button'
import '../assets/template.less'

class Template extends Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      id: 0
    }
  }
  handleSubmit = name => {
    if (!name) {
      throw new Error('未输入文件名')
    }
    this.props.handleSubmit({ name, id: this.state.id })
  }
  handleChoose = n => {
    this.setState({ id: n })
  }
  filter = id => {
    const hash = new Map()
      .set(0, null)
      .set(1, '表格')
      .set(2, '表单')
    const res = hash.get(id)
    if (!res) {
      return <span>请选择一个组件类型</span>
    }
    return <span>将会创建一个{res}组件</span>
  }
  render() {
    return (
      <section className="template">
        <div className="content">
          <div className="list">
            <Button
              handleClick={() => this.handleChoose(1)}
              type={['big', 'fill']}
            >
              表格
            </Button>
            <Button type={['big', 'fill', 'disable']}>表单</Button>
            <Button
              handleClick={() => this.handleChoose(9)}
              type={['big', 'fill']}
            >
              其他
            </Button>
          </div>
          <div className="name">
            <input
              placeholder="New File Name"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <span>.vue</span>
          </div>
          <div className="preview">
            {this.filter(this.state.id)}
            <img
              onClick={() => this.handleSubmit(this.state.name)}
              src="../static/icon/send.svg"
            />
          </div>
        </div>
      </section>
    )
  }
}
export default Template
