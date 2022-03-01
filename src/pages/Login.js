import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import { Formik, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import estilos from "./Login.module.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner"
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const [formularioEnvidado, setFormularioEnviado] = useState()

  useEffect(() => {
    return () => {
      console.log("unmounted")
    }
  },[isAuthenticated])

  return (isAuthenticated ?
    <Navigate to="/" /> :
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validate={(valores) => {
        let errores = {}

        if(!valores.email){
          errores.email = "Por favor ingrese un correo"
        } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
          errores.email = "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
        }
        if(!valores.password){
          errores.password = "Por favor ingrese su contraseña"
        } else if(!/^.{4,12}$/.test(valores.password)){
          errores.password = "La contraseña tiene que ser de 4 a 12 dígitos."
        }
        return errores
      }}
      onSubmit={(valores, {resetForm}) => {
        resetForm()
        setFormularioEnviado(true)
        setTimeout(()=> setFormularioEnviado(false), 2000)
        login(valores)
          .then(({response}) => {
            if(response.status === 401) {
              return Swal.fire("¡Intente otra vez!", `Error ${response.status}: ${response.data.error}`, "error")
            };
            if(response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                showConfirmButton: false,
                timer: 1000 
              })
              return <Navigate to="/" />
            };
          })
          .catch(error => console.log(error))
      }}>
      {({values, errors, handleSubmit, handleChange, handleBlur}) => (
        <Form className={estilos.container} onSubmit={handleSubmit} >
          <h2>Iniciar Sesión</h2>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              id="email"
              placeholder="Enter email" 
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="email" component={()=>(
              <Form.Text style={{color: 'red'}}>{errors.email}</Form.Text>
            )}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              id="password"
              placeholder="Password" 
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="password" component={()=>(
              <Form.Text style={{color: 'red'}}>{errors.password}</Form.Text>
            )}/>
          </Form.Group>
          
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}

          <Button variant="primary" type="submit">
            {!formularioEnvidado ? "Ingresar" : 
            <>Cargando<Spinner animation="border"size="sm"/></>}
          </Button>
        </Form>
      )}
    </Formik>
  )
}