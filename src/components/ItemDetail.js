import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Container, CloseButton, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Swal from "sweetalert2";
import { getRecipesDetail } from "../services/services";
import { BotonAgregarPlato } from "./BotonAgregarPlato"

export default function ItemDetail({close, render, setRender, addDish, setLoading}) {
  const [dish, setDish] = useState(false);
	const {id} = useParams();
  
  useEffect(() => {
    if(id) {
      setRender(true)
      setLoading(true)
      getRecipesDetail(id)
        .then(res => {
          if(res.data.length === 0) Swal.fire("Error!", "No se encotró el plato", "error");
          setDish(res.data)
          setLoading(false);
        })
    }
  }, [id])
  return (<>
    {render && <Container>
      {dish && <Card border="gray">
        <Card.Header as="h3">{dish.title}</Card.Header>
        <Card.ImgOverlay style={{left: 'auto', top: '-0.5rem'}}>
          <Link to={`/`}>
            <CloseButton onClick={()=>close(false)}/>
          </Link>
        </Card.ImgOverlay>
        <Card.Img variant="bottom" src={dish.image} />
        <Card.ImgOverlay style={{left: 'auto', top: '3rem'}}>
          <BotonAgregarPlato dish={dish} addDish={addDish}/>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title>Tipos de Platos</Card.Title>
          <ul>
            {dish.dishTypes.map((item, idx)=>{
              return <li key={idx}>{item}</li>
            })}
          </ul>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Heatlh Score: {dish.healthScore}</ListGroupItem>
          <ListGroupItem>Vegano: {dish.vegan ? '✅' : '❌'}</ListGroupItem>
          <ListGroupItem>Libre Gluten: {dish.glutenFree ? '✅' : '❌'}</ListGroupItem>
          <ListGroupItem>Listo en {dish.readyInMinutes} minutos</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Title>Instructiones:</Card.Title>
          <Card.Text>{dish?.instructions}</Card.Text>
        </Card.Body>
      </Card>}
    </Container>}
  </>
  )
}