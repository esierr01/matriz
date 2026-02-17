import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css';
import { showMessage } from '../components/Message';
import { ImgEyeOpen, ImgEyeClose } from '../components/Icons';

function Login({ setIsAuthenticated }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!user.trim() || !password.trim()) {
            showMessage({
                title: 'Error',
                text: 'Por favor ingrese sus credenciales',
                icon: 'error'
            });
            return;
        }

        if (user === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            navigate('/Dashboard');
        } else {
            showMessage({
                title: 'Error',
                text: 'Credenciales incorrectas. Inténtalo de nuevo.',
                icon: 'error'
            });
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Ingrese sus Datos de Acceso</h1>

                <form onSubmit={handleLogin} className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value.toLocaleLowerCase())}
                    />

                    <div>
                        <input
                            className={styles.input}
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.toLocaleLowerCase())}
                        />
                        <button
                            type="button"
                            className={styles.eyeButton}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <ImgEyeOpen /> : <ImgEyeClose />}
                        </button>
                    </div>

                    <button type="submit" className={styles.button}>Iniciar Sesión</button>
                </form>
            </div>
        </>
    )
}

export default Login