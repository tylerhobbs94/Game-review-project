import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useState } from 'react'

export default function Home() {
  const [searchGame, setSearchGame] = useState('');;
  const [games, setGames] = useState([])

  const getGames = () => {
    fetch(`https://api.rawg.io/api/games?key=f0e187292b2a485385b0e17680f16a2b${searchGame}`)
      .then((res) => res.json())
      .then((data) => {
      setGames(data.results || [])
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getGames();
  }
const handleChange = (e) => {
  setSearchGame(e.target.value)
}


  return (
    <div >
      <h1> Welcome to Simplicity Game Review</h1>
      <h6> where our mission is to have great game reviews and details about the game! </h6>
      <p> Join our community by registering <a href="/register">here</a></p>
      <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FormControl
          type='text' onChange={handleChange} value={searchGame}
          placeholder="Search for a game here."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary">search</Button>
        </InputGroup.Append>
      </InputGroup>
      </form>
      {games.map(game => {
        return (<div>{game.name}</div>)
      })}
    </div>

  )
}
