import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  // URL base del servicio de categorías desde variable de entorno
  const CATEGORIES_API = process.env.REACT_APP_CATEGORIES_URL;

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await axios.get(`${CATEGORIES_API}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al cargar categorías', error);
      setError('No se pudieron cargar las categorías.');
    }
  };

  const crearCategoria = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!nuevoNombre.trim()) {
      setError('El nombre no puede estar vacío');
      return;
    }

    try {
      await axios.post(
        `${CATEGORIES_API}/categories`,
        { nombre: nuevoNombre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje('Categoría creada correctamente');
      setNuevoNombre('');
      cargarCategorias();
    } catch (err) {
      console.error('Error al crear categoría', err);
      setError('Error al crear la categoría');
    }
  };

  const eliminarCategoria = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return;

    try {
      await axios.delete(`${CATEGORIES_API}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensaje('Categoría eliminada');
      cargarCategorias();
    } catch (err) {
      console.error('Error al eliminar categoría', err);
      setError('No se pudo eliminar la categoría');
    }
  };

  const iniciarEdicion = (id, nombre) => {
    setEditandoId(id);
    setNombreEditado(nombre);
    setError('');
    setMensaje('');
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado('');
    setError('');
    setMensaje('');
  };

  const guardarEdicion = async (id) => {
    if (!nombreEditado.trim()) {
      setError('El nombre no puede estar vacío');
      return;
    }

    try {
      await axios.put(
        `${CATEGORIES_API}/categories/${id}`,
        { nombre: nombreEditado },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensaje('Categoría actualizada correctamente');
      setEditandoId(null);
      setNombreEditado('');
      cargarCategorias();
    } catch (err) {
      console.error('Error al actualizar categoría', err);
      setError('No se pudo actualizar la categoría');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Categorías</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}

      <form onSubmit={crearCategoria} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nuevo nombre de categoría"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="flex-grow border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear
        </button>
      </form>

      <ul>
        {categorias.map((cat) => (
          <li key={cat._id} className="flex justify-between items-center border-b py-2">
            {editandoId === cat._id ? (
              <>
                <input
                  type="text"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                  className="border px-2 py-1 rounded flex-grow mr-2"
                />
                <button
                  onClick={() => guardarEdicion(cat._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Guardar
                </button>
                <button
                  onClick={cancelarEdicion}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-grow">{cat.nombre}</span>
                <button
                  onClick={() => iniciarEdicion(cat._id, cat.nombre)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarCategoria(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriasPage;


