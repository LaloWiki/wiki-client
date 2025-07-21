import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        email: correo,
        password: contrasena,
      });

      const { token } = res.data;
      localStorage.setItem('token', token); // Guarda token
      navigate('/'); // Redirige al Home
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error al iniciar sesión.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
