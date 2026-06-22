import { createContext, useState, useEffect } from "react";
// Creamos el contexto
export const AdminContext = createContext();
// Creamos el Provider
export const AdminProvider = ({ children }) => {
  // Al principio no hay administrador logueado
  const [admin, setAdmin] = useState(() => {
    const adminGuardado = localStorage.getItem("admin");

    return adminGuardado
    ? JSON.parse(adminGuardado)
    : null;
  });
  // Función para iniciar sesión
  const login = (datosAdmin) => {
    setAdmin(datosAdmin);
  };
  // Función para cerrar sesión
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };
  useEffect(() => {
    if (admin) {
      localStorage.setItem( "admin", JSON.stringify(admin));
    }
  }, [admin]);
  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};