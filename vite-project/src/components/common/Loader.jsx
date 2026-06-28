import { Box, CircularProgress, Typography } from "@mui/material";

export const Loader = ({mensaje = "Cargando, por favor espere..."}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}>
            {mensaje}
        </Typography>
        </Box>
    );
}