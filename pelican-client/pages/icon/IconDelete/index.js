import React, { useState } from 'react'
import Robin from 'robin-path'
import './style.less'

export default function IconDelete(props) {
  const [normalPath, activePath] = Robin.transPath(
    'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z',
    'M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'
  )
  const [status, setStatus] = useState(true)
  const handleClick = status => {
    if (!status) {
      setStatus(true)
      props.handleDelete()
    } else {
      setStatus(false)
    }
  }
  return (
    <span
      id="icon-delete"
      className={!status ? 'active' : ''}
      onClick={() => handleClick(status)}
      onMouseLeave={() => setStatus(true)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="none" d="M0 0h24v24H0V0z" />
        <path fill="#C73E3A" d={status ? normalPath : activePath} />
      </svg>
    </span>
  )
}
