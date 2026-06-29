import { useParams, useNavigate} from "react-router-dom";
//Agregue el usesParams para obtener el ID del cliente
import { useState, useEffect, useContext } from "react";
import {AdminContext } from "../context/AdminContext";
import { CircularProgress, Box, Button } from "@mui/material";
import { useClientesGlobal } from "../context/ClientesContext";
function DetalleCliente() {
  //Obtengo el ID del cliente desde la URL
  const {id} = useParams();
  //Estado para guardar los datos del cliente
  const [cliente, setCliente] = useState(null);
  //Obtengo el administrador desde el context
  const { admin }=useContext(AdminContext);
  //Con eso vas a poder acceder tanto a la lista de clientes como a la función para eliminarlos.
  const { clientes, eliminarCliente } = useClientesGlobal();
  const navigate = useNavigate();
  //Consulto a la API
  useEffect(() => {
    const clienteLocal = clientes.find(c => Number(c.id) === Number(id));
    if (clienteLocal) {
      setCliente(clienteLocal);
      return;
    }
    const obtenerCliente = async () => {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!respuesta.ok)
          throw new Error("Error al obtener cliente");
        const data = await respuesta.json();
        setCliente(data);
      } catch (error) {
          console.error(error);
        }
    };
    obtenerCliente();
  }, [id, clientes]);

  //Funcion para simular la eliminacion
  const eliminarClienteAPI = async () => {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`,
      {method: "DELETE",});
      if (!respuesta.ok) {
        throw new Error("No se pudo eliminar");
      }
      await respuesta.json();
      eliminarCliente(id);
      alert("Cliente eliminado (simulación)");
      navigate("/clientes");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error.");
    }
  };

  //Para evitar errores, mientra los datos no llegan
  if (!cliente) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <div>
      <h1>Detalle Cliente</h1>
      
      {/*Renderizo los datos del cliente */}
      <p>Nombre: {cliente.name.firstname} {cliente.name.lastname}</p>
      <p>Email: {cliente.email}</p>
      <p>Telefono: {cliente.phone}</p>

      {/*Muestro credenciales del cliente */}
      <p>Usuario: {cliente.username}</p>
      <p>Contraseña: {cliente.password}</p>

      {/*Muestro los datos anidados de direccion */}
      <h3>Dirección</h3>

      <p>Calle: {cliente.address.street}</p>
      <p>Número: {cliente.address.number}</p>
      <p>Ciudad: {cliente.address.city}</p>
      <p>Código Postal: {cliente.address.zipcode}</p>

      {/* Solo Gerencia puede eliminar */}
      {admin?.sector === "Gerencia" && (
        <Button color="error" variant="contained" onClick={eliminarClienteAPI}>
          Eliminar Cliente
        </Button>
      )}
    </div>
  )
}
export default DetalleCliente;