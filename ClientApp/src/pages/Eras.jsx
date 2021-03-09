import React from 'react'
import styles from '../styles/Eras.module.scss'

export function Eras() {
  return (
    <>
      <div className={styles.eras}>
        <header>
          <h1>Battles</h1>
        </header>
        <div className={styles.erasOptions}>
          <div className={styles.erasOptionsContainer}>
            <button className={styles.eraOne}>{/* <p>Era 1</p> */}</button>
            <button className={styles.eraTwo}>{/* <p>Era 2</p> */}</button>
            <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
          </div>

          <div className={styles.erasAllContainer}>
            <button className={styles.eraAll}>{/* <p>All</p> */}</button>
          </div>
        </div>
      </div>
    </>
  )
}
