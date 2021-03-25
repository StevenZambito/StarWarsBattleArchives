import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { authHeader } from '../auth'
import { useDropzone } from 'react-dropzone'
import styles from '../styles/SignUp.module.scss'
import { Header } from '../components/Header'

export function SignUp() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

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

  async function onDropFile(acceptedFiles) {
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    const formData = new FormData()

    formData.append('file', fileToUpload)

    try {
      setIsUploading(true)

      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      setIsUploading(false)

      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setNewUser({ ...newUser, photoURL: url })
      } else {
        setErrorMessage('unable to upload image')
      }
    } catch (error) {
      console.debug(error)
      setErrorMessage('unable to upload image')
      setIsUploading(false)
    }
  }

  let dropZoneMessage = 'Drag a profile picture here to upload!'

  if (isUploading) {
    dropZoneMessage = 'uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
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
                  autoComplete="off"
                  onChange={handleStringFieldChange}
                />
              </p>
              <p className={styles.formInput}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={handleStringFieldChange}
                />
              </p>
              <p className={styles.formInput}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  onChange={handleStringFieldChange}
                />
              </p>
              {newUser.photoURL && (
                <p id={styles.uploadedImage}>
                  <img alt="User Profile" width={100} src={newUser.photoURL} />
                </p>
              )}
              <div className={styles.fileDropZone}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {dropZoneMessage}
                </div>
              </div>
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
