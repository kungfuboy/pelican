import React, { useState } from 'react'
import Robin from 'robin-path'
import './style.less'

export default function IconMenu(props) {
  const [normalPath, activePath] = Robin.transPath(
    'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
    'M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z'
  )
  // const [normalPath, activePath] = Robin.transForm(
  //   'M3 18h18v-2H3v2z M0 0l0 0L0 0V0h0V0l0 0L0 0l0 0 0 0z M3 13h18v-2H3v2zm0-7v2h18V6H3z',
  //   'M0 0h0v0H0v0z M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z M0 0h0v0H0v0zm0 0v0h0V0H0z'
  // )
  const handleClick = () => {
    props.handleClick()
  }
  return (
    <span
      id="icon-menu"
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
