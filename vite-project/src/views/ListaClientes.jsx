import {Link} from "react-router-dom"
function ListaClientes() {
  const clientes = [
    {id: 1, nombre: "Cliente 1"},
    {id: 2, nombre: "Cliente 2"},
    {id: 3, nombre: "Cliente 3"}
  ];
  return (
    <div>
      <h1>Lista de Clientes</h1>

    {clientes.map((cliente)=>(
      <div key={cliente.id}>
        <p>{cliente.nombre}</p>

        <Link to={`/clientes/${cliente.id}`}>
        Ver Ficha Completa
        </Link>
      </div>
    ))}
    </div>
  );
}

export default ListaClientes;