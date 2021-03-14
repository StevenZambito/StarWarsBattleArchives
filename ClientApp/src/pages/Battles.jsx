import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from '../styles/Battles.module.scss'

function SingleBattleFromList(props) {
  return (
    <div className={styles.battleImageContainer}>
      <img
        src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
        alt="starwars"
      />
      <p>{props.name}</p>
      <p>{props.date}</p>
      <p>
        {props.combatants1} vs {props.combatants2}
      </p>
    </div>
  )
}

export function Battles() {
  const [battles, setBattles] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    getBattles()
  }, [filterText])

  const getBattles = async () => {
    let url = '/api/Battles'

    if (filterText.length !== 0) {
      url = `/api/Battles?filter=${filterText}`
    }
    const response = await axios.get(url)
    setBattles(response.data)
  }

  return (
    <>
      <div className={styles.battles}>
        <header>
          <h1>Battles</h1>
        </header>
        <div className={styles.battlesOptionsBackground}>
          <h2>Prequel Era</h2>

          <div className={styles.searchWrapper}>
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
              <button type="submit" className={styles.searchButton}>
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className={styles.dropDownSort}>
            <p>Sort By:</p>
            <select>
              <option>Battle: A to Z</option>
              <option>Year</option>
              <option>Era</option>
            </select>
          </div>

          <div className={styles.battleOptionsContainer}>
            <div>
              <div className={styles.createBattle}>
                <button className={styles.addButton}>+</button>
              </div>
              <p>Create Battle</p>
              <br></br>
              <br></br>
            </div>
            {battles.map((battle) => {
              return (
                <SingleBattleFromList
                  key={battle.id}
                  name={battle.name}
                  date={battle.date}
                  combatants1={battle.combatants1}
                  combatants2={battle.combatants2}
                />
              )
            })}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://starwarsblog.starwars.com/wp-content/uploads/2021/03/women-of-star-wars-2021-tall-B.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://i.insider.com/5d939b852e22af3f020abf3d?width=1136&format=jpeg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
            {/* <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}
