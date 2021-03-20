import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { authHeader, getUserId, isLoggedIn, getUser } from '../auth'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { Header } from '../components/Header'
import format from 'date-fns/format'
import styles from '../styles/Battle.module.scss'

export function Battle() {
  const history = useHistory()

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
    photoURL: '',
    comments: [],
  })

  const params = useParams()
  const id = Number(params.id)
  const user = getUser()

  const [newComment, setNewComment] = useState({
    body: '',
    battleId: id,
  })

  useEffect(() => {
    async function getBattle() {
      const response = await axios.get(`/api/Battles/${id}`)
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

    let config = {
      headers: {
        ...authHeader(),
      },
    }

    const response = await axios.post(`/api/Comments`, newComment, config)
    setNewComment(response.data)

    // if (error.response.status === 401) {
    //   setErrorMessage('Not authorized')
    // }

    setNewComment({
      ...newComment,
      body: '',
    })

    const battlesResponse = await axios.get(`/api/Battles/${id}`)
    setBattle(battlesResponse.data)
  }

  const dateFormat = `MMMM do, yyyy 'at' h:mm aaa`

  async function handleDelete(event) {
    event.preventDefault()

    const response = await fetch(`/api/Battles/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.status === 200 || response.status === 204) {
      history.push('/')
    }
  }

  async function handleDeleteComment(event, commentId) {
    event.preventDefault()

    await fetch(`/api/Comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    const response = await axios.get(`/api/Battles/${id}`)
    setBattle(response.data)
  }

  return (
    <div className={styles.eras}>
      <Header />
      <div className={styles.erasOptions}>
        <Link to="/">
          <i className="fa fa-home"></i>
        </Link>
        <h1>{battle.name}</h1>
        <div className={styles.firstSection}>
          <div className={styles.imageDiv}>
            {battle.photoURL && (
              <img
                alt="Star Wars battle"
                src={battle.photoURL}
                className={styles.battleImage}
              />
            )}
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
            {battle.userId === getUserId() && (
              <button>
                <Link className="button" to={`/Battles/${id}/update`}>
                  Edit
                </Link>
              </button>
            )}
            {battle.userId === getUserId() && (
              <button onClick={handleDelete}>Delete</button>
            )}
            <h2>Comments</h2>
          </div>

          {isLoggedIn() && (
            <div className={styles.myContainer}>
              <div className={styles.userImage}>
                {isLoggedIn() && user.photoURL && (
                  <img src={user.photoURL} alt={`${user.fullName}'s Avatar`} />
                )}
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
          )}

          <div className={styles.commentSection}>
            {battle.comments.map((comment) => (
              <div key={comment.id} className={styles.myContainerThree}>
                <div className={styles.userImage}>
                  {isLoggedIn() && user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={`${user.fullName}'s Avatar`}
                    />
                  )}
                  <p>{comment.user.fullName}</p>
                </div>

                <div className={styles.theForm}>
                  <p className={styles.formInput}>{comment.body}</p>
                  <p id={styles.commentDateTime}>
                    <time>
                      {format(new Date(comment.createdAt), dateFormat)}
                    </time>
                  </p>
                  {comment.user.id === getUserId() && (
                    <div>
                      <button
                        className="small"
                        onClick={(event) =>
                          handleDeleteComment(event, comment.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
