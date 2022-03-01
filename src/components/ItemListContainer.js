import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ItemDetail from "./ItemDetail";
import {MenuContext} from "../context/MenuContext"
import { BotonAgregarPlato } from "./BotonAgregarPlato"

export const ItemListContainer = ({setLoading, dishes}) => {
  const { addDish } = useContext(MenuContext)
  const [renderDetail, setRenderDetail] = useState(false)

  return (<>
    <ItemDetail 
      close={setRenderDetail}
      render={renderDetail}
      setRender={setRenderDetail}
      addDish={addDish}
      setLoading={setLoading}
    />
    <Row xs={1} md={2} lg={4} className="g-4">
      {dishes.map((res) => (
          <Col key={res.id} style={{display: renderDetail ? 'none' : 'block'}}>
            <Card>
              <Card.Img variant="top" src={res.image} />
              <Card.Body>
                <Card.Title>{res.title}</Card.Title>
                <BotonAgregarPlato dish={res} addDish={addDish}/>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>vengano: {res.vegan ? '✅ ' : '❌'}</ListGroupItem>
                <ListGroupItem>Healt Score: {res.healthScore}</ListGroupItem>
                <ListGroupItem>
                  <Link 
                    to={`item/${res.id}`} 
                    onClick={()=>setRenderDetail(true)}>
                    Detalles
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        ))}
    </Row>
    </>
  )
}