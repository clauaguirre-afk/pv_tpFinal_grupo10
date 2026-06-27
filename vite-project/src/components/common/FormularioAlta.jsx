import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { TextField, Button, Box, Typography, Snackbar, Alert, Paper, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FormularioAlta = () => {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [nuevoId, setNuevoId] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Envío Asincrónico Interceptado (Petición POST)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Detiene la recarga del navegador
    setCargando(true);

    // Mapeo de variables al formato JSON
    const usuarioAEnviar = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname
      }
    };

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioAEnviar)
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor remoto. Código: ${response.status}`);
      }

      const data = await response.json();
      
      // Captura del ID y disparo del Feedback Visual temporal
      setNuevoId(data.id);
      setOpenSnackbar(true);
      
      // Reseteo inmediato de campos tras la confirmación de éxito
      setFormData({ email: '', username: '', password: '', firstname: '', lastname: '' });

    } catch (error) {
      console.error("Error al registrar cliente en el Módulo C:", error);
    } finally {
      setCargando(false);
    }
  };

   return (
    <Paper elevation={2} sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 4, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.main' }}>
        Dar de Alta Nuevo Cliente
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField label="Nombre" name="firstname" value={formData.firstname} onChange={handleChange} required fullWidth />
          <TextField label="Apellido" name="lastname" value={formData.lastname} onChange={handleChange} required fullWidth />
        </Box>

        <TextField label="Nombre de Usuario" name="username" value={formData.username} onChange={handleChange} required fullWidth />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
        <TextField label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} required fullWidth />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button 
            type="button" 
            variant="outlined" 
            color="secondary" 
            size="large" 
            fullWidth
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/clientes')} 
            sx={{ borderRadius: 2 }}
          >
            Regresar
          </Button>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large" 
            disabled={cargando} 
            fullWidth
            sx={{ borderRadius: 2 }}
          >
            {cargando ? 'Registrando...' : 'Registrar'}
          </Button>
        </Box>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%', boxShadow: 3 }}>
          ¡Cliente creado con éxito! ID asignado por servidor: {nuevoId}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormularioAlta;