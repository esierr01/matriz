import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Matriz({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const numeros = Array.from({ length: 100 }, (_, i) => i);

  const [seleccionado, setSeleccionado] = useState(() => {
    const guardado = localStorage.getItem('matriz_seleccionada');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('matriz_seleccionada', JSON.stringify(seleccionado));
  }, [seleccionado]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/'); // Vuelve al login
  };

  const handleClearAll = () => {
    const seguro = window.confirm("¿Estás seguro de que quieres desmarcar todos los números?");
    if (seguro) {
      setSeleccionado([]);
    }
  }

  const toggleSeleccion = (num) => {
    if (seleccionado.includes(num)) {
      setSeleccionado(seleccionado.filter(n => n !== num))
    } else {
      setSeleccionado([...seleccionado, num])
    }
  }

  return (
    <div className='matriz'>
      <h1>Panel de Matriz</h1>
      <div className='grid'>
        {numeros.map((num) => (
          <button
            key={num}
            className={`cell ${seleccionado.includes(num) ? 'active' : ''}`}
            onClick={() => toggleSeleccion(num)}
          >
            {
              seleccionado.includes(num) ? 'X' :
                num.toString().padStart(2, '0')
            }
          </button>
        ))}
      </div>
      <div className="container-btn">
        <button onClick={handleLogout}>Cerrar Sesión</button>
        <button onClick={handleClearAll}>Limpiar Todo</button>
      </div>

    </div>
  );
}

export default Matriz;