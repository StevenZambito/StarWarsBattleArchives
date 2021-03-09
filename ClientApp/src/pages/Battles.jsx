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
          <h3>Prequel Era</h3>

          <div className={styles.wrap}>
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

          <div className={styles.erasOptionsContainer}>
            <div>
              <div className={styles.eraOne}>
                <button className={styles.addButton}>+</button>
              </div>
              <p>Create Battle</p>
              <br></br>
              <br></br>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraTwo}>{/* <p>Era 2</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
              <button className={styles.eraThree}>{/* <p>Era 3</p> */}</button>
              <p>Battle of Hoth</p>
              <p>Year 30000</p>
              <p>Empire v Rebellion</p>
            </div>
            <div className={styles.imageHoverZoom}>
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
