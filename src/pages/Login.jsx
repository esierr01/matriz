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
          placeholder="Usuario" 
          onChange={(e) => setUser(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={(e) => setPass(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;