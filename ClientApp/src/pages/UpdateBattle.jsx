import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { authHeader } from '../auth'
import { useDropzone } from 'react-dropzone'
import { Header } from '../components/Header'
import styles from '../styles/UpdateBattle.module.scss'

export function UpdateBattle() {
  const params = useParams()
  const id = params.id

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

  useEffect(() => {
    const fetchBattle = async () => {
      const response = await fetch(`/api/Battles/${id}`)
      const apiData = await response.json()

      setNewBattle(apiData)
    }
    fetchBattle()
  }, [id])

  const [errorMessage, setErrorMessage] = useState('')

  const history = useHistory()

  const updateBattle = (event) => {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedBattle = { ...newBattle, [fieldName]: value }

    setNewBattle(updatedBattle)
  }

  const addCombatant1ToList = (event) => {
    event.preventDefault()

    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants1: [...previousBattle.combatants1, combatant1],
    }))

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
    event.preventDefault()

    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants2: [...previousBattle.combatants2, combatant2],
    }))

    setCombatant2('')
  }

  const deleteCombatant2 = (index) => {
    const newCombatants2List = [...newBattle.combatants2].filter(
      (x, i) => i !== index
    )
    setNewBattle((previousBattle) => ({
      ...previousBattle,
      combatants2: [...newCombatants2List],
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    return
  }

  const postBattle = async () => {
    let config = {
      headers: {
        ...authHeader(),
      },
    }
    try {
      await axios.put(`/api/Battles/${newBattle.id}`, newBattle, config)
      history.push('/')
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage('Not authorized')
      } else if (error.response.status === 400) {
        window.alert('Error - See top of page for details')
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
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)
    const formData = new FormData()

    formData.append('file', fileToUpload)

    setIsUploading(true)
    try {
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      if (response.status === 200) {
        const apiResponse = await response.json()
        const url = apiResponse.url
        setNewBattle({ ...newBattle, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch {
      setErrorMessage('Unable to upload image')
    }
    setIsUploading(false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  let dropZoneMessage = 'Drag a picture of the battle here to upload!'

  if (isUploading) {
    dropZoneMessage = 'uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  if (!newBattle.id) {
    return <></>
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
            <h2>update a Battle</h2>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                onChange={(event) => updateBattle(event)}
                value={newBattle.location}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor="combatants1">Combatants 1</label>
              <div className={styles.combatantsContainer}>
                {newBattle.combatants1.map((combatant, index) => {
                  return (
                    <div key={index} className={styles.theAddedCombatant1}>
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
                autoComplete="off"
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
            <div className={styles.formInput}>
              <label htmlFor="combatants2">Combatants 2</label>
              <div className={styles.combatantsContainer}>
                {newBattle.combatants2.map((combatant, index) => {
                  return (
                    <div key={index} className={styles.theAddedCombatant2}>
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                value={newBattle.description}
                onChange={(event) => updateBattle(event)}
                placeholder="Enter a brief description about the battle"
              ></textarea>
            </div>

            {newBattle.photoURL && (
              <div className={styles.droppedImage}>
                <img
                  alt="Star Wars Battle"
                  width={200}
                  src={newBattle.photoURL}
                />
              </div>
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
