import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { authHeader } from '../auth'
import { useDropzone } from 'react-dropzone'
import { Header } from '../components/Header'
import styles from '../styles/CreateBattle.module.scss'

export function CreateBattle() {
  const [combatant1, setCombatant1] = useState('')

  const [combatant2, setCombatant2] = useState('')

  const [isUploading, setIsUploading] = useState(false)

  const [newBattle, setNewBattle] = useState({
    name: '',
    conflict: '',
    era: '',
    date: '',
    location: '',
    combatants1: [],
    combatants2: [],
    outcome: '',
    description: '',
    photoURL: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const updateBattle = (event) => {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedBattle = { ...newBattle, [fieldName]: value }

    setNewBattle(updatedBattle)
  }

  const addCombatant1ToList = (event) => {
    // Prevents the page from refreshing
    event.preventDefault()

    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants1: [...previousBattle.combatants1, combatant1],
    }))

    // Clears out the input after adding to list
    setCombatant1('')
  }

  const deleteCombatant1 = (index) => {
    const newCombatants1List = [...newBattle.combatants1].filter(
      (x, i) => i !== index
    )
    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants1: [...newCombatants1List],
    }))
  }

  const addCombatant2ToList = (event) => {
    // Prevents the page from refreshing
    event.preventDefault()

    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants2: [...previousBattle.combatants2, combatant2],
    }))

    // Clears out the input after adding to list
    setCombatant2('')
  }

  const deleteCombatant2 = (index) => {
    const newCombatants2List = [...newBattle.combatants2].filter(
      (x, i) => i !== index
    )
    // setCombatants2(newCombatants2List)
    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants2: [...newCombatants2List],
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hey')
    return
  }

  const postBattle = async () => {
    let config = {
      headers: {
        ...authHeader(),
      },
    }
    try {
      await axios.post('/api/Battles', newBattle, config)
      history.push('/')
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage('Not authorized')
      } else if (error.response.status === 400) {
        window.alert('hello')
        const errorString = Object.values(error.response.data.errors).join(' ')
        console.log(errorString)
        setErrorMessage(errorString.toLowerCase())
      }
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    postBattle()
  }

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)
    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()
    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    setIsUploading(true)
    try {
      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })
      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the restaurant,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()
        const url = apiResponse.url
        setNewBattle({ ...newBattle, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch {
      // Catch any network errors and show the user we could not process their upload
      setErrorMessage('Unable to upload image')
    }
    setIsUploading(false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })
  let dropZoneMessage = 'Drag a picture of the restaurant here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  return (
    <>
      <div className={styles.createBattle}>
        <Header />

        <div className={styles.createBattleContainer}>
          <nav>
            <Link to="/">
              <i className="fa fa-home"></i>
            </Link>
            <h2>Add a Battle</h2>
            <button onClick={() => console.log(newBattle)}>heyyyyyyy</button>
          </nav>

          <form
            onSubmit={(event) => handleSubmit(event)}
            className={styles.formContainer}
          >
            <p>{errorMessage}</p>
            <div className={styles.formInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={newBattle.name}
                placeholder="Enter name of Battle"
                onChange={(event) => updateBattle(event)}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="conflict">Conflict</label>
              <input
                type="text"
                name="conflict"
                id="conflict"
                value={newBattle.conflict}
                onChange={(event) => updateBattle(event)}
                placeholder="ex: Clone Wars, Galactic Civil War, etc."
              />
            </div>
            <div className={styles.formInput}>
              <p>Which era did the battle take place in?</p>
              <div>
                <input
                  type="radio"
                  name="era"
                  id="riseOfTheEmpire"
                  value="Rise of the Empire"
                  checked={newBattle.era === 'Rise of the Empire'}
                  onChange={(event) => updateBattle(event)}
                />
                <label htmlFor="riseOfTheEmpire">Rise of the Empire</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="era"
                  id="ageOfRebellion"
                  value="Age of Rebellion"
                  checked={newBattle.era === 'Age of Rebellion'}
                  onChange={(event) => updateBattle(event)}
                />
                <label htmlFor="ageOfRebellion">Age of Rebellion</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="era"
                  id="newRepublicAndRiseOfTheFirstOrder"
                  value="New Republic / Rise of the First Order"
                  checked={
                    newBattle.era === 'New Republic / Rise of the First Order'
                  }
                  onChange={(event) => updateBattle(event)}
                />
                <label htmlFor="newRepublicAndRiseOfTheFirstOrder">
                  New Republic / Rise of the First order
                </label>
              </div>
            </div>
            <div className={styles.formInput}>
              <label htmlFor="date">Date</label>
              <input
                type="text"
                name="date"
                id="date"
                value={newBattle.date}
                onChange={(event) => updateBattle(event)}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={(event) => updateBattle(event)}
                value={newBattle.location}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="combatants1">Combatants 1</label>
              <div className={styles.combatantsContainer}>
                {newBattle.combatants1.map((combatant, index) => {
                  return (
                    <div key={index} className={styles.theAddedCombatant}>
                      <p>{combatant}</p>
                      <span
                        className={styles.theX}
                        onClick={() => deleteCombatant1(index)}
                      >
                        x
                      </span>
                    </div>
                  )
                })}
              </div>

              <input
                onChange={(e) => setCombatant1(e.target.value)}
                type="text"
                name="combatants1"
                id="combatants1"
                value={combatant1}
              />
              <button
                type="button"
                onClick={(event) => addCombatant1ToList(event)}
                className={styles.addCombatantsButton}
              >
                Add
              </button>
            </div>
            {/* <p id={styles.vs}>vs</p> */}
            <div className={styles.formInput}>
              <label htmlFor="combatants2">Combatants 2</label>
              <div className={styles.combatantsContainer}>
                {newBattle.combatants2.map((combatant, index) => {
                  return (
                    <div key={index} className={styles.theAddedCombatant}>
                      <p>{combatant} </p>
                      <span
                        className={styles.theX}
                        onClick={() => deleteCombatant2(index)}
                      >
                        x
                      </span>
                    </div>
                  )
                })}
              </div>

              <input
                onChange={(e) => setCombatant2(e.target.value)}
                type="text"
                name="combatants2"
                id="combatants2"
                value={combatant2}
              />
              <button
                type="button"
                onClick={(event) => addCombatant2ToList(event)}
                className={styles.addCombatantsButton}
              >
                Add
              </button>
            </div>

            <div className={styles.formInput}>
              <label htmlFor="outcome">outcome</label>
              <textarea
                name="outcome"
                id="outcome"
                value={newBattle.outcome}
                onChange={(event) => updateBattle(event)}
                placeholder="Enter a brief description about the outcome of the battle"
              ></textarea>
            </div>

            <div className={styles.formInput}>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={newBattle.description}
                onChange={(event) => updateBattle(event)}
                placeholder="Enter a brief description about the battle"
              ></textarea>
            </div>

            {newBattle.photoURL && (
              <p>
                <img
                  alt="Star Wars Battle"
                  width={200}
                  src={newBattle.photoURL}
                />
              </p>
            )}

            <div className={styles.fileDrop}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {dropZoneMessage}
              </div>
            </div>
            <div className={styles.formSubmit}>
              <input
                type="submit"
                value="Submit"
                onClick={(event) => handleFormSubmit(event)}
              />
              <span></span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
