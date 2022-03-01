import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import Swal from "sweetalert2";
import { getRecipes } from "../services/services";

export const Search = ({ setLoading, setDishes }) => {
  return (
    <>
      <Formik
        initialValues={{ 
          dish: "",
          vegan: false
        }}
        validate={(valores) => {
          let errores = {}
          if(!valores.dish){
            errores.dish = 'Por favor ingresa un plato'
          } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.dish)){
            errores.dish = 'Solo puede contener letras y espacios'
          }
          return errores
        }}
        onSubmit={(valores) => {
          setLoading(true);
          getRecipes(valores)
            .then(res => {
              if(res.data.results.length === 0) Swal.fire("Error!", "No se encotró la búsqueda", "error");
              setLoading(false);
              setDishes(res.data.results)
            })
            .catch(error => console.log(error))
        }}
      >
        {({ values, errors, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit} style={{ width: '400px' }}>
            <InputGroup className="mb-2">
              <FormControl
                name="dish"
                placeholder="Buscar"
                aria-label="Buscar"
                aria-describedby="basic-addon2"
                value={values.dish}
                onChange={handleChange}
              />
              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </InputGroup>
            <InputGroup className="mb-2">
              <Form.Check 
                type="checkbox" 
                label="Vegano" 
                name="vegan"
                value={values.vegan}
                onChange={handleChange}
              />
              <ErrorMessage name="dish" component={()=>(
                <Form.Text style={{color: 'red', marginLeft: 'auto'}}>
                  {errors.dish}
                </Form.Text>
              )}/>
            </InputGroup>
          </Form>
        )}
      </Formik>
      
    </>
  );
};
