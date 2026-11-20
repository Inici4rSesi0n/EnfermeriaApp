# 🩺 SRP EXPRESS — Sistema de Vigilancia del Sarampión (Simulación)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/Storage-LocalStorage-4B8BBE?logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

**SRP EXPRESS** es una aplicación web frontend desarrollada como un **proyecto de simulación educativa**. Su objetivo es demostrar el flujo de gestión, prevención y seguimiento del sarampión a través de una interfaz moderna e interactiva.

> ⚠️ **AVISO IMPORTANTE:** Esta es una aplicación simulada con fines demostrativos. **No es un sistema médico real**, no está conectada a bases de datos clínicas ni debe ser utilizada para el diagnóstico o tratamiento de pacientes reales. Todos los datos se almacenan localmente en el navegador (`localStorage`).

---

## ✨ Características Principales

- **Arquitectura SPA (Single Page Application):** Navegación fluida sin recargar la página.
- **Control de Roles:** Interfaz adaptada para **Pacientes** (agendar citas, consultar síntomas) y **Licenciados** (gestión de agenda, registro de atención).
- **Sistema de Notificaciones:** Alertas en tiempo real para pacientes cuando sus citas son reprogramadas o sus vacunas validadas.
- **Diseño 100% Responsivo:** Interfaz adaptada para escritorio, tablet y dispositivos móviles (Mobile-First).
- **Generador de Póster QR:** Herramienta integrada para descargar un póster de la app con el código QR en alta calidad.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| **HTML5** | Estructura semántica de la aplicación. |
| **CSS3** | Variables, Flexbox, Grid y efectos de Glassmorphism. |
| **JavaScript (ES6+)** | Módulos, `import`/`export`, manipulación del DOM. |
| **LocalStorage** | Simulación de base de datos y gestión de sesiones. |

---

## 💻 Cómo ejecutar el proyecto localmente

1. **Clona este repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   ```

2. **Abre la aplicación:**

   Al ser un proyecto "Vanilla", **no requiere `npm install`**. Puedes abrir el archivo `index.html` directamente en tu navegador, o usar un servidor local:

   ```bash
   python -m http.server 8080
   ```

   Luego visita `http://localhost:8080` en tu navegador.

---

## 🔑 Credenciales de Prueba (Simulación)

| Rol | DNI | Contraseña |
|-----|-----|------------|
| **Paciente** | `12345678` | `123456` |
| **Licenciado** | `87654321` | `123456` |

> 💡 **Nota:** También puedes crear una cuenta nueva desde el formulario de registro.

---

## 📄 Licencia

Este proyecto está bajo la **GNU General Public License v3.0 (GPLv3)**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

---

