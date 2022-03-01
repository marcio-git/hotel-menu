import { Button } from "react-bootstrap"

export const BotonAgregarPlato = ({dish, addDish}) => {
  return (
    <Button variant="primary" onClick={() => addDish(dish)}>
      Agregar al Menú
    </Button>
  )
}