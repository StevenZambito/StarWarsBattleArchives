import React from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import styles from '../styles/Eras.module.scss'
import RiseOfTheEmpire from '../images/RiseOfTheEmpire.jpg'
import AgeOfRebellion from '../images/AgeOfRebellion.jpg'
import NewRepublicAndTheFirstOrder from '../images/NewRepublicAndTheFirstOrder.jpg'

export function Eras() {
  return (
    <>
      <div className={styles.erasPage}>
        <Header />
        <main className={styles.erasPageContent}>
          <div className={styles.erasOptionsContainer}>
            <div>
              <Link to="/battles/Rise of the Empire">
                <img src={RiseOfTheEmpire} alt="Rise of the Empire" />
              </Link>
              <p>Rise of the Empire</p>
            </div>
            <div>
              <Link to="/battles/Age of Rebellion">
                <img src={AgeOfRebellion} alt="Age of Rebellion" />
              </Link>
              <p>Age of Rebellion</p>
            </div>
            <div>
              <Link to="/battles/New Republic The First Order">
                <img
                  src={NewRepublicAndTheFirstOrder}
                  alt="New Republic / The First Order"
                />
              </Link>
              <p>New Republic / The First order</p>
            </div>
            <div>
              <Link to="/battles/all">
                <img
                  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/826040f5-466d-4fe5-ad72-dbcdfd174c26/dcmey63-5338ac1d-ac70-4892-b576-4cb5f304e6f7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvODI2MDQwZjUtNDY2ZC00ZmU1LWFkNzItZGJjZGZkMTc0YzI2XC9kY21leTYzLTUzMzhhYzFkLWFjNzAtNDg5Mi1iNTc2LTRjYjVmMzA0ZTZmNy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.cdHJ9fCb7-h8YOz9b8DwAsSeDBaXrbxJk1fvII5-YVs"
                  alt="Era"
                />
              </Link>
              <p>All</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
