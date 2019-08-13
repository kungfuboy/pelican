import { Component } from 'react'
import IconDelete from '../../icon/IconDelete'

class AttrList extends Component {
  constructor(props) {
    super()
  }
  renderList = (data, key) => {
    return data.map((item, index) => (
      <div className="tr" key={index}>
        <div className="td">
          {`${key}-${index}prop` === this.props.activeKey ? (
            <input
              value={item.prop}
              onBlur={this.props.inputBlur}
              onKeyPress={this.props.inputEnterPress}
              onChange={e =>
                this.props.updateAttr(e.target.value, `${key}-${index}`)
              }
            />
          ) : (
            <span
              onDoubleClick={() =>
                this.props.changeActiveKey(`${key}-${index}prop`)
              }
            >
              {item.prop}
            </span>
          )}
        </div>
        <div className="td">
          {`${key}-${index}value` === this.props.activeKey ? (
            <input
              value={item.value}
              onBlur={this.props.inputBlur}
              onKeyPress={this.props.inputEnterPress}
              onChange={e =>
                this.props.updateValue(e.target.value, `${key}-${index}`)
              }
            />
          ) : (
            <span
              onDoubleClick={() =>
                this.props.changeActiveKey(`${key}-${index}value`)
              }
            >
              {item.value !== null ? item.value : '无'}
            </span>
          )}
        </div>
        <span className="delete-icon">
          <IconDelete handleDelete={() => this.props.handleDelete(index)} />
        </span>
      </div>
    ))
  }
  render() {
    return (
      <div className="tbody">
        {this.renderList(this.props.data, this.props.keys)}
      </div>
    )
  }
}

export default AttrList
