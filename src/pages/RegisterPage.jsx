import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      const res = await axios.post('http://localhost:3001/auth/register', {
        email: correo,
        password: contrasena,
      });

      setMensaje(res.data.message || 'Cuenta creada con éxito.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error al crear la cuenta.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear cuenta
        </button>
      </form>

      <p className="mt-4 text-sm">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
