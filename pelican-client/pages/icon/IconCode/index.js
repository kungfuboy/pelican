import React, { useEffect } from 'react'
import Robin from 'robin-path'
import './style.less'

export default function IconMenu(props) {
  const [normalPath, activePath] = Robin.transPath(
    'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z'
  )
  const handleClick = () => {
    props.handleClick()
  }
  return (
    <span
      id="icon-code"
      className={props.className}
      onClick={() => handleClick()}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          className="path"
          d={props.className.indexOf('active') > -1 ? activePath : normalPath}
        />
      </svg>
    </span>
  )
}
