# PROYECTO DE DESARROLLO DE APLICACIONES MULTIPLATAFORMA

**Título del Proyecto:** Lectopolis - Plataforma Social de Gestión y Valoración de Libros  
**Autor:** Alfonso Casado Jareño  
**Año Académico:** 2025-2026  
**Ciclo Formativo:** Desarrollo de Aplicaciones Multiplataforma  
**Centro:** IES GREGORIO PRIETO

---

## ÍNDICE

1. [Introducción](#1-introducción)
2. [Análisis del Sistema Actual](#2-análisis-del-sistema-actual)
3. [Solución Propuesta](#3-solución-propuesta)
4. [Planificación Temporal](#4-planificación-temporal)
5. [Documentación del Diseño e Implementación](#5-documentación-del-diseño-e-implementación)
6. [Manual de Usuario](#6-manual-de-usuario)
7. [Bibliografía y Fuentes de Información](#7-bibliografía-y-fuentes-de-información)

---

## 1. INTRODUCCIÓN

### 1.1 Descripción del Proyecto

Lectopolis es una aplicación multiplataforma que combina funcionalidades de red social con gestión de biblioteca personal. Permite a los usuarios buscar libros mediante integración con Google Books API, gestionar sus lecturas y compartir valoraciones con otros miembros de la comunidad.

### 1.2 Finalidad y Objetivos

**Objetivo principal:** Crear un ecosistema digital donde los amantes de la lectura puedan descubrir nuevos títulos, mantener un registro organizado de sus lecturas y participar en una comunidad activa mediante valoraciones y comentarios.

**Objetivos específicos:**
- Integrar búsqueda de libros en tiempo real mediante APIs externas
- Implementar sistema robusto de autenticación y autorización con JWT
- Desarrollar interfaz móvil nativa multiplataforma con React Native
- Garantizar persistencia de datos mediante base de datos relacional
- Crear sistema completo CRUD para gestión de valoraciones

### 1.3 Requisitos del Sistema

**Requisitos funcionales:**
- RF1: El sistema debe permitir el registro y autenticación de usuarios
- RF2: Los usuarios autenticados pueden buscar libros por título, autor o palabra clave
- RF3: Los usuarios pueden crear, leer, actualizar y eliminar sus propias valoraciones
- RF4: El sistema calcula automáticamente la valoración media de cada libro
- RF5: Las valoraciones incluyen puntuación (1-5 estrellas) y comentario opcional

**Requisitos no funcionales:**
- RNF1: Interfaz intuitiva siguiendo principios de diseño Material Design
- RNF2: Tiempo de respuesta inferior a 2 segundos en operaciones CRUD
- RNF3: Compatibilidad con Android 5.0+ (API 21+)
- RNF4: Escalabilidad para soportar crecimiento de usuarios
- RNF5: Seguridad mediante tokens JWT con expiración configurable

### 1.4 Restricciones

- Dependencia de conectividad a internet para búsqueda de libros
- Limitaciones de la Google Books API (cuota de peticiones diarias)
- Requisito de emulador Android o dispositivo físico para testing
- Necesidad de servidor backend activo para funcionamiento completo

---

## 2. ANÁLISIS DEL SISTEMA ACTUAL

### 2.1 Aplicaciones Existentes en el Mercado

#### Goodreads
**Características:** Plataforma líder con 90+ millones de usuarios, integración social, recomendaciones personalizadas, retos de lectura.

**Problemas identificados:**
- Interfaz sobrecargada que dificulta navegación
- Excesiva publicidad intrusiva
- Falta de privacidad en datos de lectura
- Búsqueda deficiente con resultados poco relevantes

#### Anobii
**Características:** Red social europea enfocada en comunidades literarias, sistema de recomendaciones.

**Problemas identificados:**
- Aplicación móvil desactualizada con bugs frecuentes
- Base de datos de libros limitada
- Sincronización lenta entre dispositivos
- Funcionalidades básicas bloqueadas tras paywall

#### Literal
**Características:** Aplicación moderna con diseño minimalista, enfoque en privacidad.

**Problemas identificados:**
- Catálogo de libros reducido (principalmente inglés)
- Falta de integración con APIs robustas
- Funcionalidades limitadas en versión gratuita
- Comunidad pequeña con poca interacción

### 2.2 Análisis de Carencias

Las aplicaciones actuales presentan tres problemáticas principales:

1. **Complejidad excesiva:** Interfaces saturadas que priorizan monetización sobre experiencia de usuario
2. **Limitaciones técnicas:** Bases de datos propias que requieren mantenimiento costoso y ofrecen cobertura limitada
3. **Monetización agresiva:** Funcionalidades básicas bloqueadas, afectando la usabilidad

### 2.3 Oportunidad de Mercado

Existe demanda clara de una aplicación que:
- Priorice experiencia de usuario sobre monetización
- Ofrezca búsqueda potente mediante APIs consolidadas (Google Books)
- Mantenga diseño limpio y profesional tipo biblioteca
- Garantice privacidad sin venta de datos personales
- Funcione de forma fluida en dispositivos móviles modernos

---

## 3. SOLUCIÓN PROPUESTA

### 3.1 Propuesta de Valor

Lectopolis resuelve las carencias identificadas mediante:

**Simplicidad:** Tres pantallas principales con navegación intuitiva
**Potencia:** Integración directa con Google Books API (25+ millones de títulos)
**Rendimiento:** Backend optimizado con Entity Framework Core
**Diseño:** Interfaz elegante con paleta de colores biblioteca (tonos cálidos, madera, dorado)
**Gratuidad:** Sin paywalls ni publicidad, código abierto

### 3.2 Tecnologías Evaluadas

#### Backend

| Tecnología | Ventajas | Desventajas | Decisión |
|------------|----------|-------------|----------|
| **ASP.NET Core** | Alto rendimiento, Entity Framework, JWT nativo, escalable | Curva de aprendizaje, ecosistema Microsoft | ✅ **SELECCIONADA** |
| Node.js + Express | Rápido desarrollo, JavaScript full-stack | Menos tipado, ORM menos maduro | ❌ |
| Django (Python) | Admin panel automático, ORM robusto | Menos rendimiento en concurrencia | ❌ |

#### Base de Datos

| Tecnología | Ventajas | Desventajas | Decisión |
|------------|----------|-------------|----------|
| **PostgreSQL** | ACID completo, JSON nativo, escalable, open source | Configuración inicial compleja | ✅ **SELECCIONADA** |
| MySQL | Popular, documentación amplia | Menos funcionalidades avanzadas | ❌ |
| MongoDB | Flexible, esquema dinámico | No relacional, dificulta joins | ❌ |

#### Frontend Móvil

| Tecnología | Ventajas | Desventajas | Decisión |
|------------|----------|-------------|----------|
| **React Native + Expo** | Desarrollo rápido, hot reload, una codebase | Limitaciones en acceso nativo | ✅ **SELECCIONADA** |
| Flutter | Rendimiento nativo, widgets propios | Dart menos conocido, tamaño APK | ❌ |
| Kotlin Nativo | Máximo rendimiento Android | Solo Android, desarrollo más lento | ❌ |

### 3.3 Arquitectura Seleccionada

```
┌─────────────────────────────────────────┐
│         FRONTEND (React Native)         │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │  Login   │  │   Home   │  │ Detail ││
│  │  Screen  │  │  Screen  │  │ Screen ││
│  └──────────┘  └──────────┘  └────────┘│
│         API Service Layer (api.js)      │
└────────────────┬────────────────────────┘
                 │ HTTP/HTTPS + JWT
                 │
┌────────────────▼────────────────────────┐
│      BACKEND (ASP.NET Core 8.0)         │
│  ┌──────────────────────────────────┐   │
│  │     Controllers (REST API)       │   │
│  │  • UserController                │   │
│  │  • BooksController               │   │
│  │  • RatingsController             │   │
│  └──────────┬───────────────────────┘   │
│             │                            │
│  ┌──────────▼───────────────────────┐   │
│  │    AppDbContext (EF Core)        │   │
│  │  • Users DbSet                   │   │
│  │  • Ratings DbSet                 │   │
│  └──────────┬───────────────────────┘   │
└─────────────┼──────────────────────────┘
              │ Npgsql Driver
┌─────────────▼──────────────────────────┐
│      PostgreSQL 18 Database            │
│  • Users Table                         │
│  • Ratings Table                       │
└────────────────────────────────────────┘

EXTERNO:
┌────────────────────────────────────────┐
│      Google Books API                  │
│  (25M+ books database)                 │
└────────────────────────────────────────┘
```

### 3.4 Justificación de Tecnologías

**ASP.NET Core 8.0:**
- Framework moderno con soporte LTS hasta 2026
- Entity Framework Core simplifica operaciones de base de datos
- Middleware nativo para JWT y CORS
- Excelente rendimiento en benchmarks (>7M req/s en TechEmpower)

**PostgreSQL 18:**
- Sistema ACID que garantiza integridad transaccional
- Soporte JSON para futuras expansiones
- Replicación y particionado para escalabilidad
- Licencia PostgreSQL (open source sin restricciones)

**React Native + Expo:**
- Hot reload acelera ciclos de desarrollo
- Componentes nativos optimizados
- Expo Go permite testing inmediato sin compilación
- Comunidad activa con librerías maduras

**JWT (JSON Web Tokens):**
- Stateless, no requiere almacenamiento en servidor
- Payload customizable con claims de usuario
- Estándar RFC 7519 ampliamente soportado
- Perfecto para arquitecturas RESTful

---

## 4. PLANIFICACIÓN TEMPORAL

### 4.1 Fases del Proyecto

El desarrollo se estructuró en 6 fases con metodología ágil (sprints de 1 semana):

#### **FASE 1: Diseño y Planificación (Semana 1)**
**Duración:** 5 días  
**Tareas:**
- Análisis de requisitos y casos de uso
- Diseño de base de datos (modelo ER)
- Wireframes de interfaces móviles
- Configuración de entorno de desarrollo
- Creación de repositorio Git

**Entregables:**
- Diagrama Entidad-Relación
- Mockups Figma/Papel
- Documento de requisitos

#### **FASE 2: Backend - Configuración Base (Semana 2)**
**Duración:** 4 días  
**Tareas:**
- Inicialización proyecto ASP.NET Core
- Configuración PostgreSQL y Entity Framework
- Creación modelos User y Rating
- Configuración JWT y CORS
- Migraciones iniciales

**Entregables:**
- Backend funcional con endpoints básicos
- Base de datos creada con tablas

#### **FASE 3: Backend - Controladores y Lógica (Semana 3)**
**Duración:** 6 días  
**Tareas:**
- UserController (register, login)
- BooksController (integración Google Books API)
- RatingsController (CRUD completo)
- Validaciones y manejo de errores
- Testing con Swagger

**Entregables:**
- API REST completa y documentada
- Postman collection para testing

#### **FASE 4: Frontend - Estructura y Navegación (Semana 4)**
**Duración:** 5 días  
**Tareas:**
- Inicialización proyecto Expo
- Creación componentes LoginScreen, HomeScreen, BookDetailScreen
- Capa de servicio (api.js)
- Gestión de estado con useState
- Navegación entre pantallas

**Entregables:**
- Aplicación móvil funcional con navegación

#### **FASE 5: Integración y Funcionalidades (Semana 5)**
**Duración:** 6 días  
**Tareas:**
- Integración autenticación JWT en frontend
- Implementación búsqueda de libros
- Sistema completo de valoraciones (CRUD)
- Gestión de token en peticiones
- Testing en emulador Android

**Entregables:**
- Aplicación completamente integrada con backend

#### **FASE 6: Diseño UI/UX y Refinamiento (Semana 6)**
**Duración:** 4 días  
**Tareas:**
- Rediseño con tema biblioteca elegante
- Paleta de colores cálidos (marrón, dorado, beige)
- Mejoras de UX (sombras, espaciado, tipografía)
- Corrección de bugs
- Optimización de rendimiento

**Entregables:**
- Aplicación lista para producción

### 4.2 Diagrama de Gantt

```
SEMANA      │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │
────────────┼────┼────┼────┼────┼────┼────┤
Diseño      │████│    │    │    │    │    │
Backend Base│    │████│    │    │    │    │
Backend API │    │    │████│    │    │    │
Frontend    │    │    │    │████│    │    │
Integración │    │    │    │    │████│    │
UI/UX       │    │    │    │    │    │████│
Testing     │    │  ██│  ██│  ██│  ██│  ██│
```

### 4.3 Recursos Necesarios

#### **Recursos Materiales**
- PC/Laptop con mínimo 8GB RAM, procesador i5 o equivalente
- Conexión a internet estable (mínimo 10 Mbps)
- Dispositivo Android físico o emulador (Android Studio)
- Espacio en disco: 5GB para herramientas + 500MB proyecto

#### **Recursos Software**
- Visual Studio Code / JetBrains Rider
- .NET SDK 8.0
- PostgreSQL 18
- Node.js 20 LTS
- Android Studio (para emulador)
- Git + GitHub/GitLab

#### **Recursos Humanos**
- 1 desarrollador full-stack (alumno)
- 1 tutor/supervisor (profesor)
- Tiempo estimado: 150 horas totales

#### **Costes Estimados**
- Software: €0 (todo open source)
- Hardware: €0 (equipo propio)
- Servicios cloud (opcional): €0 (desarrollo local)
- **TOTAL: €0**

### 4.4 Plan de Mantenimiento

**Mantenimiento Correctivo:**
- Revisión mensual de logs de errores
- Corrección de bugs reportados en < 48h
- Actualización de dependencias con vulnerabilidades

**Mantenimiento Evolutivo:**
- Nuevas funcionalidades cada trimestre:
  - Q1: Sistema de listas personalizadas
  - Q2: Recomendaciones basadas en IA
  - Q3: Integración con redes sociales
  - Q4: Modo offline con sincronización

**Mantenimiento Adaptativo:**
- Actualización a nuevas versiones de Android
- Migración a React Native/Expo cuando sean necesarias
- Adaptación a cambios en Google Books API

### 4.5 Modificaciones Futuras Planificadas

1. **Sistema de Listas Personalizadas** (Prioridad: Alta)
   - "Quiero leer", "Leyendo", "Leídos"
   - Listas custom del usuario

2. **Sistema de Seguimiento Social** (Prioridad: Media)
   - Seguir a otros usuarios
   - Feed de actividad de seguidos
   - Notificaciones de nuevas valoraciones

3. **Estadísticas de Lectura** (Prioridad: Media)
   - Gráficos de libros leídos por mes
   - Géneros más leídos
   - Reto anual de lectura

4. **Modo Offline** (Prioridad: Baja)
   - Cache local de búsquedas
   - Sincronización diferida de valoraciones
   - Almacenamiento local con SQLite

5. **Recomendaciones con IA** (Prioridad: Baja)
   - Análisis de preferencias de usuario
   - Sugerencias personalizadas
   - Integración con OpenAI API

---

## 5. DOCUMENTACIÓN DEL DISEÑO E IMPLEMENTACIÓN

### 5.1 Diseño de Interfaces (Prototipo)

#### **Pantalla de Login/Registro**

**Elementos visuales:**
- Fondo beige cálido (#F8F4E8) simulando papel antiguo
- Título "📚 Lectopolis" centrado en marrón (#8B4513)
- Tabs para alternar Login/Registro con animación
- Inputs con bordes dorados (#D4AF37)
- Botón principal marrón con sombra elegante
- Validaciones en tiempo real

**Flujo de interacción:**
```
Usuario abre app → Pantalla Login
├─ Si tiene cuenta: Ingresa usuario/contraseña → Login → Home
└─ Si no tiene cuenta: Tab Registro → Completa formulario → Registro exitoso → Cambia a tab Login
```

#### **Pantalla Home (Búsqueda y Listado)**

**Elementos visuales:**
- Header marrón con título, nombre de usuario y botón logout
- Barra de búsqueda con borde dorado
- Tarjetas de libro con:
  - Imagen de portada (sombra 3D)
  - Título en negrita (color #4A3728)
  - Autor en cursiva (#8B6F47)
  - Valoración media con estrellas doradas
  - Borde izquierdo dorado decorativo
- Estado vacío con emoji 📚 y texto motivacional

**Flujo de interacción:**
```
Usuario en Home
├─ Escribe búsqueda → Presiona "Buscar" → API Google Books → Muestra resultados
├─ Toca tarjeta libro → Navega a BookDetail
└─ Presiona "Cerrar sesión" → Vuelve a Login
```

#### **Pantalla BookDetail (Detalles y Valoraciones)**

**Elementos visuales:**
- Header con botón "← Volver"
- Card superior con:
  - Imagen libro (130x195px con sombra)
  - Título, autor
  - Valoración media destacada
- Sección sinopsis con texto justificado
- Formulario de valoración:
  - 5 estrellas grandes interactivas (45px)
  - TextArea para comentario
  - Botón "Publicar valoración"
- Lista de valoraciones de otros usuarios:
  - Cards blancas con borde sutil
  - Nombre usuario en negrita marrón
  - Estrellas pequeñas
  - Comentario
  - Fecha en gris cursiva

**Flujo de interacción:**
```
Usuario en BookDetail
├─ Selecciona estrellas → Escribe comentario → Presiona "Publicar"
│  └─ Si es su primera valoración: Crea nueva
│  └─ Si ya valoró: Muestra su valoración con botones Editar/Eliminar
├─ Presiona "Editar" en su valoración → Rellena formulario → Actualiza
├─ Presiona "Eliminar" → Confirmación → Elimina valoración
└─ Presiona "← Volver" → Regresa a Home
```

### 5.2 Diseño Lógico - Diagramas UML

#### **Diagrama de Casos de Uso**

```
┌──────────────────────────────────────────┐
│           SISTEMA LECTOPOLIS             │
│                                          │
│   ┌────────────────────────────────┐    │
│   │ Registrar Usuario              │◄───┼── Usuario no autenticado
│   └────────────────────────────────┘    │
│                                          │
│   ┌────────────────────────────────┐    │
│   │ Iniciar Sesión                 │◄───┼── Usuario no autenticado
│   └────────────────────────────────┘    │
│                                          │
│   ┌────────────────────────────────┐    │
│   │ Buscar Libros                  │◄───┼─┐
│   └────────────────────────────────┘    │ │
│                                          │ │
│   ┌────────────────────────────────┐    │ │
│   │ Ver Detalles de Libro          │◄───┼─┤ Usuario
│   └────────────────────────────────┘    │ │ autenticado
│                                          │ │
│   ┌────────────────────────────────┐    │ │
│   │ Crear Valoración               │◄───┼─┤
│   └────────────────────────────────┘    │ │
│                                          │ │
│   ┌────────────────────────────────┐    │ │
│   │ Editar Mi Valoración           │◄───┼─┤
│   └────────────────────────────────┘    │ │
│                                          │ │
│   ┌────────────────────────────────┐    │ │
│   │ Eliminar Mi Valoración         │◄───┼─┤
│   └────────────────────────────────┘    │ │
│                                          │ │
│   ┌────────────────────────────────┐    │ │
│   │ Ver Valoraciones de Otros      │◄───┼─┘
│   └────────────────────────────────┘    │
│                                          │
└──────────────────────────────────────────┘
```

#### **Diagrama de Clases - Backend**

```
┌─────────────────────────┐
│        User             │
├─────────────────────────┤
│ - Id: int (PK)          │
│ - Username: string      │
│ - Password: string      │
├─────────────────────────┤
│ + Ratings: List<Rating> │
└───────────┬─────────────┘
            │ 1
            │
            │ *
┌───────────▼─────────────┐
│        Rating           │
├─────────────────────────┤
│ - Id: int (PK)          │
│ - BookId: string        │
│ - UserId: int (FK)      │
│ - Score: int            │
│ - Comment: string?      │
│ - CreatedAt: DateTime   │
├─────────────────────────┤
│ + User: User            │
└─────────────────────────┘

┌──────────────────────────────┐
│   UsersController            │
├──────────────────────────────┤
│ + Register()                 │
│ + Login()                    │
│ - GenerateJwtToken()         │
└──────────────────────────────┘

┌──────────────────────────────┐
│   BooksController            │
├──────────────────────────────┤
│ + SearchBooks(query)         │
└──────────────────────────────┘

┌──────────────────────────────┐
│   RatingsController          │
├──────────────────────────────┤
│ + CreateRating()             │
│ + GetRatings(bookId)         │
│ + UpdateRating(id)           │
│ + DeleteRating(id)           │
└──────────────────────────────┘

┌──────────────────────────────┐
│   AppDbContext               │
├──────────────────────────────┤
│ + Users: DbSet<User>         │
│ + Ratings: DbSet<Rating>     │
└──────────────────────────────┘
```

#### **Diagrama de Secuencia - Crear Valoración**

```
Usuario    App (Frontend)    API Backend    Base de Datos    Google Books
  │              │                │               │                │
  │  Busca libro │                │               │                │
  ├─────────────►│                │               │                │
  │              │ GET /api/books?query=...       │                │
  │              ├───────────────►│               │                │
  │              │                │ Consulta libros                │
  │              │                ├───────────────────────────────►│
  │              │                │◄───────────────────────────────┤
  │              │                │ Calcula promedios              │
  │              │                ├──────────────►│                │
  │              │                │◄───────────────┤                │
  │              │◄───────────────┤                │                │
  │◄─────────────┤ Muestra libros │               │                │
  │              │                │               │                │
  │ Selecciona   │                │               │                │
  │ libro        │                │               │                │
  ├─────────────►│                │               │                │
  │              │ GET /api/ratings/{bookId}      │                │
  │              ├───────────────►│               │                │
  │              │                │ SELECT ratings│                │
  │              │                ├──────────────►│                │
  │              │                │◄───────────────┤                │
  │              │◄───────────────┤                │                │
  │◄─────────────┤ Muestra detalles               │                │
  │              │                │               │                │
  │ Completa     │                │               │                │
  │ formulario   │                │               │                │
  ├─────────────►│                │               │                │
  │              │ POST /api/ratings              │                │
  │              │ + JWT Token    │               │                │
  │              ├───────────────►│               │                │
  │              │                │ Valida JWT    │                │
  │              │                │ Verifica user │                │
  │              │                │ INSERT rating │                │
  │              │                ├──────────────►│                │
  │              │                │◄───────────────┤                │
  │              │◄───────────────┤                │                │
  │◄─────────────┤ Éxito          │               │                │
  │              │                │               │                │
```

### 5.3 Diseño de Base de Datos

#### **Modelo Entidad-Relación**

```
┌─────────────────────┐
│       Users         │
├─────────────────────┤
│ PK  Id (int)        │
│     Username (str)  │
│     Password (str)  │
└──────────┬──────────┘
           │
           │ 1:N
           │
┌──────────▼──────────┐
│      Ratings        │
├─────────────────────┤
│ PK  Id (int)        │
│ FK  UserId (int)    │
│     BookId (string) │
│     Score (int)     │
│     Comment (str?)  │
│     CreatedAt (dt)  │
└─────────────────────┘
```

**Restricciones:**
- `Users.Username` es UNIQUE
- `Ratings.Score` debe estar entre 1 y 5
- `Ratings.UserId` → `Users.Id` (CASCADE DELETE)
- Índice compuesto en (`BookId`, `UserId`) para consultas rápidas

#### **Script SQL de Creación**

```sql
-- Tabla Users
CREATE TABLE "Users" (
    "Id" SERIAL PRIMARY KEY,
    "Username" VARCHAR(100) NOT NULL UNIQUE,
    "Password" VARCHAR(255) NOT NULL
);

-- Tabla Ratings
CREATE TABLE "Ratings" (
    "Id" SERIAL PRIMARY KEY,
    "BookId" VARCHAR(50) NOT NULL,
    "UserId" INTEGER NOT NULL,
    "Score" INTEGER NOT NULL CHECK ("Score" >= 1 AND "Score" <= 5),
    "Comment" TEXT,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE
);

-- Índices para optimización
CREATE INDEX idx_ratings_bookid ON "Ratings"("BookId");
CREATE INDEX idx_ratings_userid ON "Ratings"("UserId");
CREATE UNIQUE INDEX idx_ratings_user_book ON "Ratings"("UserId", "BookId");
```

### 5.4 Estructura Modular del Software

#### **Backend - Estructura de Carpetas**

```
backend/
├── Controllers/
│   ├── BooksController.cs      # Búsqueda de libros (Google Books API)
│   ├── RatingsController.cs    # CRUD valoraciones
│   └── UsersController.cs      # Autenticación (register/login)
├── Data/
│   └── AppDbContext.cs         # Contexto Entity Framework
├── Models/
│   ├── Ratings.cs              # Modelo Rating
│   └── User.cs                 # Modelo User
├── Migrations/                 # Migraciones EF Core
│   ├── InitialCreate.cs
│   └── AddRatings.cs
├── Properties/
│   └── launchSettings.json     # Configuración de ejecución
├── appsettings.json            # Configuración (DB, JWT)
├── Program.cs                  # Punto de entrada, configuración servicios
└── backend.csproj              # Dependencias NuGet
```

#### **Frontend - Estructura de Carpetas**

```
frontend/
├── assets/                     # Recursos estáticos
├── screens/
│   ├── LoginScreen.js          # Pantalla autenticación
│   ├── HomeScreen.js           # Búsqueda y listado
│   └── BookDetailScreen.js     # Detalles y valoraciones
├── services/
│   └── api.js                  # Capa de servicios HTTP
├── App.js                      # Componente raíz, navegación
├── index.js                    # Punto de entrada
├── app.json                    # Configuración Expo
└── package.json                # Dependencias npm
```

### 5.5 Código Fuente Relevante

#### **Autenticación JWT - UserController.cs**

```csharp
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    // Buscar usuario en base de datos
    var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Username == request.Username);

    // Verificar contraseña con BCrypt
    if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
        return Unauthorized("Credenciales incorrectas.");

    // Generar token JWT
    var token = GenerateJwtToken(user);

    return Ok(new
    {
        message = "Inicio de sesión exitoso",
        token = token,
        userId = user.Id,
        username = user.Username
    });
}

private string GenerateJwtToken(User user)
{
    var jwtSettings = _configuration.GetSection("Jwt");
    var secretKey = jwtSettings["SecretKey"];
    
    // Claims del token
    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: jwtSettings["Issuer"],
        audience: jwtSettings["Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpirationMinutes"]!)),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

**Aspectos destacados:**
- Hash de contraseñas con BCrypt (factor 12, seguro contra rainbow tables)
- JWT con expiración configurable (60 minutos por defecto)
- Claims customizados para identificar usuario sin consultas adicionales

#### **Integración Google Books API - BooksController.cs**

```csharp
[HttpGet]
public async Task<IActionResult> SearchBooks([FromQuery] string query)
{
    if (string.IsNullOrWhiteSpace(query))
        return BadRequest("El parámetro 'query' es requerido");

    // Llamada a Google Books API
    var url = $"https://www.googleapis.com/books/v1/volumes?q={Uri.EscapeDataString(query)}&maxResults=20";
    var response = await _httpClient.GetAsync(url);
    
    if (!response.IsSuccessStatusCode)
        return StatusCode(500, "Error al conectar con Google Books API");

    var json = await response.Content.ReadAsStringAsync();
    var data = JsonDocument.Parse(json);
    
    var books = new List<object>();
    
    if (data.RootElement.TryGetProperty("items", out var items))
    {
        foreach (var item in items.EnumerateArray())
        {
            var volumeInfo = item.GetProperty("volumeInfo");
            var bookId = item.GetProperty("id").GetString();
            
            // Calcular valoración media desde BD local
            var avgRating = await _context.Ratings
                .Where(r => r.BookId == bookId)
                .AverageAsync(r => (double?)r.Score) ?? 0.0;
            
            var ratingsCount = await _context.Ratings
                .CountAsync(r => r.BookId == bookId);

            books.Add(new
            {
                id = bookId,
                titulo = volumeInfo.TryGetProperty("title", out var title) 
                    ? title.GetString() 
                    : "Sin título",
                autores = volumeInfo.TryGetProperty("authors", out var authors)
                    ? string.Join(", ", authors.EnumerateArray().Select(a => a.GetString()))
                    : "Autor desconocido",
                sinopsis = volumeInfo.TryGetProperty("description", out var desc)
                    ? desc.GetString()
                    : "Sin descripción disponible",
                portada = volumeInfo.TryGetProperty("imageLinks", out var images)
                    ? images.TryGetProperty("thumbnail", out var thumb)
                        ? thumb.GetString()
                        : null
                    : null,
                valoracionMedia = Math.Round(avgRating, 1),
                totalValoraciones = ratingsCount
            });
        }
    }

    return Ok(new { books });
}
```

**Aspectos destacados:**
- Manejo robusto de JSON con null-safety
- Enriquecimiento de datos externos con valoraciones locales
- Límite de 20 resultados para no saturar UI
- Formato de respuesta consistente

#### **CRUD Valoraciones - RatingsController.cs**

```csharp
[HttpPost]
[Authorize]
public async Task<IActionResult> CreateRating([FromBody] RatingRequest request)
{
    // Extraer userId del JWT
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

    // Prevenir duplicados
    var existingRating = await _context.Ratings
        .FirstOrDefaultAsync(r => r.BookId == request.BookId && r.UserId == userId);

    if (existingRating != null)
        return BadRequest("Ya has valorado este libro.");

    var rating = new Rating
    {
        BookId = request.BookId,
        UserId = userId,
        Score = request.Score,
        Comment = request.Comment,
        CreatedAt = DateTime.UtcNow
    };

    _context.Ratings.Add(rating);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Valoración creada correctamente", rating });
}

[HttpPut("{id}")]
[Authorize]
public async Task<IActionResult> UpdateRating(int id, [FromBody] RatingRequest request)
{
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
    
    var rating = await _context.Ratings.FindAsync(id);
    
    if (rating == null)
        return NotFound("Valoración no encontrada");
    
    // Solo el propietario puede editar
    if (rating.UserId != userId)
        return Forbid();

    rating.Score = request.Score;
    rating.Comment = request.Comment;
    
    await _context.SaveChangesAsync();

    return Ok(new { message = "Valoración actualizada", rating });
}
```

**Aspectos destacados:**
- Atributo `[Authorize]` requiere JWT válido
- Extracción automática de userId desde claims del token
- Validación de propiedad (solo el autor puede editar/eliminar)
- Constraint de unicidad (un usuario, una valoración por libro)

#### **Gestión de Token JWT - api.js (Frontend)**

```javascript
// Token JWT para autenticación
let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const clearAuthToken = () => {
  authToken = null;
};

// Crear valoración con JWT
export const createRating = async (bookId, userId, score, comment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`  // Token en header
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
```

**Aspectos destacados:**
- Token almacenado en memoria (no persistente, mayor seguridad)
- Header `Authorization: Bearer {token}` según estándar RFC 6750
- Manejo de errores con mensajes descriptivos
- Funciones `set` y `clear` para gestión del ciclo de vida del token

#### **Navegación y Estado - App.js**

```javascript
export default function App() {
  const [user, setUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuthToken(); // Limpiar token JWT
    setUser(null);
    setSelectedBook(null);
  };

  // Renderizado condicional para navegación
  if (!user) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <StatusBar style="auto" />
      </>
    );
  }

  if (selectedBook) {
    return (
      <>
        <BookDetailScreen 
          book={selectedBook} 
          user={user} 
          onBack={() => setSelectedBook(null)} 
        />
        <StatusBar style="auto" />
      </>
    );
  }

  return (
    <>
      <HomeScreen 
        user={user} 
        onLogout={handleLogout}
        onSelectBook={setSelectedBook}
      />
      <StatusBar style="auto" />
    </>
  );
}
```

**Aspectos destacados:**
- Patrón de navegación simple basado en estado (sin librería externa)
- `useState` para gestión de usuario y libro seleccionado
- Renderizado condicional según estado de autenticación
- Limpieza de token al cerrar sesión

### 5.6 Consideraciones de Seguridad

#### **Implementadas:**
✅ Contraseñas hasheadas con BCrypt (factor 12)  
✅ JWT con expiración (60 minutos)  
✅ CORS configurado (solo orígenes permitidos)  
✅ Validación de propiedad en endpoints protegidos  
✅ Prepared statements (Entity Framework previene SQL injection)  

#### **Recomendadas para producción:**
⚠️ HTTPS obligatorio (actualmente HTTP en desarrollo)  
⚠️ Rate limiting en endpoints de autenticación  
⚠️ Refresh tokens para renovación automática  
⚠️ Almacenamiento seguro de JWT en frontend (SecureStore de Expo)  
⚠️ Validación más estricta de inputs (longitud, caracteres permitidos)  

---

## 6. MANUAL DE USUARIO

### 6.1 Requisitos del Sistema

**Para ejecutar la aplicación móvil:**
- Dispositivo Android 5.0 o superior (API Level 21+)
- 50 MB de espacio libre
- Conexión a internet estable

**Para ejecutar el backend (desarrollo):**
- Windows 10/11, macOS 11+, o Linux (Ubuntu 20.04+)
- .NET SDK 8.0 o superior
- PostgreSQL 12 o superior
- 200 MB de espacio libre

### 6.2 Instalación

#### **Opción A: Instalación desde APK (Usuarios finales)**

1. Descarga el archivo `Lectopolis.apk`
2. En tu dispositivo Android, habilita "Instalar aplicaciones de origen desconocido":
   - `Ajustes > Seguridad > Orígenes desconocidos`
3. Toca el archivo APK descargado
4. Sigue las instrucciones en pantalla
5. ¡Listo! La app aparecerá en tu cajón de aplicaciones

#### **Opción B: Instalación desde código fuente (Desarrolladores)**

**Backend:**
```bash
# Clonar repositorio
git clone https://github.com/Azeskiv/Lectopolis.git
cd Lectopolis/backend

# Restaurar dependencias
dotnet restore

# Configurar cadena de conexión en appsettings.json
# Editar: "DefaultConnection": "Host=localhost;Port=5432;Database=lectopolisdb;Username=postgres;Password=TU_PASSWORD"

# Aplicar migraciones
dotnet ef database update

# Ejecutar backend
dotnet run
# Backend corriendo en http://localhost:5263
```

**Frontend:**
```bash
cd ../frontend

# Instalar dependencias
npm install

# Configurar API_BASE_URL en services/api.js
# Para emulador Android: http://10.0.2.2:5263/api
# Para dispositivo físico: http://TU_IP_PC:5263/api

# Ejecutar con Expo
npx expo start

# Escanear QR con Expo Go (iOS/Android)
# O presionar 'a' para abrir en emulador Android
```

### 6.3 Guía de Uso Paso a Paso

#### **Primera vez: Crear una cuenta**

1. **Abre Lectopolis**
   - Verás la pantalla de bienvenida con el logo 📚

2. **Regístrate**
   - Toca la pestaña "Registro"
   - Introduce un nombre de usuario (mínimo 3 caracteres)
   - Introduce una contraseña (mínimo 6 caracteres)
   - Confirma tu contraseña
   - Presiona el botón "Registrarse"
   - Aparecerá mensaje: "Usuario registrado. Ahora puedes iniciar sesión"

3. **Inicia sesión**
   - La app te cambiará automáticamente a la pestaña "Login"
   - Introduce tu nombre de usuario y contraseña
   - Presiona "Iniciar sesión"
   - ¡Bienvenido a Lectopolis!

#### **Buscar libros**

1. **Desde la pantalla principal (Home)**
   - Verás un campo de búsqueda en la parte superior
   - Escribe el título del libro, autor, o palabra clave
   - Ejemplos: "Tolkien", "Don Quijote", "ciencia ficción"

2. **Presiona el botón "Buscar"**
   - La app consultará Google Books (25+ millones de libros)
   - En 1-2 segundos aparecerán los resultados

3. **Explora los resultados**
   - Cada tarjeta muestra:
     - Portada del libro
     - Título y autor
     - Valoración media de la comunidad (estrellas doradas)
     - Número total de valoraciones

#### **Ver detalles de un libro**

1. **Toca cualquier tarjeta de libro**
   - Se abrirá la pantalla de detalles

2. **Información disponible:**
   - **Portada grande** con efecto 3D
   - **Título y autor** destacados
   - **Valoración media** de todos los usuarios
   - **Sinopsis completa** del libro
   - **Todas las valoraciones** de la comunidad

3. **Desplázate hacia abajo** para ver valoraciones de otros usuarios
   - Cada valoración muestra:
     - Nombre del usuario
     - Puntuación (estrellas)
     - Comentario
     - Fecha de publicación

#### **Crear una valoración**

1. **En la pantalla de detalles del libro**
   - Desplázate hasta la sección "Tu valoración"

2. **Selecciona tu puntuación**
   - Toca las estrellas: de 1⭐ (malo) a 5⭐⭐⭐⭐⭐ (excelente)
   - Las estrellas se iluminarán en dorado

3. **Escribe tu opinión (opcional)**
   - En el campo de comentario, comparte tus pensamientos
   - Hasta 1000 caracteres
   - Ejemplos:
     - "Una obra maestra del género fantástico"
     - "Ritmo lento pero personajes profundos"

4. **Publica tu valoración**
   - Presiona el botón "Publicar valoración"
   - Aparecerá mensaje: "¡Éxito! Valoración publicada"
   - Tu valoración aparecerá destacada con fondo amarillo claro

#### **Editar tu valoración**

1. **Localiza tu valoración**
   - Tiene un fondo amarillo claro para destacar
   - Aparecen botones "Editar" y "Eliminar"

2. **Presiona "Editar"**
   - El formulario se rellenará con tus datos actuales
   - Modifica la puntuación o el comentario

3. **Guarda cambios**
   - Presiona "Actualizar valoración"
   - Mensaje de confirmación: "Valoración actualizada"

#### **Eliminar tu valoración**

1. **Presiona el botón rojo "Eliminar"**
   - Aparecerá ventana de confirmación
   - "¿Estás seguro de eliminar esta valoración?"

2. **Confirma la acción**
   - Presiona "Eliminar"
   - Tu valoración desaparecerá de la lista

3. **Para cancelar**
   - Presiona "Cancelar" en la ventana de confirmación

#### **Cerrar sesión**

1. **Desde la pantalla Home**
   - En la esquina superior derecha verás el botón "Cerrar sesión"

2. **Toca el botón**
   - Serás redirigido a la pantalla de login
   - Tu token de sesión se borrará

3. **Para volver a entrar**
   - Introduce tus credenciales de nuevo

### 6.4 Preguntas Frecuentes (FAQ)

**P: ¿Necesito crear una cuenta para buscar libros?**  
R: No, pero necesitas estar registrado para crear valoraciones.

**P: ¿Cuántas valoraciones puedo hacer por libro?**  
R: Una sola valoración por libro. Puedes editarla o eliminarla cuando quieras.

**P: ¿Otros usuarios pueden ver mi valoración?**  
R: Sí, las valoraciones son públicas para toda la comunidad.

**P: ¿Puedo editar o eliminar la valoración de otro usuario?**  
R: No, solo puedes modificar tus propias valoraciones.

**P: ¿Qué hago si no encuentro un libro?**  
R: Intenta con diferentes palabras clave. La búsqueda consulta la base de datos de Google Books, que contiene más de 25 millones de títulos.

**P: ¿La app guarda mis búsquedas?**  
R: No, actualmente no hay historial de búsquedas. Esta funcionalidad está planificada para futuras versiones.

**P: ¿Funciona sin internet?**  
R: No, se requiere conexión activa para buscar libros y gestionar valoraciones. Un modo offline está en desarrollo.

**P: ¿Mis valoraciones se guardan si cierro la app?**  
R: Sí, todas las valoraciones se almacenan en la base de datos y persisten indefinidamente.

**P: ¿Puedo cambiar mi contraseña?**  
R: Actualmente no desde la app. Contacta al administrador. Esta funcionalidad se agregará en futuras versiones.

**P: ¿Cómo reporto un problema o sugiero una mejora?**  
R: Envía un correo a soporte@lectopolis.com o abre un issue en el repositorio de GitHub.

### 6.5 Solución de Problemas

#### **Error: "Network request failed"**

**Causas posibles:**
- Backend no está ejecutándose
- Firewall bloqueando puerto 5263
- IP incorrecta en `api.js`

**Soluciones:**
1. Verifica que el backend esté corriendo: `dotnet run`
2. Comprueba la IP en `services/api.js`
3. En Windows, permite puerto 5263 en Firewall

#### **Error: "Ya has valorado este libro"**

**Causa:** Intentas crear una segunda valoración.

**Solución:** Edita tu valoración existente en lugar de crear una nueva.

#### **No aparecen resultados en búsqueda**

**Causas posibles:**
- Término de búsqueda muy específico
- API de Google Books temporalmente no disponible

**Soluciones:**
1. Intenta con palabras clave más generales
2. Espera unos minutos y vuelve a intentar

#### **La app se cierra inesperadamente**

**Soluciones:**
1. Reinicia la aplicación
2. Limpia caché de Expo Go
3. Reinstala la aplicación

---

## 7. BIBLIOGRAFÍA Y FUENTES DE INFORMACIÓN

### 7.1 Documentación Oficial

**Microsoft .NET y ASP.NET Core**
- Microsoft Docs. (2024). *ASP.NET Core documentation*. [https://learn.microsoft.com/aspnet/core](https://learn.microsoft.com/aspnet/core)
- Microsoft Docs. (2024). *Entity Framework Core*. [https://learn.microsoft.com/ef/core](https://learn.microsoft.com/ef/core)
- Microsoft Docs. (2024). *Introduction to authorization in ASP.NET Core*. [https://learn.microsoft.com/aspnet/core/security/authorization](https://learn.microsoft.com/aspnet/core/security/authorization)

**React Native y Expo**
- Meta Platforms. (2024). *React Native Documentation*. [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
- Expo. (2024). *Expo Documentation*. [https://docs.expo.dev](https://docs.expo.dev)

**PostgreSQL**
- PostgreSQL Global Development Group. (2024). *PostgreSQL 18 Documentation*. [https://www.postgresql.org/docs/18](https://www.postgresql.org/docs/18)

**Google Books API**
- Google Developers. (2024). *Books API Reference*. [https://developers.google.com/books/docs/v1/reference](https://developers.google.com/books/docs/v1/reference)

### 7.2 Libros y Recursos Educativos

- Freeman, A. (2023). *Pro ASP.NET Core 8: Develop Cloud-Ready Web Applications Using MVC 8, Blazor, and Razor Pages*. Apress.

- Larman, C. (2004). *Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development* (3rd ed.). Prentice Hall.

- Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson.

- Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*. Prentice Hall.

### 7.3 Artículos y Tutoriales

- Auth0. (2024). *JWT Handbook*. [https://auth0.com/resources/ebooks/jwt-handbook](https://auth0.com/resources/ebooks/jwt-handbook)

- Microsoft. (2024). *Best practices for secure API development*. Microsoft Learn.

- OWASP. (2024). *OWASP Top Ten Web Application Security Risks*. [https://owasp.org/www-project-top-ten](https://owasp.org/www-project-top-ten)

### 7.4 Stack Overflow y Comunidad

- Stack Overflow. (2024). Consultas sobre Entity Framework Core, React Native, JWT. [https://stackoverflow.com](https://stackoverflow.com)

- GitHub. (2024). Repositorios de referencia:
  - [aspnetcore](https://github.com/dotnet/aspnetcore)
  - [react-native](https://github.com/facebook/react-native)
  - [expo](https://github.com/expo/expo)

### 7.5 Herramientas y Servicios

- BCrypt.Net. (2024). *BCrypt.Net-Next NuGet Package*. [https://www.nuget.org/packages/BCrypt.Net-Next](https://www.nuget.org/packages/BCrypt.Net-Next)

- Npgsql. (2024). *Npgsql - .NET Access to PostgreSQL*. [https://www.npgsql.org](https://www.npgsql.org)

- Android Studio. (2024). *Android Developers Documentation*. [https://developer.android.com/studio](https://developer.android.com/studio)

---

## ANEXOS

### Anexo A: Configuración del Entorno de Desarrollo

*Archivo: `CONFIGURACION_ENTORNO.md` - Instrucciones detalladas para configurar todo el entorno desde cero*

### Anexo B: Colección Postman

*Archivo: `Lectopolis.postman_collection.json` - Colección completa de peticiones HTTP para testing del backend*

### Anexo C: Diagramas de Alta Resolución

*Carpeta: `/diagramas/` - Versiones en formato PNG/SVG de todos los diagramas UML*

### Anexo D: Capturas de Pantalla

*Carpeta: `/capturas/` - Screenshots de todas las pantallas de la aplicación*

### Anexo E: Código Fuente Completo

*Disponible en repositorio GitHub: https://github.com/Azeskiv/Lectopolis*

---

**FIN DEL DOCUMENTO**

*Última actualización: 8 de diciembre de 2025*  
*Versión: 1.0*
