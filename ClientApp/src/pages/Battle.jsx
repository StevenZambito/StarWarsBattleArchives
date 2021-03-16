import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import styles from '../styles/Battle.module.scss'

export function Battle() {
  const [battle, setBattle] = useState({
    name: '',
    conflict: '',
    era: '',
    date: '',
    location: '',
    combatants1: [],
    combatants2: [],
    outcome: '',
    description: '',
    comments: [],
  })

  const params = useParams()
  const id = Number(params.id)

  const [newComment, setNewComment] = useState({
    body: '',
    battleId: id,
  })

  useEffect(() => {
    async function getBattle() {
      const response = await axios.get(`/api/battles/${id}`)
      setBattle(response.data)
    }

    getBattle()
  }, [id])

  function handleNewCommentTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setNewComment({ ...newComment, [name]: value })
  }

  async function handleNewCommentSubmit(event) {
    event.preventDefault()

    const response = await axios.post(`/api/Comments`, newComment)
    setNewComment(response.data)

    setNewComment({
      ...newComment,
      body: '',
    })

    const battlesResponse = await axios.get(`/api/battles/${id}`)
    setBattle(battlesResponse.data)
  }

  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`

  return (
    <div className={styles.eras}>
      <div className={styles.erasOptions}>
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <h1>{battle.name}</h1>
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
                <span>Conflict:</span> {battle.conflict}
              </p>
              <p>
                <span>Era:</span> {battle.era}
              </p>
              <p>
                <span>Date:</span> {battle.date}
              </p>
              <p>
                <span>Location:</span> {battle.location}
              </p>
              <p>
                <span>Combatants:</span> {battle.combatants1} vs{' '}
                {battle.combatants2}
              </p>
              <p>
                <span>outcome:</span> {battle.outcome}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.secondSection}>
          <div className={styles.battleDescription}>
            <p>Description</p>
            <p>{battle.description}</p>
          </div>

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
                <label htmlFor="body"></label>
                <textarea
                  name="body"
                  id="body"
                  value={newComment.body}
                  onChange={handleNewCommentTextFieldChange}
                ></textarea>
              </p>
            </form>
            {/* </div> */}
            <div className={styles.myContainerTwo}>
              <p>
                <input
                  type="submit"
                  value="Submit"
                  onClick={(event) => handleNewCommentSubmit(event)}
                />
              </p>
            </div>
          </div>

          <div className={styles.commentSection}>
            {battle.comments.map((comment) => (
              <div key={comment.id} className={styles.myContainerThree}>
                <div className={styles.userImage}>
                  <img
                    src="https://static.wikia.nocookie.net/bfdbd325-0a25-419a-ba56-1dd2e41edcc6"
                    alt="user profile"
                  />
                  <p>Darth Vader</p>
                </div>

                <div className={styles.theForm}>
                  <p className={styles.formInput}>{comment.body}</p>
                  <p id={styles.commentDateTime}>
                    <time>
                      {format(new Date(comment.createdAt), dateFormat)}
                    </time>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
