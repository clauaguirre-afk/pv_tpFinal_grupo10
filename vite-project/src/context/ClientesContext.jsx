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
        setClientes(clientesActuales => [...clientesActuales, nuevoCliente]);
    };
    
    const eliminarCliente = (id) => {
        setClientes(clientesActuales => clientesActuales.filter(cliente => cliente.id !== Number(id)));
    };

    return (
        <ClientesContext.Provider value={{ clientes, cargando, error, agregarClienteManual, eliminarCliente}}>
            {children}
        </ClientesContext.Provider>
    );
};

export const useClientesGlobal = () => useContext(ClientesContext);