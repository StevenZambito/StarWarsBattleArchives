import React from 'react'
import styles from '../styles/Battles.module.scss'

export function Battles() {
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
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://starwarsblog.starwars.com/wp-content/uploads/2021/03/women-of-star-wars-2021-tall-B.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://i.insider.com/5d939b852e22af3f020abf3d?width=1136&format=jpeg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.battleImageContainer}>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91MMkv35K5L._RI_.jpg"
                alt="starwars"
              />
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
