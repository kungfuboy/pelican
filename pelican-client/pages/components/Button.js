import { useState, useEffect } from 'react'
import '../assets/button.less'

export default function Button(props) {
  const [text, setText] = useState(null)
  useEffect(() => {
    setText(props.children)
  })
  const classNameFilter = type => {
    if (typeof type === 'string') {
      return `btn ${type}`
    }
    if (type instanceof Array) {
      const arr = type.map(item => item)
      arr.unshift('btn')
      return arr.join(' ')
    }
    return 'btn'
  }
  return <span onClick={props.handleClick} className={classNameFilter(props.type)}>{text}</span>
}
