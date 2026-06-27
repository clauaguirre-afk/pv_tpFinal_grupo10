import { Link } from "react-router-dom";

import { Box, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const Nav = () => {
    return(
        <Box
            component="nav"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
                gap: 2,

                backgroundColor: '#f5fbff',
                border: '1px solid #bbdefb',
                borderRadius: 3,
                p: 1,
                mb: 3
            }}
        >            
            <Button
                component={Link}
                to="/clientes"
                variant="text"
                startIcon={<PeopleIcon />}
                sx={{
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '15px',
                    p: '8px 16px',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#e3f2fd'}
                }}
            >
                Listado de Clientes
            </Button>
            <Button
                component={Link}
                to="/nuevo-cliente"
                variant="text"
                startIcon={<PersonAddIcon />}
                sx={{ 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    fontSize: '15px',
                    p: '8px 16px',
                    borderRadius: 2,
                    '&:hover': { backgroundColor: '#e3f2fd' }
                }}
            >
                Registrar Cliente
            </Button>           
        </Box>
    );
};