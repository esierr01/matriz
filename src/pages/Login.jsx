import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'admin') {
      setIsAuthenticated(true);
      navigate('/Matriz'); // Redirige a la matriz
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className='Login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value.toLowerCase())}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;