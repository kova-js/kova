import { NavLink, NavLinkProps } from 'react-router-dom'
import type * as H from 'history'
import type { FC } from 'react'
import React from 'react'

export type LinkProps<S = H.LocationState> = React.PropsWithoutRef<NavLinkProps<S>> &
  React.RefAttributes<HTMLAnchorElement>

const Link: FC<LinkProps> = (props) => {
  return (
    <NavLink
      {...props}
      onClick={(e) => {
        if (location.pathname === props.to) {
          e.preventDefault()
        }
      }}
    />
  )
}

export default Link
