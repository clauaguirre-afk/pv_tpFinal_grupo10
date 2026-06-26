import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

export const Header = () => {
    const navigate = useNavigate();

    const {admin, logout} = useContext(AdminContext);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <div>
                <h2>Panel de Control</h2>
                {admin && (
                    <p>
                        Usuario: {admin.nombre} | Sector: {admin.sector}
                    </p>
                )}
            </div>
            <button onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </header>
    )
}