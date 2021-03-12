import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Battle.module.scss'

export function Battle() {
  return (
    <>
      <div className={styles.eras}>
        <header>
          <h1>Battles</h1>
        </header>

        <div className={styles.erasOptions}>
          <h1>Battle of Hoth</h1>
          <div className={styles.firstSection}>
            <div className={styles.imageDiv}>
              <img
                src="https://cdn.vox-cdn.com/thumbor/xHRHrhMm4WPfQ5OzTXE1kXz0BjI=/0x0:815x543/1200x800/filters:focal(0x0:815x543)/cdn.vox-cdn.com/assets/3715177/atat.jpg"
                alt="hoth"
                className={styles.battleImage}
              />
            </div>

            <div className={styles.battleInfo}>
              <div className={styles.insideBattleInfo}>
                <p>
                  <span>Conflict:</span> Galactic Civil War
                </p>
                <p>
                  <span>Era:</span> Classic
                </p>
                <p>
                  <span>Date:</span> 3 ABY
                </p>
                <p>
                  <span>Location:</span> Hoth
                </p>
                <p>
                  <span>Combatants:</span> Rebel Alliance vs Galactic Empire
                </p>
                <p>
                  <span>outcome:</span> Rebels successfully evacuate
                </p>
              </div>
            </div>
          </div>
          <div className={styles.secondSection}>
            <p>Description</p>
            <p>
              "What I remember about the rise of the Empire is… is how quiet it
              was. During the waning hours of the Clone Wars, the 501st was
              discreetly transferred back to Coruscant. It was a silent trip; We
              all knew what was about to happen, what we were about to do. Did
              we have any doubts? Any private traitorous thoughts? Perhaps, but
              no one said a word. Not on the flight to Coruscant, not when Order
              66 came down, and not when we marched into the Jedi Temple. Not a
              word."
            </p>
            <div className={styles.battleImagesContainer}>
              <div className={styles.battleImagesShell}>
                <img
                  src="https://starwarsblog.starwars.com/wp-content/uploads/sites/6/2015/05/battlefront-hoth.jpg"
                  alt="hoth"
                />
              </div>
              <div className={styles.battleImagesShell}>
                <img
                  src="https://www.blackfive.net/.a/6a00d8341bfadb53ef017ee8831bdc970d-pi"
                  alt="hoth"
                />
              </div>

              <div className={styles.battleImagesShell}>
                <img src="https://i.redd.it/6u181bpu27ay.jpg" alt="hoth" />
              </div>
            </div>
            <div>
              <button>Update</button>
              <button>Delete</button>
              <h2>Comments</h2>
            </div>
            <div className={styles.myContainer}>
              <div className={styles.userImage}>
                <img
                  src="https://static.wikia.nocookie.net/bfdbd325-0a25-419a-ba56-1dd2e41edcc6"
                  alt="user profile"
                />
              </div>
              {/* <div className={styles.newCommentContainer}> */}
              <form className={styles.theForm}>
                <p className={styles.formInput}>
                  <label htmlFor="name"></label>
                  <textarea name="description"></textarea>
                </p>
              </form>
              {/* </div> */}
              <div className={styles.myContainerTwo}>
                <p>
                  <input type="submit" value="Submit" />
                </p>
              </div>
            </div>

            <div className={styles.commentSection}>
              <div className={styles.myContainerThree}>
                <div className={styles.userImage}>
                  <img
                    src="https://static.wikia.nocookie.net/bfdbd325-0a25-419a-ba56-1dd2e41edcc6"
                    alt="user profile"
                  />
                  <p>Darth Vader</p>
                </div>
                {/* <div className={styles.newCommentContainer}> */}
                <div className={styles.theForm}>
                  <p className={styles.formInput}>
                    "What I remember about the rise of the Empire is… is how
                    quiet it was. During the waning hours of the Clone Wars, the
                    501st was discreetly transferred back to Coruscant. It was a
                    silent trip; We all knew what was about to happen, what we
                    were about to do. Did we have any doubts? Any private
                    traitorous thoughts? Perhaps, but no one said a word. Not on
                    the flight to Coruscant, not when Order 66 came down, and
                    not when we marched into the Jedi Temple. Not a word."
                  </p>
                  <p id={styles.commentDateTime}>March 11th 2021 4:28pm</p>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
