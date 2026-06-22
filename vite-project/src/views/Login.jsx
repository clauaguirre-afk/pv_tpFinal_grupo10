import { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const { login } = useContext(AdminContext);

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("Soporte");

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      nombre,
      sector,
    });

    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="Soporte">
            Soporte
          </option>

          <option value="Gerencia">
            Gerencia
          </option>
        </select>

        <button type="submit">
          Ingresar
        </button>

      </form>
    </div>
  );
}

export default Login;