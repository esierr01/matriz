import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

function Matriz({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const numeros = Array.from({ length: 100 }, (_, i) => i);

  const [seleccionado, setSeleccionado] = useState(() => {
    const guardado = localStorage.getItem('matriz_seleccionada');
    return guardado ? JSON.parse(guardado) : [];
  });

  const vendidos = seleccionado.length;
  const disponibles = 100 - vendidos;

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

  const handlePrint = async () => {
    if (gridRef.current) {
      const canvas = await html2canvas(gridRef.current, {
        backgroundColor: '#242424', // Forzamos el color de fondo en la imagen
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'matriz_numeros.png';
      link.click();

      alert("Imagen generada. Ahora puedes compartirla en WhatsApp.");
    }
  };

  return (
    <div className='matriz'>
      <h1>Panel de Matriz</h1>
      <div ref={gridRef} style={{ padding: '20px' }}>
        <div className='grid' >
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
        <div className='leyenda'>
          <p>
            <strong>Números vendidos:</strong> {vendidos}
          </p>
          <p>
            <strong>Números disponibles:</strong> {disponibles}
          </p>
        </div>
      </div>


      <div className="container-btn">
        <button onClick={handleLogout}>Cerrar Sesión</button>
        <button onClick={handleClearAll}>Limpiar Todo</button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handlePrint}
          style={{ width: '100%', maxWidth: '300px', backgroundColor: '#25D366', color: 'white' }}
        >
          Imprimir / Generar Imagen
        </button>
      </div>
    </div>
  );
}

export default Matriz;