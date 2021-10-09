import Container from '@/components/common/Container'
import Link from '@/components/common/Link'
import React, { FC, useEffect, useMemo } from 'react'
import './header.less'

interface HeaderProps {
  menus: any[]
}

const Header: FC<HeaderProps> = (props) => {
  const menus = useMemo(() => props.menus || [], [props.menus])
  useEffect(() => {
    //
  }, [menus])

  return (
    <header className="header">
      <nav className="navbar navbar-expand-xl shadow">
        <Container>
          <h1 className="navbar-title">
            <Link to="/" rel="home" className="d-block">
              <img
                className="logo"
                src="https://cosy.demo.nicetheme.xyz/wp-content/themes/Cosy5.0.2/images/logo.png"
                alt="COSY 主题演示站"
                height="42"
                width="180"
              />
              {/* <img
                className="logo logo-night"
                src="https://cosy.demo.nicetheme.xyz/wp-content/themes/Cosy5.0.2/images/logo-dark.png"
                alt="COSY 主题演示站"
              /> */}
            </Link>
          </h1>
        </Container>
      </nav>
    </header>
  )
}

export default Header
