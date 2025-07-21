import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articlesApi } from '../api/axiosConfig'; // importa la instancia axios configurada

function HomePage() {
  const [articulos, setArticulos] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    articlesApi
      .get('/articles', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setArticulos(res.data))
      .catch((err) => {
        console.error('Error cargando artículos', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const eliminarArticulo = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este artículo?')) return;

    try {
      await articlesApi.delete(`/articles/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setArticulos(articulos.filter((art) => art._id !== id));
    } catch (error) {
      console.error('Error al eliminar artículo', error);
      alert('No se pudo eliminar el artículo');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">WikiGestor</h1>
        <nav className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/crear')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Crear Artículo
          </button>
          <button
            onClick={() => navigate('/categorias')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Categorías
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Artículos</h2>
        {articulos.length === 0 ? (
          <p>No hay artículos disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {articulos.map((art) => (
              <li
                key={art._id}
                className="p-4 border rounded shadow bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{art.titulo}</h3>
                  <p className="text-gray-700">{art.contenido}</p>
                  <span className="text-sm text-blue-600 block mt-1">
                    Categoría: {art.categoria}
                  </span>
                </div>
                <div className="mt-3 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => navigate(`/editar/${art._id}`)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarArticulo(art._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default HomePage;

