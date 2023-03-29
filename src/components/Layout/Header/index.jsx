import React from 'react'
import style from './header.module.scss'
import logo from '../../../images/logo.png'

export default function Header() {
  return (
    <header className={style.header}> <img src={logo} alt="" /> Header</header>
  )
}
