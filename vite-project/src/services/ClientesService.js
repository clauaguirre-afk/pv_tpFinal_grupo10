export const ClientesService = {
    obtenerTodos: async () => {
        const respuesta = await fetch('https://fakestoreapi.com/users');
        if (!respuesta.ok) throw new Error('Error al conectar con la base de datos');
        return await respuesta.json();
    }
};