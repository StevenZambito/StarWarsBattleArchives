import React from 'react'
import styles from '../styles/Battles.module.scss'

export function Battles() {
  return (
    <>
      <div className={styles.eras}>
        <header>
          <h1>Battles</h1>
        </header>
        <div className={styles.erasOptions}>
          {/* <h3>Prequel Era</h3> */}
          <div className={styles.erasOptionsContainer}>
            <div>
              <div className={styles.eraOne}>
                <button className={styles.addButton}>+</button>
              </div>
              <p>Create Battle</p>
              <br></br>
              <br></br>
            </div>
            <div>
              <button className={styles.eraTwo}>{/* <p>Era 2</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
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
