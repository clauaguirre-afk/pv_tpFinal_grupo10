import { Box, Typography } from "@mui/material";

export const Footer = () => {
    return (
        <Box
        component="footer"
        sx={{
            p: 2,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "#e3f2fd",
            border: "1px solid #bbdefb",
            mt: 3
        }}
        >
        <Typography variant="body2" color="text.secondary">
            &copy; 2026 - Analista Programador Universitario - UNJu | Grupo 10
        </Typography>
        </Box>
    );
};