import { useParams} from "react-router-dom";
//Agregue el usesParams para obtener el ID del cliente
import { useState, useEffect, useContext } from "react";
import {AdminContext } from "../context/AdminContext";

function DetalleCliente() {
  //Obtengo el ID del cliente desde la URL
  const {id} = useParams();
  //Estado para guardar los datos del cliente
  const [cliente, setCliente] = useState(null);
  //Obtengo el administrador desde el context
  const { admin }=useContext(AdminContext);

  //Consulto a la API
  useEffect(()=>{
    fetch(`https://fakestoreapi.com/users/${id}`)
    .then(res => res.json())
    .then(data => setCliente(data))
    .catch(error => console.log(error)); //para evitar errores si falla la api
  }, [id]);

  //Funcion para simular la eliminacion
  const eliminarCliente = () =>{
    fetch(`https://fakestoreapi.com/users/${id}`,{
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
      alert("Cliente eliminado (simulación)");
    });
  };

  //Para evitar errores, mientra los datos no llegan
  if(!cliente){
    return <h2>Cargando...</h2>
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
        <button 
        onClick={eliminarCliente} 
        style={{
        backgroundColor: "red", 
        color: "white", 
        padding: "10px", 
        border:"none", 
        marginTop: "15px", 
        cursor: "pointer"}}> 
        Eliminar Cliente de la Base de Datos
        </button>
      )}
    </div>
  )
}
export default DetalleCliente;