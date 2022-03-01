import { Button } from "react-bootstrap"

export const BotonEliminarPlato = ({dish, removeDish}) => {
  return (
    <Button variant="danger" onClick={() => removeDish(dish)}>
      Eliminar
    </Button>
  )
}