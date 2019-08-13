import { useState, useEffect } from 'react'
import { changeTreeState } from '../utils/index.js'
import '../assets/tree.less'
import { split } from '../../../../robin-path/src/split'
import { __values } from 'tslib'

const arr = [
  {
    label: '1',
    value: '',
    options: {},
    active: true,
    children: []
  },
  {
    label: '2',
    value: '',
    options: {},
    active: true,
    children: [
      {
        label: '2-1',
        value: '',
        options: {},
        active: true,
        children: []
      },
      {
        label: '2-2',
        value: '',
        options: {},
        active: true,
        children: [
          {
            label: '2-2-1',
            value: '',
            options: {},
            active: true,
            children: [
              {
                label: '2-2-2-1',
                value: '',
                options: {},
                active: true,
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]

let __count = 0

const paddingLeftCount = key => {
  return key ? key.toString().split('-').length * 18 : 0
}

export default class Tree extends React.Component {
  constructor(props) {
    super()
    this.state = {
      data: [],
      nodeKey: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.treeRender = this.treeRender.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data })
  }
  handleClick(key, value, sign) {
    __count += 1
    this.setState({ nodeKey: key })
    setTimeout(() => {
      if (__count === 1) {
        // 单击
        if (!sign) {
          // 将文件高亮
          this.props.clickFile(key, value, 1)
        } else {
          //   将文件夹展开或收起
          this.setState({ data: changeTreeState(this.state.data, key) })
          this.props.clickDir(key, value)
        }
      }
      if (__count === 2) {
        // 双击
        if (!sign) {
          // 先将文件高亮
          this.props.clickFile(key, value, 2)
        } else {
          // 双击不对文件夹进行处理
        }
      }
      __count = 0
    }, 200)
  }

  treeRender(data, key) {
    return data.map((item, index) => {
      if (item.children.length) {
        return (
          <li key={index}>
            <ul className={item.expand ? 'expand' : ''}>
              <span
                className={item.active ? 'active' : ''}
                className={
                  this.state.nodeKey ===
                  (key != null ? `${key}-${index}` : index)
                    ? 'active'
                    : ''
                }
                style={{
                  paddingLeft: `${paddingLeftCount(key)}px`
                }}
                onClick={() =>
                  this.handleClick(
                    key != null ? `${key}-${index}` : index,
                    item.value,
                    1
                  )
                }
              >
                {item.label}
              </span>
              {this.treeRender(
                item.children,
                key != null ? `${key}-${index}` : index
              )}
            </ul>
          </li>
        )
      }
      return (
        <li
          key={index}
          onClick={() =>
            this.handleClick(
              key != null ? `${key}-${index}` : index,
              item.value,
              0
            )
          }
        >
          <span
            style={{
              paddingLeft: `${paddingLeftCount(key)}px`
            }}
            className={
              this.state.nodeKey === (key != null ? `${key}-${index}` : index)
                ? 'active'
                : ''
            }
          >
            {item.label}
          </span>
        </li>
      )
    })
  }

  render() {
    return (
      <section className="tree">
        <ul>{this.treeRender(this.state.data)}</ul>
      </section>
    )
  }
}
