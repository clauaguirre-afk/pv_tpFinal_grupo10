import { createContext, useEffect, useState, useContext } from "react";
import { ClientesService} from "../services/ClientesService";

export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const datos = await ClientesService.obtenerTodos();
                setClientes(datos);
            } catch(err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        cargarClientes();
    }, []);

    const agregarClienteManual = (nuevoCliente) => {
        const idMax = clientes.length > 0
            ? Math.max(...clientes.map(c => Number(c.id) || 0))
            : 0;

        const idGenerado = idMax + 1;

        const clienteCompleto = { ...nuevoCliente, id: idGenerado };
        setClientes((clientesActuales) => [...clientesActuales, clienteCompleto]);

        return idGenerado;
    };

    return (
        <ClientesContext.Provider value={{ clientes, cargando, error, agregarClienteManual }}>
            {children}
        </ClientesContext.Provider>
    );
};

export const useClientesGlobal = () => useContext(ClientesContext);