const API_BASE_URL = "http://10.0.2.2:5263/api";
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

export const searchBooks = async (query, languages = null) => {
  try {
    let url = `${API_BASE_URL}/books?query=${encodeURIComponent(query)}`;
    if (languages) {
      url += `&languages=${encodeURIComponent(languages)}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al buscar libros");
    const data = await response.json();
    return data.books;
  } catch (error) {
    throw error;
  }
};

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
    throw error;
  }
};

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
    throw error;
  }
};

export const getBookRatings = async (bookId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings/${bookId}`);
    if (!response.ok) throw new Error("Error al obtener valoraciones");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

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
    throw error;
  }
};

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
    throw error;
  }
};

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
    throw error;
  }
};

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
    throw error;
  }
};

export const getLanguagePreferences = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/languages`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    });
    if (!response.ok) throw new Error("Error al obtener preferencias");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateLanguagePreferences = async (userId, languages) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/languages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ preferredLanguages: languages })
    });
    if (!response.ok) throw new Error("Error al actualizar preferencias");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`);
    if (!response.ok) throw new Error("Error al obtener perfil");
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, profilePicture, bio) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ profilePicture, bio })
    });
    if (!response.ok) throw new Error("Error al actualizar perfil");
    return await response.json();
  } catch (error) {
    throw error;
  }
};
