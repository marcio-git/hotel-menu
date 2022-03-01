import { Navbar, Container, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom"
import MenuWidget from "../components/MenuWidget"
import { useAuth } from "../hooks/useAuth";

export const Nav = ({setShow}) => {
  const { deleteValue } = useAuth()

  return (
    <Navbar bg="light" expand="lg"className="mb-2">
      <Container>
        <Navbar.Brand style={{marginRight:"auto"}}>Hotel Menu</Navbar.Brand>
        <MenuWidget setShow={setShow}/>
        <Button 
          variant="outline-danger"
          onClick={() => {
            deleteValue()
            return <Navigate to="/" />
          }}>
          Log out
        </Button>
      </Container>
    </Navbar>
  )
}