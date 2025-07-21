import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  // Variables de entorno para las URLs
  const CATEGORIES_API = process.env.REACT_APP_CATEGORIES_URL;
  const ARTICLES_API = process.env.REACT_APP_ARTICLES_URL;

  useEffect(() => {
    axios.get(`${CATEGORIES_API}/categories`)
      .then(res => setCategorias(res.data))
      .catch(() => setError('Error cargando categorías'));
  }, [CATEGORIES_API]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Debes iniciar sesión para crear un artículo');
        return;
      }

      await axios.post(`${ARTICLES_API}/articles`, 
        { titulo, contenido, categoria },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/'); // Volver a la lista de artículos
    } catch (err) {
      setError('Error al crear el artículo');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Crear Artículo</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold mb-1">Título</label>
          <input 
            type="text" 
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Contenido</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            rows={5}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Categoría</label>
          <select 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map(cat => (
              <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreatePage;
