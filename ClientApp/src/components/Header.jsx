import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.scss'

export function Header() {
  return (
    <header>
      <ul>
        <li>
          <nav>
            <Link to="/new">
              <i className="fa fa-plus"></i> Battle
            </Link>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
            <p>Welcome back, Steven!</p>
          </nav>
        </li>
        <li className={styles.avatar}>
          <img
            src="https://cdn.vox-cdn.com/thumbor/xHRHrhMm4WPfQ5OzTXE1kXz0BjI=/0x0:815x543/1200x800/filters:focal(0x0:815x543)/cdn.vox-cdn.com/assets/3715177/atat.jpg"
            alt="hi"
            height="64"
            width="64"
          />
        </li>
      </ul>
    </header>
  )
}
