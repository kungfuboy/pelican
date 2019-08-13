import React, { useState } from 'react'
import Robin from 'robin-path'
import './style.less'

export default function IconMenu(props) {
  const [normalPath, activePath] = Robin.transPath(
    'M8 5v14l11-7z',
    'M6 6h12v12H6z'
  )
  const [status, setStatus] = useState(true)
  const handleClick = status => {
    if (!status) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }
  return (
    <span
      id="icon-run"
      className={!status ? 'active' : ''}
      onClick={() => handleClick(status)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path
          fill={status ? '#58B2DC' : '#C73E3A'}
          d={status ? normalPath : activePath}
        />
      </svg>
    </span>
  )
}
