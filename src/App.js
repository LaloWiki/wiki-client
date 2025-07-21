import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditarArticulo from './pages/EditarArticulo';
import CategoriasPage from './pages/CategoriasPage';
import PrivateRoute from './components/PrivateRoute'; // Importa PrivateRoute

function App() {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas con PrivateRoute */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/crear"
            element={
              <PrivateRoute>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <CategoriasPage />
              </PrivateRoute>
            }
          />
          {/* Si tienes EditarArticulo diferente de EditPage, también protégelo */}
          <Route
            path="/editararticulo/:id"
            element={
              <PrivateRoute>
                <EditarArticulo />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
