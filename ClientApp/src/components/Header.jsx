import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.scss'
import { getUser, isLoggedIn, logout } from '../auth'

export function Header() {
  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  const user = getUser()
  return (
    <header>
      <nav className={styles.headerContainer}>
        {/* {isLoggedIn() && (
              <Link to="/new">
                <i className="fa fa-plus"></i> Battles
              </Link>
            )} */}
        <div className={styles.battleHeaderTest}>
          <Link to="/" className={styles.battlesHeader}>
            Battle Archives
          </Link>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.theLinks}>
            {isLoggedIn() && <p>Welcome back, {user.fullName}!</p>}
            {isLoggedIn() || <Link to="/signin">Sign in</Link>}
            {isLoggedIn() || <Link to="/signup">Sign up</Link>}
            {isLoggedIn() && (
              <span className="link" onClick={handleLogout}>
                Sign out
              </span>
            )}
          </div>
          {isLoggedIn() && user.photoURL && (
            <img
              src={user.photoURL}
              alt={`${user.fullName}'s Avatar`}
              height="64"
              width="64"
            />
          )}
        </div>
      </nav>
    </header>
  )
}
