import { useContext } from "react";
import { Offcanvas, Card, CardGroup } from "react-bootstrap";
import { MenuContext } from "../context/MenuContext";
import { BotonEliminarPlato } from "./BotonEliminarPlato"

export const MenuView = ({show, setShow}) => {
  const { menu, removeDish } = useContext(MenuContext)
  return (
    <>
      <Offcanvas show={show} onHide={()=>setShow(!show)} placement="bottom" style={{height: '80%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Vista Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CardGroup>
            {menu.length === 0 ? 
             <p className="fs-1 text-center">Menú vacio</p>
             : menu.map(item =>{
            return <Card style={{flex:'0 0 25%'}} key={item.id}>
              <Card.Img variant="top" src={item.image} />
              <Card.ImgOverlay style={{left: 'auto'}}>
                <BotonEliminarPlato dish={item.id} removeDish={removeDish}/>
              </Card.ImgOverlay>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>})}
          </CardGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}