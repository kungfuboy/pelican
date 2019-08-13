import React, { useState, useEffect } from 'react'
import Robin from 'robin-path'
import './style.less'

const IconAdd = props => {
  const [normalPath, activePath] = Robin.transPath(
    'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z'
  )
  const handleClick = () => {
    props.handleClick()
  }
  return (
    <span
      id="icon-add"
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

export default IconAdd
