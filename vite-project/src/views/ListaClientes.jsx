import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('https://fakestoreapi.com/users');
        if (!respuesta.ok) throw new Error('Error al conectar con la base de datos');

        const datos = await respuesta.json();
        setClientes(datos);
        setCargando(false);
      } catch(err) {
        setError(err.message);
        setCargando(false);
      }
    };

    obtenerClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.name.firstname} ${cliente.name.lastname}`.toLowerCase();
    const textoBusqueda = busqueda.toLowerCase();

    return nombreCompleto.includes(textoBusqueda);
  });

  if (cargando) return <h3>Cargando lista de clientes, por favor espere...</h3>;
  if (error) return <h3>Ocurrió un problema: {error}</h3>;

  return (
    <div>
      <h2>Listado de Clientes Activos</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}>  
        </input>
      </div>
      {/* Tabla de Clientes*/}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name.firstname}</td>
                <td>{cliente.name.lastname}</td>
                <td>{cliente.email}</td>
                <td>
                  <Link to={`/clientes/${cliente.id}`}>
                    Ver Ficha Completa
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No se encontraron clientes con ese nombre</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};