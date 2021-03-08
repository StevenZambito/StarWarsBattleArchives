import React, { useState } from 'react'
import styles from '../styles/SignIn.module.scss'

export function SignIn() {
  const [isSignInVisible, setIsSignInVisible] = useState(false)

  const handleChangeSignIn = () => {
    setIsSignInVisible(!isSignInVisible)
  }

  return (
    <>
      {!isSignInVisible ? (
        <div className={styles.jediArchivesIntro}>
          <div onClick={handleChangeSignIn} className={styles.battlesButton}>
            <p>Jedi Archives: Battles</p>
          </div>
        </div>
      ) : (
        ''
      )}
      {isSignInVisible ? (
        <div className={styles.jediArchivesIntro}>
          <div className={styles.battlesButtonSignIn}>
            <button onClick={handleChangeSignIn}>Sign up</button>
            <button onClick={handleChangeSignIn}>Log in</button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
