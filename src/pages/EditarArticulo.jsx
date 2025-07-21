import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  useEffect(() => {
    // Cargar los datos del artículo
    axios.get(`http://localhost:3002/articulos/${id}`)
      .then(res => {
        setTitulo(res.data.titulo);
        setContenido(res.data.contenido);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3002/articulos/${id}`, { titulo, contenido })
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
        />
        <textarea
          className="w-full p-2 border rounded"
          value={contenido}
          onChange={e => setContenido(e.target.value)}
          placeholder="Contenido"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarArticulo;
