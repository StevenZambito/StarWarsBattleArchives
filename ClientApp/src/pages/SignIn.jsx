import React, { useState } from 'react'
import styles from '../styles/SignIn.module.scss'

export function SignIn() {
  const [isSignInVisible, setIsSignInVisible] = useState(false)

  const handleChangeSignIn = () => {
    setIsSignInVisible(!isSignInVisible)
  }

  return (
    <>
      {isSignInVisible ? (
        <div onClick={handleChangeSignIn} className={styles.jediArchivesIntro}>
          <button className={styles.battlesButton}>
            <p>Jedi Archives</p>
          </button>
        </div>
      ) : (
        ''
      )}
      {!isSignInVisible ? (
        <div className={styles.jediArchivesIntro}>
          <button className={styles.battlesButton}>
            <p>test</p>
          </button>
          <button onClick={handleChangeSignIn}>Go Back</button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
