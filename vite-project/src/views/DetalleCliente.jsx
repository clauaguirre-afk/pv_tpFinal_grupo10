import { useParams} from "react-router-dom";
//Agregue el usesParams para obtener el ID del cliente
import { useState, useEffect } from "react";

function DetalleCliente() {
  const {id} = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(()=>{
    fetch(`https://fakestoreapi.com/users/${id}`)
    .then(res => res.json())
    .then(data => setCliente(data))
    .catch(error => console.log(error)); //para evitar errores si falla la api
  }, [id]);

  if(!cliente){
    return <h2>Cargando...</h2>
  }
  
  return (
    <div>
      <h1>Detalle Cliente</h1>

      <p>Nombre: {cliente.name.firstname} {cliente.name.lastname}</p>
      <p>Email: {cliente.email}</p>
      <p>Telefono: {cliente.phone}</p>

      <p>Usuario: {cliente.username}</p>
      <p>Contraseña: {cliente.password}</p>

      <h3>Dirección</h3>

      <p>Calle: {cliente.address.street}</p>
      <p>Número: {cliente.address.number}</p>
      <p>Ciudad: {cliente.address.city}</p>
      <p>Código Postal: {cliente.address.zipcode}</p>

    </div>
  )
}
export default DetalleCliente;