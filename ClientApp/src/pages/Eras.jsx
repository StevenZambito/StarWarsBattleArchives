import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import styles from '../styles/Eras.module.scss'

export function Eras() {
  return (
    <>
      <div className={styles.eras}>
        <Header />
        <div className={styles.erasOptions}>
          <div className={styles.erasOptionsContainer}>
            <div>
              <Link to="/battles">
                <img src="https://i.imgur.com/Xp0vjUa.jpg" alt="Era" />
              </Link>
              <p>Rise of the Empire</p>
            </div>
            <div>
              <Link to="/battles">
                <img
                  src="https://milnersblog.files.wordpress.com/2019/04/star-wars-celebration-2019-official-full-mural-poster-hi-res.jpg"
                  alt="Era"
                />
              </Link>

              <p>Age of Rebellion</p>
            </div>
            <div>
              <Link to="/battles">
                <img
                  src="https://www.farfarawaynews.com/wp-content/uploads/2019/04/Celebration-Muraljpg.jpg"
                  alt="Era"
                />
              </Link>

              <p>New Republic / The First order</p>
            </div>
          </div>

          <div className={styles.erasAllContainer}>
            <div>
              <Link to="/battles">
                <img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/826040f5-466d-4fe5-ad72-dbcdfd174c26/dcmey63-5338ac1d-ac70-4892-b576-4cb5f304e6f7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODI2MDQwZjUtNDY2ZC00ZmU1LWFkNzItZGJjZGZkMTc0YzI2XC9kY21leTYzLTUzMzhhYzFkLWFjNzAtNDg5Mi1iNTc2LTRjYjVmMzA0ZTZmNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.cdHJ9fCb7-h8YOz9b8DwAsSeDBaXrbxJk1fvII5-YVs"
                  alt="Era"
                />
              </Link>

              <p>All</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
