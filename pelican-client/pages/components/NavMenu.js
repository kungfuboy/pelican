import dynamic from 'next/dynamic'

import IconMenu from '../icon/IconMenu/index.js'
import IconCode from '../icon/IconCode/index.js'
// import IconAdd from '../icon/IconAdd/index.js'

// const IconMenu = dynamic(import('../icon/IconMenu/index.js'), {
//   ssr: false
// })

const NavMenu = props => {
  return (
    <nav className="nav-menu">
      <IconMenu
        className={props.menuIndex === 1 ? 'active icon' : 'icon'}
        handleClick={() => props.changeMenuIndex(1)}
      />
      <IconCode
        className={props.menuIndex === 2 ? 'active icon' : 'icon'}
        handleClick={() => props.changeMenuIndex(2)}
      />
      {/* <IconAdd
                className={
                    props.menuIndex === 3 ? 'active icon' : 'icon'
                }
                handleClick={() => props.changeMenuIndex(3)}
            /> */}
    </nav>
  )
}

export default NavMenu
