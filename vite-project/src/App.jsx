import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { ListaClientes } from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";
import { Header } from "./components/layout/Header";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Container } from "@mui/material";
import FormularioAlta from "./components/common/FormularioAlta";
import { ClientesProvider } from "./context/ClientesContext";

function App() {
  return (
     <ClientesProvider>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <Header />
                <Nav />
                <Dashboard />
                <Footer />
              </Container>
            </ProtectedRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ py: 4 }}>           
                <Header />
                <Nav />
                <ListaClientes />
                <Footer />
              </Container>
            </ProtectedRoute>
          }
        />
        
        <Route
            path="/nuevo-cliente"
            element={
              <ProtectedRoute>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                  <Header />
                  <Nav />
                  <FormularioAlta />
                  <Footer />
                </Container>
              </ProtectedRoute>
            }
          />

        <Route
          path="/clientes/:id"
          element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ py: 4 }}>           
                <Header />
                <Nav />
                <DetalleCliente />
                <Footer />
              </Container>
            </ProtectedRoute>
          }
        />

      </Routes>
    </ClientesProvider> 
  );
}

export default App
