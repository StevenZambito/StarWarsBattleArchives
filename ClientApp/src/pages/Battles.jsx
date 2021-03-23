import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import styles from '../styles/Battles.module.scss'

function SingleBattleFromList(props) {
  return (
    <Link to={`/battle/${props.id}`}>
      <div className={styles.battleImageContainer}>
        {props.photoURL && <img alt="Star Wars battle" src={props.photoURL} />}
        <p>{props.name}</p>
        <p>{props.date}</p>
      </div>
    </Link>
  )
}

export function Battles() {
  const [battles, setBattles] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    getBattles(filterText)
  }, [filterText])

  const getBattles = async (filterText) => {
    let url = '/api/Battles'

    if (filterText.length !== 0) {
      url = `/api/Battles?filter=${filterText}`
    }
    const response = await axios.get(url)
    setBattles(response.data)
  }

  return (
    <>
      <div className={styles.battlesPage}>
        <Header />
        <main className={styles.battlesPageContent}>
          <section className={styles.navContainer}>
            <nav>
              <Link to="/">
                <i className="fa fa-home"></i>
              </Link>
            </nav>
          </section>

          <h2>Prequel Era</h2>

          <section className={styles.searchContainer}>
            <div className={styles.search}>
              <input
                type="text"
                className={styles.searchTerm}
                placeholder="Which Battle are you looking for?"
                value={filterText}
                onChange={(event) => {
                  setFilterText(event.target.value)
                }}
              />
              <button type="submit" className={styles.searchGoButton}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </section>

          <section className={styles.dropDownSort}>
            <p>Sort By:</p>
            <select>
              <option>Battle: A to Z</option>
              <option>Year</option>
              <option>Era</option>
            </select>
          </section>

          <section className={styles.battlesOptionsContainer}>
            <div className={styles.createBattleContainer}>
              <Link to="/create">
                <div className={styles.createBattle}>
                  <button className={styles.createPlusSymbol}>+</button>
                </div>
              </Link>
              <p>Create Battle</p>
              <br></br>
            </div>

            {battles.map((battle) => {
              return (
                <SingleBattleFromList
                  key={battle.id}
                  id={battle.id}
                  name={battle.name}
                  date={battle.date}
                  combatants1={battle.combatants1}
                  combatants2={battle.combatants2}
                  photoURL={battle.photoURL}
                />
              )
            })}
          </section>
        </main>
      </div>
    </>
  )
}
