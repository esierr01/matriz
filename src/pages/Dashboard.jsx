import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { showValidationMessage } from '../components/Message';
import { downloadComponentAsImage } from '../services/imageService';

import styles from './Dashboard.module.css';

function Dashboard({ setIsAuthenticated }) {
    const navigate = useNavigate();
    // const dashboardRef = useRef(null);
    const ticketRef = useRef(null);
    const numeros = Array.from({ length: 100 }, (_, i) => i);

    // const [seleccionado, setSeleccionado] = useState([])
    // Inicializamos el estado intentando leer de LocalStorage
    const [seleccionado, setSeleccionado] = useState(() => {
        const guardados = localStorage.getItem('numerosLote');
        return guardados ? JSON.parse(guardados) : [];
    });

    const [valor, setValor] = useState(() => {
        return localStorage.getItem('loteValor') || '';
    });

    const [premio, setPremio] = useState(() => {
        return localStorage.getItem('lotePremio') || '';
    });

    const [fecha, setFecha] = useState(() => {
        return localStorage.getItem('loteFecha') || '';
    });

    // useEffect para guardar automáticamente cuando 'seleccionado' cambie
    useEffect(() => {
        localStorage.setItem('numerosLote', JSON.stringify(seleccionado));
        localStorage.setItem('loteValor', valor);
        localStorage.setItem('lotePremio', premio);
        localStorage.setItem('loteFecha', fecha);
    }, [seleccionado, valor, premio, fecha]);

    const handleToggleNumero = (num) => {
        if (seleccionado.includes(num)) {
            setSeleccionado(seleccionado.filter(n => n !== num));
        } else {
            setSeleccionado([...seleccionado, num]);
        }
    }

    const handleClearAll = async () => {
        try {
            const result = await showValidationMessage({
                title: '¿Cuidado!!',
                text: '¿Desea desmarcar todos los números seleccionados?',
                icon: 'warning'
            });

            if (result && result.isConfirmed) {
                setSeleccionado([]); // Limpia el array
            }
        } catch (error) {
            console.error("Error al limpiar el tablero:", error);
        }
    };

    const handleGenerateImage = async () => {
        try {
            // Capturamos el TICKET oculto, no el dashboard de trabajo
            await downloadComponentAsImage(ticketRef, `loteria-${Date.now()}.png`);
        } catch (err) {
            showMessage({
                title: 'Error',
                text: 'No se pudo generar la imagen para WhatsApp',
                icon: 'error'
            });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/'); // Vuelve al login
    };

    const formatearFechaVisual = (fechaInput) => {
        if (!fechaInput) return 'DD/MM/AAAA';
        const [year, month, day] = fechaInput.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div className={styles.container}>
                {/* TABLERO OCULTO PARA IMAGEN */}
                <div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
                    <div ref={ticketRef} className={styles.ticketExport}>
                        <div className={styles.exportHeader}>
                            <div className={styles.exportTitle}>DINÁMICAS A&L</div>
                            <div className={styles.exportSub}>JUEGA Y GANA</div>
                            <div className={styles.exportPremio}>Premio: ${premio}</div>
                            <div className={styles.exportValor}>Valor: ${valor}</div>
                            <div className={styles.exportFecha}>
                                Fecha: {formatearFechaVisual(fecha)}
                            </div>
                        </div>
                        <div className={styles.exportGrid}>
                            {numeros.map((num) => (
                                <div
                                    key={num}
                                    className={`${styles.exportCell} ${seleccionado.includes(num) ? styles.exportSelected : ''}`}
                                >
                                    {num.toString().padStart(2, '0')}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* FIN TABLERO OCULTO PARA IMAGEN */}

                <h1 className={styles.h1}>Tablero de Lotería</h1>

                <main className={styles.mainContainer}>
                    <section className={styles.leftSection}>
                        <div className={styles.grid}>
                            {numeros.map((num) => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => handleToggleNumero(num)}
                                    className={`${styles.numberButton} ${seleccionado.includes(num) ? styles.selected : styles.unselected}`}
                                >
                                    {seleccionado.includes(num) ? 'X' : num.toString().padStart(2, '0')}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section className={styles.rightSection}>
                        <h2>Estatus</h2>
                        <hr className={styles.separador} />
                        <p className={styles.informacion}>Números vendidos: <span>{seleccionado.length}</span> - disponibles: <span>{100 - seleccionado.length}</span></p>
                        <div className={styles.inputGroup}>
                            Premio:
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Premio $$"
                                value={premio}
                                onChange={(e) => setPremio(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            Valor:
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Valor $$"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            Fecha del Sorteo:
                            <input
                                type="date"
                                className={styles.inputDate}
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>



                        {/* <p>Números disponibles: {100 - seleccionado.length}</p> */}
                        <hr className={styles.separador} />
                        <div className={styles.buttonGroup}>
                            <button className={styles.button} onClick={handleLogout}>Salir</button>
                        </div>
                        <hr className={styles.separador} />
                        <div className={styles.buttonGroup}>
                            <button className={styles.button} onClick={handleClearAll}>Desmarcar Todo</button>
                            <button className={styles.button} onClick={handleGenerateImage} >Imprimir</button>
                        </div>
                    </section>
                </main>


            </div>
        </>
    )
}

export default Dashboard