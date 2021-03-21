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
            {isLoggedIn() && <p>{user.fullName}</p>}
            {isLoggedIn() || (
              <Link to="/signin" className={styles.navLink}>
                Sign in
              </Link>
            )}
            {isLoggedIn() || (
              <Link to="/signup" className={styles.navLink}>
                Sign up
              </Link>
            )}
            {isLoggedIn() && (
              <p className={styles.navLink} onClick={handleLogout}>
                Sign out
              </p>
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
