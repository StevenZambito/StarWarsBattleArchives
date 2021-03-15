import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styles from '../styles/CreateBattle.module.scss'

export function CreateBattle() {
  const [combatant1, setCombatant1] = useState('')

  const [combatant2, setCombatant2] = useState('')

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
  })

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
    const response = await axios.post('/api/Battles', newBattle)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    postBattle()
    history.push('/')
  }

  return (
    <>
      <div className={styles.createBattle}>
        <header>
          <h1>Battles</h1>
        </header>

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
                      <p>{combatant}</p>
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

            <div className={styles.formInput}>
              <label htmlFor="picture">Picture</label>
              <input type="file" name="picture" id="picture" />
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
