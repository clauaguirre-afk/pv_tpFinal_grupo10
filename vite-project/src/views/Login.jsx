import { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import {Box,Paper,Typography,TextField,Button,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Login() {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("Soporte");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "") {
      alert("Ingrese el nombre del administrador.");
      return;
    }
    login({nombre, sector,});
    navigate("/");
  };
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center",
        alignItems: "center", background: "linear-gradient(to right, #e3f2fd, #f5f5f5)"}}>
      <Paper elevation={8} sx={{ width: 430, p: 5, borderRadius: 4 }}>
        <Box textAlign="center" mb={4}>
          <AccountCircleIcon color="primary" sx={{ fontSize: 75 }}/>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Panel de Clientes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Inicio de sesión del Administrador
          </Typography>

        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Nombre del Administrador" value={nombre} onChange={(e) => setNombre(e.target.value)} margin="normal" required/>

          <FormControl fullWidth margin="normal">
            <InputLabel>
              Sector
            </InputLabel>
            <Select value={sector} label="Sector" onChange={(e) => setSector(e.target.value)}>
              <MenuItem value="Soporte">
                Soporte
              </MenuItem>
              <MenuItem value="Gerencia">
                Gerencia
              </MenuItem>

            </Select>

          </FormControl>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, mb: 3 }}>
            Seleccione el sector correspondiente para acceder al sistema.
          </Typography>

          <Button type="submit" variant="contained" fullWidth size="large" sx={{py: 1.5, borderRadius: 3, fontWeight: "bold", textTransform: "none", fontSize: "1rem"}}>
            Ingresar al Sistema
          </Button>

        </Box>
      </Paper>
    </Box>
  );
}

export default Login;