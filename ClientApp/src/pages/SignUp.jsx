import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../styles/SignUp.module.scss'
import { Header } from '../components/Header'

export function SignUp() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
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
              <h2>sign up</h2>
            </nav>

            {errorMessage && <p>{errorMessage}</p>}
            <form action="#" onSubmit={handleFormSubmit}>
              <p className={styles.formInput}>
                <label htmlFor="fullName">Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  onChange={handleStringFieldChange}
                />
              </p>
              <p className={styles.formInput}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleStringFieldChange}
                />
              </p>
              <p className={styles.formInput}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleStringFieldChange}
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
