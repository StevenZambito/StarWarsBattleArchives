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
    window.scrollTo(0, 0)
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

  const goBack = () => {
    history.go(-1)
  }

  return (
    <div className={styles.eras}>
      <Header />
      <div className={styles.erasOptions}>
        <nav>
          <Link to="/">
            <i className="fa fa-home"></i>
          </Link>
          <span>
            <button
              className={styles.breadCrumbs}
              type="button"
              onClick={goBack}
            >
              Battles
            </button>
          </span>
          <span>
            <button className={styles.breadCrumbsCurrent}>{battle.name}</button>
          </span>
        </nav>

        <h1>{battle.name}</h1>

        <section className={styles.theSection}>
          <div className={styles.imageDiv}>
            {battle.photoURL && (
              <img
                alt="Star Wars battle"
                src={battle.photoURL}
                className={styles.battleImage}
              />
            )}
          </div>

          {/* <div className={styles.battleInfo}>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>Conflict</p>
              </div>
              <div className={styles.battleResult}>
                <p>Clone Wars</p>
              </div>
            </div>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>Era</p>
              </div>
              <div className={styles.battleResult}>
                <p>Age of Rebellion</p>
              </div>
            </div>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>Date</p>
              </div>
              <div className={styles.battleResult}>
                <p>3 ABY</p>
              </div>
            </div>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>Location</p>
              </div>
              <div className={styles.battleResult}>
                <p>Geonosis</p>
              </div>
            </div>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>outcome</p>
              </div>
              <div className={styles.battleResult}>
                <p>{battle.outcome}</p>
              </div>
            </div>
            <div className={styles.resultRow}>
              <div className={styles.battleProperty}>
                <p>Combatants</p>
              </div>
              <div className={styles.battleResultCombat}>
                <div className={styles.com1}>{battle.combatants1}</div>

                <div className={styles.com2}>{battle.combatants2}</div>
              </div>
            </div>
          </div> */}
        </section>
        <div className={styles.battleDataContainerBackground}>
          <div className={styles.battleDataContainer}>
            <div>
              <p>Conflict</p>
              {battle.conflict}
            </div>
            <div>
              <p>Era</p>
              {battle.era}
            </div>
            <div>
              <p>Date</p>
              {battle.date}
            </div>
            <div>
              <p>Location</p>
              {battle.location}
            </div>
            <div className={styles.dataOutcome}>
              <p>outcome</p>
              {battle.outcome}
            </div>
            <div className={styles.dataCombatants}>
              <p>Combatants</p>
              <p id={styles.com1}>{battle.combatants1}</p>
              <p id={styles.com2}>{battle.combatants2}</p>
            </div>
          </div>
        </div>

        <div className={styles.secondSection}>
          <div className={styles.battleDescription}>
            <p>{battle.description}</p>
          </div>

          <div className={styles.deleteAndEditButtons}>
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
          </div>
          <h2>Comments</h2>

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
                  {isLoggedIn() || (
                    <img
                      src="https://static.wikia.nocookie.net/bfdbd325-0a25-419a-ba56-1dd2e41edcc6"
                      alt="user profile"
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
