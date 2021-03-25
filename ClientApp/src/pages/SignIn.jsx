import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/SignIn.module.scss'
import { Header } from '../components/Header'
import { recordAuthentication } from '../auth'

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })

    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      recordAuthentication(apiResponse)

      window.location.assign('/')
    }
  }

  return (
    <>
      <div className={styles.jediArchivesIntro}>
        <Header />
        <div className={styles.archiveContainer}>
          <div className={styles.battlesButton}>
            <nav>
              <Link to="/">
                <i className="fa fa-home"></i>
              </Link>
              <h2>sign in</h2>
            </nav>

            {errorMessage && <p>{errorMessage}</p>}
            <form action="#" onSubmit={handleFormSubmit}>
              <p className={styles.formInput}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleStringFieldChange}
                  autoComplete="off"
                />
              </p>
              <p className={styles.formInput}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleStringFieldChange}
                  autoComplete="off"
                />
              </p>
              <p>
                <input type="submit" value="Submit" />
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
