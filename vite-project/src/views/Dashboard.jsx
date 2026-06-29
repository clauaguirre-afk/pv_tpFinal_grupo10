import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import {Paper,Typography,Grid,Card,CardContent} from "@mui/material";
import { useClientesGlobal } from "../context/ClientesContext";
function Dashboard(){
  const {admin}=useContext(AdminContext);
  const {clientes}=useClientesGlobal();
  return(
  <>
    <Typography variant="h4" fontWeight="bold" mb={3}>
      Dashboard
    </Typography>
    <Typography variant="body1" mb={4}> Bienvenido <strong>{admin.nombre}</strong>. 
      Desde este panel podrá administrar los clientes del sistema.
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6"> 
              Clientes registrados
            </Typography>
            <Typography variant="h3">
              {clientes.length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Administrador
            </Typography>
            <Typography>
              {admin.nombre}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Sector
            </Typography>
            <Typography>
              {admin.sector}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
)}
export default Dashboard;