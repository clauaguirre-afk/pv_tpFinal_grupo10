import { Link } from "react-router-dom";

export const Nav = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to="/clientes">
                        Lista de Clientes
                    </Link>
                </li>
                <li>
                    <span>
                        Nuevo Cliente
                    </span>
                </li>
            </ul>
        </nav>
    );
};