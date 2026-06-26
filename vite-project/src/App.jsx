import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
import { Header } from "./components/layout/Header";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";

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
            <Header />
            <Nav />
            <Dashboard />
            <Footer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Header />
            <ListaClientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/clientes/:id"
        element={
          <ProtectedRoute>
            <Header />
            <DetalleCliente />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App
