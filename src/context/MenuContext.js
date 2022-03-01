import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const MenuContext = createContext();

export default function MenuProvider({ children }) {
	const [menu, setMenu] = useState([])
	// const [totalPrice, setTotalPrice] = useState(0)

/* ---------------------- agrega un plato al menu --------------------- */
  const addDish = (item) => {
    if(menu.length < 4) {
      const { id: itemId } = item;
      //busca el menu para evitar agregar duplicados
      const exists = findMenu(itemId);
      if (exists) {
        Swal.fire("Oops!", "Este plato ya está en el menú", "warning");
      }
      else {
        setMenu([...menu, item])
        Swal.fire({
          icon: 'success',
          title: '¡Plato agregado!',
          showConfirmButton: false,
          timer: 1000 
        })
      }
    } else {
      Swal.fire("¡Lleno!", "Menú lleno, solo puede agregar 4 platos", "error");
    }
  }
  /* ---------------- remueve un plato del menu por usando su id --------------- */
	const removeDish = itemId => {
    Swal.fire({
      title: '¿Está seguro?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El plato ha sido eliminado.',
          'success'
        )
        let newMenu = menu.filter(dish => dish.id !== itemId);
        setMenu(newMenu)
      }
    })
	}
  /* --------------------- promedio health scorey tiempo -------------------- */
  // const promedios = items => {
  // }

  /* ------------------------- funcion buscar plato ------------------------ */
	const findMenu = itemId => menu.find(dish => dish.id === itemId);

  return <MenuContext.Provider value={{ menu, setMenu, addDish, removeDish}}>
    {children}
  </MenuContext.Provider>
}