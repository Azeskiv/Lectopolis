# 📚 MANUAL TÉCNICO - LECTOPOLIS

## 📋 Índice
1. [Arquitectura General](#arquitectura-general)
2. [Backend (ASP.NET Core)](#backend-aspnet-core)
3. [Frontend (React Native)](#frontend-react-native)
4. [Flujos de Comunicación](#flujos-de-comunicación)
5. [Guía de Edición Rápida](#guía-de-edición-rápida)

---

## 🏗️ ARQUITECTURA GENERAL

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│              React Native + Expo                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐     │
│  │ Screens  │→ │Components│→ │  Services    │     │
│  │ (UI)     │  │(Reusar)  │  │  (API calls) │     │
│  └──────────┘  └──────────┘  └──────────────┘     │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP REST API
                      ↓
┌─────────────────────────────────────────────────────┐
│                    BACKEND                          │
│              ASP.NET Core 8.0                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐     │
│  │Controller│→ │ Services │→ │     Data     │     │
│  │ (Rutas)  │  │ (Lógica) │  │  (DbContext) │     │
│  └──────────┘  └──────────┘  └──────────────┘     │
└─────────────────────┬───────────────────────────────┘
                      │ Entity Framework
                      ↓
┌─────────────────────────────────────────────────────┐
│              POSTGRESQL (Docker)                    │
│  Tablas: Users, Ratings                             │
└─────────────────────────────────────────────────────┘
```

---

## 🔧 BACKEND (ASP.NET Core)

### 📁 **Controllers/** - Puntos de entrada HTTP

Reciben peticiones HTTP y devuelven respuestas JSON.

#### **BooksController.cs**
**¿Qué hace?** Búsqueda de libros en Google Books API con filtrado por idiomas.

**Endpoints:**
- `GET /api/books?query=título&languages=es,en`

**Cuándo editar:**
- Cambiar lógica de búsqueda
- Modificar filtros de idioma
- Ajustar duplicados
- Cambiar cantidad de resultados (maxResults)

**Ejemplo de edición:**
```csharp
// Línea ~40: Cambiar número de resultados
var url = $"{GOOGLE_BOOKS_API}?q={query}&maxResults=40&langRestrict={languages}";
// Cambiar 40 por otro número
```

---

#### **RatingsController.cs**
**¿Qué hace?** CRUD completo de valoraciones de libros.

**Endpoints:**
- `GET /api/ratings/{bookId}` - Obtener valoraciones de un libro
- `POST /api/ratings` - Crear valoración (requiere JWT)
- `PUT /api/ratings/{id}` - Actualizar valoración (requiere JWT)
- `DELETE /api/ratings/{id}` - Eliminar valoración (requiere JWT)

**Cuándo editar:**
- Cambiar cálculo de promedio
- Modificar permisos de edición
- Agregar validaciones
- Cambiar estructura de respuesta

**Ejemplo de edición:**
```csharp
// Línea ~68: Cambiar cálculo de promedio
var average = ratings.Any() 
    ? Math.Round(ratings.Average(r => r.Score), 2) // Cambiar decimales
    : 0.0;
```

---

#### **RecommendationsController.cs**
**¿Qué hace?** Llama al servicio de recomendaciones IA.

**Endpoints:**
- `GET /api/recommendations/{userId}` (requiere JWT)

**Cuándo editar:**
- Cambiar manejo de errores
- Agregar caché de recomendaciones
- Modificar autorización

**Nota:** La lógica real está en `RecommendationService.cs`

---

#### **UserController.cs**
**¿Qué hace?** Autenticación, perfiles y preferencias.

**Endpoints:**
- `POST /api/users/register` - Registro
- `POST /api/users/login` - Login (devuelve JWT)
- `GET /api/users/{userId}/profile` - Ver perfil público
- `PUT /api/users/{userId}/profile` - Editar perfil (requiere JWT)
- `GET /api/users/{userId}/languages` - Obtener idiomas (requiere JWT)
- `PUT /api/users/{userId}/languages` - Actualizar idiomas (requiere JWT)

**Cuándo editar:**
- Cambiar duración del token JWT
- Modificar validación de contraseñas
- Agregar campos al perfil
- Cambiar reglas de privacidad

**Ejemplo de edición:**
```csharp
// Línea ~55: Cambiar expiración del token
var tokenDescriptor = new SecurityTokenDescriptor
{
    Expires = DateTime.UtcNow.AddMinutes(1440), // Cambiar minutos
    // ...
};
```

---

### 📁 **Services/** - Lógica de negocio compleja

#### **RecommendationService.cs** ⭐ (CRÍTICO)
**¿Qué hace?** 
1. Filtra valoraciones positivas (3+ estrellas)
2. Obtiene géneros de libros de Google Books
3. Construye análisis detallado
4. Llama a Groq API (IA) con prompt personalizado
5. Busca portadas en Google Books
6. Devuelve lista de recomendaciones

**Cuándo editar:**
- **Cambiar filtro de estrellas:**
  ```csharp
  // Línea ~38
  var positiveRatings = allRatings
      .Where(r => r.Score >= 3) // Cambiar 3 por otro número
  ```

- **Modificar cantidad de recomendaciones:**
  ```csharp
  // Línea ~169
  // En systemPrompt cambiar "5 libros" por otro número
  ```

- **Ajustar temperatura de IA (creatividad):**
  ```csharp
  // Línea ~196
  temperature = 0.9, // 0.0 = conservador, 1.0 = creativo
  top_p = 0.95,      // Diversidad de respuestas
  ```

- **Cambiar el prompt de la IA:**
  ```csharp
  // Líneas ~169-191: systemPrompt y userPrompt
  // Modificar instrucciones para cambiar comportamiento
  ```

---

### 📁 **Models/** - Estructura de datos (Tablas BD)

#### **User.cs**
**Campos:**
- `Id`: Identificador único
- `Username`: Nombre de usuario (único)
- `Password`: Contraseña hasheada (BCrypt)
- `PreferredLanguages`: Idiomas preferidos (ej: "es,en,fr")
- `ProfilePicture`: Emoji del avatar (nullable)
- `Bio`: Biografía (máx 200 chars, nullable)

**Cuándo editar:**
- Agregar nuevos campos al perfil
- Cambiar validaciones
- Modificar relaciones

**Ejemplo de edición:**
```csharp
// Agregar nuevo campo
public string? FavoriteGenre { get; set; }
// Luego crear migración: dotnet ef migrations add AddFavoriteGenre
```

---

#### **Ratings.cs** (Clase: `Rating`)
**Campos:**
- `Id`: Identificador único
- `BookId`: ID del libro en Google Books
- `UserId`: ID del usuario (FK)
- `Score`: Puntuación 1-5
- `Comment`: Comentario (nullable)
- `CreatedAt`: Fecha de creación
- `User`: Relación con User

**Cuándo editar:**
- Agregar campos (ej: spoiler alert, likes)
- Cambiar rango de puntuación
- Modificar validaciones

---

### 📁 **Data/** - Conexión con Base de Datos

#### **AppDbContext.cs**
**¿Qué hace?** Puente entre C# y PostgreSQL. Define qué modelos son tablas.

**Contenido:**
```csharp
public DbSet<User> Users { get; set; }
public DbSet<Rating> Ratings { get; set; }
```

**Cuándo editar:**
- Agregar nuevas tablas (DbSet)
- Configurar relaciones complejas
- Definir índices

**Ejemplo de uso:**
```csharp
// En controller:
var user = await _context.Users.FindAsync(userId);
_context.Ratings.Add(newRating);
await _context.SaveChangesAsync(); // Guarda en PostgreSQL
```

---

### 📁 **Migrations/** - Cambios en estructura BD

**¿Qué son?** Archivos que modifican la base de datos.

**Comandos:**
```bash
# Crear migración
dotnet ef migrations add NombreMigracion

# Aplicar a BD
dotnet ef database update

# Revertir última migración
dotnet ef database update MigracionAnterior
```

**Cuándo crear:**
- Después de modificar Models/
- Al agregar/eliminar campos
- Al crear nuevas tablas

---

### 📁 **Program.cs** - Configuración global

**¿Qué configura?**
- DbContext (conexión PostgreSQL)
- JWT (autenticación)
- CORS (permisos frontend)
- Servicios (DI - Dependency Injection)
- HttpClient

**Cuándo editar:**
```csharp
// Línea ~15: Registrar nuevo servicio
builder.Services.AddScoped<INuevoServicio, NuevoServicio>();

// Línea ~30: Cambiar CORS
options.AddPolicy("AllowAll", policy =>
    policy.WithOrigins("http://localhost:3000") // Cambiar origen
);
```

---

### 📁 **appsettings.json** - Configuración secreta

**Contenido:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;..."
  },
  "Jwt": {
    "SecretKey": "...",
    "ExpirationMinutes": 1440
  },
  "Groq": {
    "ApiKey": "..."
  }
}
```

**Cuándo editar:**
- Cambiar contraseña BD
- Actualizar API keys
- Modificar configuración JWT

**⚠️ IMPORTANTE:** Este archivo NO se sube a GitHub (está en .gitignore)

---

## 📱 FRONTEND (React Native)

### 📁 **screens/** - Pantallas completas

#### **LoginScreen.js**
**¿Qué hace?** Registro e inicio de sesión.

**Cuándo editar:**
- Cambiar validaciones (contraseña mínima, etc)
- Modificar diseño del formulario
- Agregar campos extra (email, etc)

**Comunicación:**
```javascript
// Llama a api.js
const response = await login(username, password);
setAuthToken(response.token); // Guarda JWT
onLogin({ id, username, ... }); // Pasa datos a App.js
```

---

#### **HomeScreen.js**
**¿Qué hace?** Búsqueda de libros con filtro de idiomas.

**Cuándo editar:**
- Cambiar diseño de búsqueda
- Modificar cantidad de resultados
- Agregar filtros adicionales (año, precio, etc)

**Ejemplo de edición:**
```javascript
// Línea ~48: Agregar filtro de año
const handleSearch = async () => {
  const books = await searchBooks(searchQuery, userLanguages, yearFilter);
  // ...
};
```

---

#### **BookDetailScreen.js**
**¿Qué hace?** Detalles del libro + CRUD de valoraciones.

**Cuándo editar:**
- Modificar formulario de valoración
- Cambiar diseño de tarjetas
- Agregar funcionalidades (compartir, favoritos, etc)

---

#### **RecommendationsScreen.js**
**¿Qué hace?** Muestra recomendaciones IA y permite regenerar.

**Cuándo editar:**
- Cambiar cantidad de recomendaciones mostradas
- Modificar botón de regenerar
- Agregar filtros (por género, etc)

---

#### **ProfileScreen.js**
**¿Qué hace?** Muestra perfil público (avatar, bio, valoraciones).

**Cuándo editar:**
- Agregar estadísticas (libros favoritos, promedio, etc)
- Modificar diseño del avatar
- Mostrar más información del usuario

---

#### **EditProfileScreen.js**
**¿Qué hace?** Editar avatar y biografía.

**Cuándo editar:**
- Cambiar emojis disponibles (línea ~12)
- Modificar límite de caracteres bio
- Agregar campos extra

**Ejemplo de edición:**
```javascript
// Línea ~12: Agregar más emojis
const AVATAR_EMOJIS = ['👤', '😊', '🤓', '🦄', '🐉'];
```

---

#### **SettingsScreen.js**
**¿Qué hace?** Configurar idiomas preferidos.

**Cuándo editar:**
- Agregar/quitar idiomas (línea ~20)
- Cambiar lógica de mínimo 1 idioma
- Agregar otros ajustes (tema oscuro, etc)

---

### 📁 **components/** - Bloques reutilizables

#### **BookCard.js**
**¿Qué hace?** Tarjeta de libro (portada, título, autor).

**Usado en:** HomeScreen, RecommendationsScreen

**Cuándo editar:**
- Cambiar diseño de la tarjeta
- Agregar información extra (rating, precio)
- Modificar tamaño de portada

---

#### **RatingCard.js**
**¿Qué hace?** Tarjeta de valoración (usuario, estrellas, comentario).

**Usado en:** BookDetailScreen, ProfileScreen

**Cuándo editar:**
- Cambiar diseño de estrellas
- Agregar botón de like
- Modificar visualización de fecha

---

#### **HeaderBar.js**
**¿Qué hace?** Barra superior con título y botón volver.

**Usado en:** Todas las pantallas excepto Home

**Cuándo editar:**
- Cambiar colores
- Agregar botones extra
- Modificar altura

---

#### **UserAvatar.js**
**¿Qué hace?** Avatar circular con emoji.

**Usado en:** HomeScreen (header), ProfileScreen

**Cuándo editar:**
- Cambiar tamaño
- Agregar borde/sombra
- Modificar emoji por defecto

---

### 📁 **services/** - Comunicación con backend

#### **api.js** ⭐ (CRÍTICO)
**¿Qué hace?** Todas las llamadas HTTP al backend.

**Funciones principales:**
- `login()`, `register()`
- `searchBooks()`
- `getBookRatings()`, `createRating()`, `updateRating()`, `deleteRating()`
- `getRecommendations()`
- `getUserProfile()`, `updateUserProfile()`
- `getLanguagePreferences()`, `updateLanguagePreferences()`

**Cuándo editar:**
```javascript
// Línea ~4: Cambiar URL del backend
const API_BASE_URL = "http://10.0.2.2:5263/api";
// Para dispositivo real: "http://TU_IP:5263/api"

// Agregar nueva función:
export const getNuevaFuncion = async (parametro) => {
  const response = await fetch(`${API_BASE_URL}/nueva-ruta`, {
    headers: { "Authorization": `Bearer ${authToken}` }
  });
  return await response.json();
};
```

---

### 📁 **styles/** - Estilos centralizados

#### **commonStyles.js**
**¿Qué hace?** Colores globales, botones, inputs.

**Cuándo editar:**
- Cambiar paleta de colores
- Modificar estilos de botones
- Agregar nuevos estilos comunes

**Ejemplo de edición:**
```javascript
// Línea ~5: Cambiar colores
export const colors = {
  primary: '#8B4513',   // Cambiar color principal
  secondary: '#D4AF37',
  background: '#F8F4E8',
};
```

---

#### **bookCardStyles.js**, **ratingCardStyles.js**, **headerStyles.js**
**¿Qué hacen?** Estilos específicos de cada componente.

**Cuándo editar:**
- Modificar apariencia del componente específico
- Cambiar márgenes, padding, tamaños

---

### 📁 **App.js** - Navegación principal

**¿Qué hace?** 
- Maneja estado global (usuario logueado)
- Decide qué pantalla mostrar
- Gestiona navegación entre pantallas

**Cuándo editar:**
- Agregar nueva pantalla
- Modificar lógica de navegación
- Cambiar flujo de la app

**Ejemplo de edición:**
```javascript
// Agregar nueva pantalla
const [showNewScreen, setShowNewScreen] = useState(false);

// En el render:
if (showNewScreen) {
  return <NewScreen onBack={() => setShowNewScreen(false)} />;
}
```

---

## 🔄 FLUJOS DE COMUNICACIÓN

### 🔐 **Flujo de Login**
```
LoginScreen.js
    ↓ login(username, password)
services/api.js
    ↓ POST /api/users/login
UserController.cs (backend)
    ↓ Busca usuario en BD
AppDbContext.cs
    ↓ SELECT * FROM Users WHERE Username=...
PostgreSQL
    ↓ Devuelve usuario
UserController.cs
    ↓ Valida contraseña (BCrypt)
    ↓ Genera JWT token
    ↓ Devuelve { token, userId, username, ... }
LoginScreen.js
    ↓ setAuthToken(token)
    ↓ onLogin(userData)
App.js
    ↓ setUser(userData)
    ↓ Muestra HomeScreen
```

---

### 📚 **Flujo de Búsqueda de Libros**
```
HomeScreen.js
    ↓ searchBooks(query, languages)
services/api.js
    ↓ GET /api/books?query=...&languages=...
BooksController.cs
    ↓ Llama a Google Books API
    ↓ Filtra por idiomas
    ↓ Elimina duplicados
    ↓ Devuelve lista de libros
HomeScreen.js
    ↓ Renderiza BookCard para cada libro
```

---

### ⭐ **Flujo de Crear Valoración**
```
BookDetailScreen.js
    ↓ createRating(bookId, userId, score, comment)
services/api.js
    ↓ POST /api/ratings
    ↓ Header: Authorization: Bearer {JWT}
RatingsController.cs
    ↓ Valida JWT (middleware)
    ↓ Crea nuevo Rating
    ↓ _context.Ratings.Add(rating)
    ↓ _context.SaveChangesAsync()
AppDbContext.cs
    ↓ INSERT INTO Ratings ...
PostgreSQL
    ↓ Guarda registro
RatingsController.cs
    ↓ Devuelve rating creado
BookDetailScreen.js
    ↓ loadRatings() - Recarga lista
```

---

### 🤖 **Flujo de Recomendaciones IA**
```
RecommendationsScreen.js
    ↓ getRecommendations(userId)
services/api.js
    ↓ GET /api/recommendations/{userId}
    ↓ Header: Authorization: Bearer {JWT}
RecommendationsController.cs
    ↓ Llama a RecommendationService
RecommendationService.cs
    ↓ 1. Busca valoraciones del usuario en BD
    ↓ 2. Filtra solo 3+ estrellas
    ↓ 3. Obtiene géneros de Google Books
    ↓ 4. Construye análisis detallado
    ↓ 5. Llama a Groq API con prompt
Groq API (IA)
    ↓ Analiza géneros favoritos
    ↓ Genera 5 recomendaciones JSON
RecommendationService.cs
    ↓ Parsea JSON de la IA
    ↓ Busca cada libro en Google Books
    ↓ Obtiene portadas
    ↓ Devuelve lista completa
RecommendationsScreen.js
    ↓ Renderiza BookCard para cada recomendación
```

---

## 🛠️ GUÍA DE EDICIÓN RÁPIDA

### **Quiero cambiar...**

#### ✏️ **Los colores de la app**
📂 `frontend/styles/commonStyles.js` línea ~5
```javascript
export const colors = {
  primary: '#8B4513',   // ← Cambiar aquí
  secondary: '#D4AF37',
  background: '#F8F4E8',
};
```

---

#### ✏️ **El filtro de valoraciones positivas (actualmente 3+ estrellas)**
📂 `backend/Services/RecommendationService.cs` línea ~38
```csharp
var positiveRatings = allRatings
    .Where(r => r.Score >= 3) // ← Cambiar 3 por otro número
```

---

#### ✏️ **La cantidad de recomendaciones (actualmente 5)**
📂 `backend/Services/RecommendationService.cs` líneas ~169 y ~191
```csharp
// En systemPrompt:
"Exactamente 5 libros DIFERENTES cada vez" // ← Cambiar 5

// En userPrompt:
"Recomienda 5 libros TOTALMENTE DIFERENTES" // ← Cambiar 5
```

---

#### ✏️ **La creatividad de la IA (más conservador o más creativo)**
📂 `backend/Services/RecommendationService.cs` línea ~196
```csharp
temperature = 0.9, // ← 0.0-1.0 (0=conservador, 1=muy creativo)
top_p = 0.95,      // ← 0.0-1.0 (diversidad)
```

---

#### ✏️ **Los emojis disponibles para avatar**
📂 `frontend/screens/EditProfileScreen.js` línea ~12
```javascript
const AVATAR_EMOJIS = [
  '👤', '😊', '🤓', // ← Agregar/quitar emojis aquí
];
```

---

#### ✏️ **El límite de caracteres de la biografía**
📂 `frontend/screens/EditProfileScreen.js` línea ~100
```javascript
<TextInput
  maxLength={200} // ← Cambiar límite
/>
```

---

#### ✏️ **Los idiomas disponibles**
📂 `frontend/screens/SettingsScreen.js` línea ~20
```javascript
const EUROPEAN_LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  // ← Agregar más aquí
];
```

---

#### ✏️ **La duración del token JWT (actualmente 24 horas)**
📂 `backend/appsettings.json` línea ~8
```json
"ExpirationMinutes": 1440  // ← 1440 = 24 horas
```

---

#### ✏️ **La URL del backend (para dispositivo real)**
📂 `frontend/services/api.js` línea ~4
```javascript
const API_BASE_URL = "http://10.0.2.2:5263/api"; // Emulador
// const API_BASE_URL = "http://192.168.0.23:5263/api"; // ← Dispositivo real
```

---

#### ✏️ **Agregar un nuevo campo al perfil de usuario**
1. 📂 `backend/Models/User.cs` - Agregar propiedad
2. `dotnet ef migrations add NuevoCampo` - Crear migración
3. `dotnet ef database update` - Aplicar a BD
4. 📂 `backend/Controllers/UserController.cs` - Actualizar endpoints
5. 📂 `frontend/screens/EditProfileScreen.js` - Agregar input
6. 📂 `frontend/services/api.js` - Actualizar llamadas API

---

## 📊 COMANDOS ÚTILES

### Backend
```bash
cd K:\Lectopolis\backend

# Compilar
dotnet build

# Ejecutar
dotnet run

# Crear migración
dotnet ef migrations add NombreMigracion

# Aplicar migraciones
dotnet ef database update

# Revertir migración
dotnet ef database update MigracionAnterior
```

### Frontend
```bash
cd K:\Lectopolis\frontend

# Instalar dependencias
npm install

# Iniciar Expo
npx expo start

# Iniciar con caché limpio
npx expo start -c

# Abrir en Android
# Presiona 'a' cuando Expo esté corriendo
```

### Docker
```bash
cd K:\Lectopolis

# Iniciar PostgreSQL
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## 🔍 DEBUGGING COMÚN

### ❌ "No se pudieron cargar las valoraciones"
**Causa:** Backend no está corriendo o PostgreSQL está apagado  
**Solución:** Arrancar Docker → Backend → Frontend (en ese orden)

### ❌ "Network request failed"
**Causa:** URL incorrecta o backend no accesible  
**Archivo:** `frontend/services/api.js` línea 4  
**Solución:** Verificar que API_BASE_URL sea correcta

### ❌ "Failed to connect to 127.0.0.1:5432"
**Causa:** PostgreSQL no está corriendo  
**Solución:** `docker-compose up -d`

### ❌ "Invalid token" / "Unauthorized"
**Causa:** JWT expirado o no válido  
**Solución:** Volver a hacer login

### ❌ Recomendaciones siempre iguales
**Causa:** Prompt de IA demasiado específico o seed poco variable  
**Archivo:** `backend/Services/RecommendationService.cs` líneas 156-191  
**Solución:** Aumentar temperature o modificar prompt

---

## 📝 NOTAS IMPORTANTES

1. **Orden de inicio:** Docker → Backend → Frontend
2. **Archivos NO subir a GitHub:** `appsettings.json` (tiene API keys)
3. **Después de cambiar Models:** Crear y aplicar migración
4. **Después de cambiar estilos:** Recargar app (R+R en emulador)
5. **Para producción:** Cambiar `API_BASE_URL` en `api.js`

---

**Última actualización:** Diciembre 2025  
**Versión:** 1.0
