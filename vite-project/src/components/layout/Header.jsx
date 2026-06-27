import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

import { Box, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout"

export const Header = () => {
    const navigate = useNavigate();

    const {admin, logout} = useContext(AdminContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box
            component="header"
            sx={{
                p:4,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 3,
                background: "linear-gradient(135deg, #e3f2fd, #f5fbff)",
                border: "1px solid #bbdefb",
                mb: 3
            }}
        >
            <Box>
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                    Panel de Control
                </Typography>
                {admin && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt:1 }}>
                        Usuario: {admin.nombre} | Sector: {admin.sector}
                    </Typography>
                )}
            </Box>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                endIcon={<LogoutIcon />}
            >
                Cerrar Sesión
            </Button>

        </Box>
    )
}