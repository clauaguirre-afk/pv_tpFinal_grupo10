import { useState } from "react";
import { Link } from "react-router-dom";
import { useClientes } from "../services/ClientesService";
import { Box, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, CircularProgress, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const ListaClientes = () => {

  const { clientes, cargando, error } = useClientes();

  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.name.firstname} ${cliente.name.lastname}`.toLowerCase();
    const textoBusqueda = busqueda.toLowerCase();

    return nombreCompleto.includes(textoBusqueda);
  });

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 8 }}>
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
          Cargando lista de clientes, por favor espere...
        </Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Ocurrió un problema de conexión
          </Typography>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p:3, borderRadius: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
        Listado de Clientes Activos
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nombre o apellido..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }       
          }}      
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.map((cliente) => (
              <TableRow key={cliente.id} hover>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.name.firstname}</TableCell>
                <TableCell>{cliente.name.lastname}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/clientes/${cliente.id}`}
                    variant="contained"
                    size="small"
                  >            
                    Ver ficha completa
                  </Button> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};