import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  const [searchGame, setSearchGame] = useState('');;
  const [games, setGames] = useState([])
  

  const getGames = () => {
    fetch(`/api/v1/games/search?search=${searchGame}`)
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
    <div style={{color: 'White'}} >
      <h1> Welcome to Simplicity Game Review</h1>
      <h6> where our mission is to have great game reviews and details about the game! </h6>
      <p> Join our community by registering <a href="/register">here</a></p>
      <form onSubmit={handleSubmit}>
      <InputGroup className="col-5 d-flex justify-content-center align-items-center mx-auto">
        <FormControl
          type='text' onChange={handleChange} value={searchGame}
          placeholder="Search for a game here."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary bg-primary text-white">search</Button>
        </InputGroup.Append>
      </InputGroup>
      </form>
      {games.map(game => {
        return (<div>
          <Link to={`/game/${game.slug}`}>{game.name}</Link>
          </div>)
      })}
    </div>

  )
}
