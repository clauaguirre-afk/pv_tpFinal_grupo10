import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";

function App() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <ListaClientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes/:id"
        element={
          <ProtectedRoute>
            <DetalleCliente />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App
