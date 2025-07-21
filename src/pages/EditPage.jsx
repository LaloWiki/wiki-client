import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Importamos las instancias ya configuradas
import { articlesApi, categoriesApi } from '../api/axiosConfig';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Obtener datos del artículo
    articlesApi
      .get(`/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTitulo(res.data.titulo);
        setContenido(res.data.contenido);
        setCategoria(res.data.categoria);
      })
      .catch((err) => {
        console.error('Error al cargar artículo', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });

    // Obtener categorías para el select
    categoriesApi
      .get('/categories', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar categorías', err);
      });
  }, [id, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!categoria) {
      setError('Debes seleccionar una categoría');
      return;
    }

    try {
      await articlesApi.put(
        `/articles/${id}`,
        { titulo, contenido, categoria },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate('/');
    } catch (err) {
      console.error('Error al actualizar artículo', err);
      setError('Error al actualizar el artículo');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar artículo</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Contenido</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows="5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((cat) => (
              <option key={cat._id} value={cat.nombre}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}

export default EditArticle;

