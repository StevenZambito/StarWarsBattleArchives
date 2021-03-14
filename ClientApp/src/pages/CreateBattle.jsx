import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/CreateBattle.module.scss'

export function CreateBattle() {
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
          </nav>

          <form className={styles.formContainer}>
            <p className={styles.formInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name of Battle"
              />
            </p>
            <p className={styles.formInput}>
              <label htmlFor="name">Conflict</label>
              <input
                type="text"
                name="conflict"
                placeholder="ex: Clone Wars, Galactic Civil War, etc."
              />
            </p>
            <p className={styles.formInput}>
              <p>Which era did the battle take place in?</p>
              <div>
                <input type="radio" name="era" />
                <label htmlFor="name">Prequel Era (1000 BBY - 0 BBY)</label>
              </div>
              <div>
                <input type="radio" name="era" />
                <label htmlFor="name">Classic Era</label>
              </div>
              <div>
                <input type="radio" name="era" />
                <label htmlFor="name">Sequel Era</label>
              </div>
            </p>
            <p className={styles.formInput}>
              <label htmlFor="name">Date</label>
              <input type="text" name="date" />
            </p>
            <p className={styles.formInput}>
              <label htmlFor="name">Location</label>
              <input type="text" name="location" />
            </p>
            <p className={styles.formInput}>
              <label htmlFor="name">Combatants 1</label>
              <input type="text" name="combatants1" />
            </p>
            {/* <p id={styles.vs}>vs</p> */}
            <p className={styles.formInput}>
              <label htmlFor="name">Combatants 2</label>
              <input type="text" name="combatants2" />
            </p>
            <p className={styles.formInput}>
              <p>Who won the battle?</p>
              <div>
                <input type="radio" name="outcome" />
                <label htmlFor="name">Combatants 1</label>
              </div>
              <div>
                <input type="radio" name="outcome" />
                <label htmlFor="name">Combatants 2</label>
              </div>
            </p>

            <p className={styles.formInput}>
              <label htmlFor="name">Description</label>
              <textarea
                name="description"
                placeholder="Enter a brief description about the battle"
              ></textarea>
            </p>

            <p className={styles.formInput}>
              <label htmlFor="picture">Picture</label>
              <input type="file" name="picture" />
            </p>
            <p className={styles.formSubmit}>
              <input type="submit" value="Submit" />
              <span></span>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
