import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Search } from "../components/Search"
import { ItemListContainer } from "../components/ItemListContainer";
import { Nav } from "../components/Nav"
import { MenuView } from "../components/MenuView";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [show, setShow] = useState(false);

  return (<>
    <Nav setShow={setShow} />
    <Container>
      {loading && <Spinner animation="border" variant="primary" style={{ float: "right" }} />}
      <Search setDishes={setDishes} setLoading={setLoading} />
      <ItemListContainer setLoading={setLoading} dishes={dishes} />
      <MenuView show={show} setShow={setShow} />
    </Container>
  </>
  )
}