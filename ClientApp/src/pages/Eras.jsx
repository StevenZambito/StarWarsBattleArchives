import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/battles">
              <button className={styles.eraOne}>{/* <p>Era 1</p> */}</button>
            </Link>
            <Link to="/battles">
              <button className={styles.eraTwo}>{/* <p>Era 2</p> */}</button>
            </Link>
            <Link to="/battles">
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
            </Link>
          </div>

          <div className={styles.erasAllContainer}>
            <Link to="/battles">
              <button className={styles.eraAll}>{/* <p>All</p> */}</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
