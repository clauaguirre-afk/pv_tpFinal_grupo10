import { useParams} from "react-router-dom";
//Agregue el usesParams para obtener el ID del cliente

function DetalleCliente() {
  const {id} = useParams();
  
  return (
    <div>
      <h1>Detalle Cliente</h1>;
      <p>Cliente seleccionado: {id}</p>

    </div>
  )
}
export default DetalleCliente;