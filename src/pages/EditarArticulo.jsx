import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articlesApi } from '../api/axiosConfig'; // Importa la instancia axios configurada

function EditarArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    articlesApi
      .get(`/articles/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setTitulo(res.data.titulo);
        setContenido(res.data.contenido);
      })
      .catch(err => console.error(err));
  }, [id, token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    articlesApi
      .put(`/articles/${id}`, { titulo, contenido }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert('Artículo actualizado');
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Artículo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          placeholder="Contenido"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarArticulo;

