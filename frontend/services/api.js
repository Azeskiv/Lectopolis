// Configuración de la API
// Para emulador Android usa 10.0.2.2 (apunta al localhost del PC host)
// Para iPhone/dispositivo real usa la IP de tu PC: 192.168.0.23
const API_BASE_URL = "http://10.0.2.2:5263/api";

// Token JWT para autenticación
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

// Búsqueda de libros
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Error al buscar libros");
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Error en searchBooks:", error);
    throw error;
  }
};

// Registro de usuario
export const register = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al registrarse");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en register:", error);
    throw error;
  }
};

// Login de usuario
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Usuario o contraseña incorrectos");
    return await response.json();
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Obtener valoraciones de un libro
export const getBookRatings = async (bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${bookId}`);
    if (!response.ok) throw new Error("Error al obtener valoraciones");
    return await response.json();
  } catch (error) {
    console.error("Error en getBookRatings:", error);
    throw error;
  }
};

// Crear valoración
export const createRating = async (bookId, userId, score, comment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ bookId, userId, score, comment }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Error al crear valoración");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createRating:", error);
    throw error;
  }
};

// Actualizar valoración
export const updateRating = async (ratingId, score, comment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ score, comment }),
    });
    if (!response.ok) throw new Error("Error al actualizar valoración");
    return await response.json();
  } catch (error) {
    console.error("Error en updateRating:", error);
    throw error;
  }
};

// Eliminar valoración
export const deleteRating = async (ratingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${ratingId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });
    if (!response.ok) throw new Error("Error al eliminar valoración");
    return await response.json();
  } catch (error) {
    console.error("Error en deleteRating:", error);
    throw error;
  }
};

// Obtener recomendaciones personalizadas
export const getRecommendations = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/${userId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });
    if (!response.ok) throw new Error("Error al obtener recomendaciones");
    return await response.json();
  } catch (error) {
    console.error("Error en getRecommendations:", error);
    throw error;
  }
};
