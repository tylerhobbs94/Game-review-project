import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import Comments from '../components/Comments';
import Reviews from '../components/Reviews'


export default function Games() {
    const [gameData, setGameData] = useState(null)
    // const [gameDetails, setGameDetails] = useState([])
    const { slug } = useParams()


    useEffect(() => {
        fetch(`/api/v1/games/detail/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                setGameData(data)
            })
    }, [slug])
    if (!gameData) {
        return ("Loading")
    } else {
    }
    return (
        <div>
            <Row>
                <Card style={{ border: "none" }} className="col-7 ml-5 bg-dark text-white">
                    <Card.Img src={gameData.background_image} alt="Card image" />
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>Game title :  {gameData.name}</ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>Release date :  {gameData.released} </ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'># of reviews :  {gameData.ratings_count} </ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>Total rating :  {gameData.rating} </ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>MetaCritic Review :  {gameData.metacritic} </ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>Website :  <a href={gameData.website}> {gameData.website} </a>  </ListGroup.Item>

                        {/* set slug to equal gameData.slug so we can pass it to the comments.js */}
                    </ListGroup>
                    <Card.ImgOverlay>
                    </Card.ImgOverlay>
                </Card>
                <Card className="col-3 bg-dark ml-5 mb-5">
                    <ListGroup variant="flush">
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark font-weight-bold'>Game Description</ListGroup.Item>
                        <ListGroup.Item style={{ color: 'white' }} className='bg-dark'>  {gameData.description_raw} </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Row>
            <Row>
                <Card className=" m-5 col-7 bg-dark ml-5">
                    <Card.Body>
                    <Card.Title  className="text-white font-weight-bold">Comment Section</Card.Title>
                    <Card.Text>
                    <Comments  slug={gameData.slug} />
                    </Card.Text>
                    </Card.Body>
                    </Card>


            <Card className=" m-6 col-3 bg-dark">
                    <Card.Body>
                    <Card.Title  className="text-white font-weight-bold">Reviews</Card.Title>
                    <Card.Text>
                    <Reviews  slug={gameData.slug} />
                    </Card.Text>
                    </Card.Body>
                    </Card>
            </Row>

        </div>
    )
}
