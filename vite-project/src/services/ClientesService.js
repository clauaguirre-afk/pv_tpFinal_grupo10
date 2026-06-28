import { useState, useEffect } from "react";

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerClientes = async () => {
            try {
                const respuesta = await fetch('https://fakestoreapi.com/users');
                if (!respuesta.ok) throw new Error('Error al conectad con la base de datos');

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

    return { clientes, cargando, error };
}