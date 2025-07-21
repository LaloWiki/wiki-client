import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCategoryPage() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Debes iniciar sesión para crear categorías');
        return;
      }

      await axios.post('http://localhost:3003/categories', 
        { nombre },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOk('Categoría creada con éxito');
      setNombre('');
      setTimeout(() => navigate('/'), 1500); // Redirige al home 

    } catch (err) {
      console.error(err);
      setError('Error al crear categoría');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Categoría</h2>

      {error && <p className="text-red-600">{error}</p>}
      {ok && <p className="text-green-600">{ok}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Nombre de la categoría</label>
          <input 
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Categoría
        </button>
      </form>
    </div>
  );
}

export default CreateCategoryPage;
