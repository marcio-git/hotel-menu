import { Button } from "react-bootstrap";

export default function CartWidget({show, setShow}) {
  return (
    <Button 
      variant="primary"
      // style={{float: "right", marginLeft: '1em'}}
      onClick={()=>setShow(!show)}
      className="me-2">
      Menú
    </Button>
  )
}