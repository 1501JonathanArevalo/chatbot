> Agente conversacional con conocimiento institucional sobre **MediT** y la **Declaración de la Persona Transmoderna** de la Universidad de Cundinamarca.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Cloud%20API-F55036?style=flat-square)
![Llama](https://img.shields.io/badge/Modelo-Llama%203.1--8b--instant-blueviolet?style=flat-square)
![License](https://img.shields.io/badge/Licencia-MIT-blue?style=flat-square)

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Funcionalidades](#-funcionalidades)
- [Arquitectura](#-arquitectura)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Uso del API de Groq](#-uso-del-api-de-groq)
- [Base de Conocimiento](#-base-de-conocimiento)
- [Alineación Ética](#-alineación-ética)
- [Autores](#-autores)

---

## 📖 Descripción

**KnowledgeBot** es un chatbot web desarrollado como proyecto académico para la **Universidad de Cundinamarca**. Combina un servidor Node.js con la API de inferencia de Groq Cloud para ofrecer respuestas inteligentes sobre dos dominios de conocimiento:

1. **MediT** – Herramienta de gestión de tratamientos médicos: medicamentos, agendamiento, funcionalidades y soporte técnico.
2. **Declaración de la Persona Transmoderna** – Valores institucionales de la Universidad de Cundinamarca: libertad, autonomía, responsabilidad, diálogo y construcción.

El agente detecta automáticamente el idioma del usuario (español o inglés) y responde de forma coherente con la filosofía de formación humana de la institución.

---

## ✨ Funcionalidades

- 💬 **Conversación en tiempo real** con historial de mensajes
- 🌐 **Soporte bilingüe** (español / inglés) con detección automática de idioma
- 🏥 **Conocimiento especializado** sobre MediT y sus funcionalidades
- 🎓 **Integración ética** con la Declaración de la Persona Transmoderna
- 🔒 **Manejo seguro de credenciales** mediante variables de entorno
- ⚡ **Respuestas rápidas** gracias al modelo `llama-3.1-8b-instant` de Groq
- 📱 **Interfaz web responsiva** compatible con dispositivos móviles y de escritorio

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                   CLIENTE (Browser)                  │
│                                                      │
│   index.html + style.css + app.js                   │
│   ┌──────────────────────────────────────────────┐  │
│   │  Interfaz de chat  →  fetch POST /api/chat   │  │
│   └──────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────┘
                         │ HTTP (localhost:3000)
┌────────────────────────▼────────────────────────────┐
│              SERVIDOR (Node.js + Express)            │
│                                                      │
│   server.js                                          │
│   ├── POST /api/chat  ──►  Groq SDK                 │
│   ├── System Prompt (MediT + Transmoderna)          │
│   └── Historial de conversación (últimos 12 msgs)   │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS (api.groq.com)
┌────────────────────────▼────────────────────────────┐
│              GROQ CLOUD (Motor de IA)               │
│                                                      │
│   Modelo: llama-3.1-8b-instant                      │
│   - Inferencia rápida y gratuita                    │
│   - Procesamiento de lenguaje natural               │
└─────────────────────────────────────────────────────┘
```

---

## 📦 Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

| Herramienta | Versión mínima | Enlace |
|-------------|---------------|--------|
| Node.js     | 18.x o superior | [nodejs.org](https://nodejs.org) |
| npm         | 8.x o superior  | Incluido con Node.js |
| Git         | Cualquier versión reciente | [git-scm.com](https://git-scm.com) |

También necesitas una **API Key de Groq** (gratuita):
1. Regístrate en [console.groq.com](https://console.groq.com)
2. Ve a **API Keys** → **Create API Key**
3. Copia la clave generada

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/knowledge-chatbot.git
cd knowledge-chatbot
```

### 2. Instalar dependencias del servidor

```bash
cd server
npm install
```

Las dependencias instaladas son:

```json
{
  "express": "^4.18.2",
  "groq-sdk": "^0.5.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 🔑 Variables de Entorno

Crea un archivo `.env` dentro de la carpeta `server/` con el siguiente contenido:

```env
# API Key de Groq Cloud (OBLIGATORIO)
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Puerto del servidor (opcional, por defecto 3000)
PORT=3000
```

> ⚠️ **IMPORTANTE:** Nunca subas el archivo `.env` a tu repositorio. Está incluido en `.gitignore` por defecto.

---

## ▶️ Ejecución

### Modo desarrollo

```bash
cd server
node server.js
```

### Con nodemon (recarga automática)

```bash
npm install -g nodemon
nodemon server.js
```

Una vez iniciado, abre tu navegador en:

```
http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
knowledge-chatbot/
│
├── client/                  # Frontend (interfaz web)
│   ├── index.html           # Página principal del chat
│   ├── style.css            # Estilos de la interfaz
│   └── app.js               # Lógica del cliente (fetch, DOM)
│
├── server/                  # Backend (API Node.js)
│   ├── server.js            # Servidor Express + integración Groq
│   ├── .env                 # Variables de entorno (NO subir a git)
│   ├── package.json         # Dependencias del proyecto
│   └── package-lock.json    # Versiones exactas de dependencias
│
├── .gitignore               # Archivos ignorados por Git
└── README.md                # Este archivo
```

---

## 🔌 Uso del API de Groq

El servidor se comunica con Groq a través del endpoint oficial:

```
POST https://api.groq.com/openai/v1/chat/completions
```

### Ejemplo de solicitud (server.js)

```javascript
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const response = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    { role: "system", content: systemPrompt },
    ...conversationHistory,
    { role: "user", content: userMessage }
  ],
  max_tokens: 1000,
  temperature: 0.7
});
```

### Modelos disponibles en Groq

| Modelo | Velocidad | Uso recomendado |
|--------|-----------|-----------------|
| `llama-3.1-8b-instant` | ⚡ Muy rápido | Chatbots en tiempo real ✅ |
| `llama-3.3-70b-versatile` | 🐢 Moderado | Análisis complejos |
| `gemma2-9b-it` | ⚡ Rápido | Alternativa ligera |

> El proyecto usa `llama-3.1-8b-instant` por su equilibrio entre velocidad y calidad de respuesta.

---

## 📚 Base de Conocimiento

El comportamiento del chatbot está definido por un **system prompt** estructurado que incluye:

### Sobre MediT

El asistente conoce y puede responder preguntas sobre:
- Tipos de medicamentos soportados (pastillas, cápsulas, gotas, inyecciones, cremas, spray, suplementos)
- Funcionalidades de agendamiento y recordatorios
- Soporte técnico básico de la aplicación
- Orientación a pacientes y cuidadores

### Reglas del sistema

```
1. Detectar si el mensaje del usuario está en español o inglés.
2. Responder siempre en el mismo idioma detectado.
3. Mantener respuestas prácticas, seguras y claras para pacientes y cuidadores.
4. Si el usuario pregunta sobre valores, autonomía, identidad o principios éticos,
   responder exactamente con la Declaración de la Persona Transmoderna.
```

---

## ⚖️ Alineación Ética

Este proyecto integra de manera funcional la **Declaración de la Persona Transmoderna** de la Universidad de Cundinamarca como eje transversal del diálogo del agente.

Cuando el usuario realiza preguntas sobre la identidad, valores o marco ético del bot, el sistema responde con el ideal regulatorio institucional:

> *"Soy LIBRE, AUTÓNOMO Y RESPONSABLE a través del diálogo y la construcción, como ideal regulatorio; me dirijo, controlo y dicto mis propias leyes."*

Esta integración no es texto estático, sino una regla activa dentro del system prompt, demostrando coherencia entre el desarrollo tecnológico y la filosofía de formación humana de la institución.

---

## 👥 Autores

| Nombre | Rol |
|--------|-----|
| Jonathan Arevalo | Desarrollo backend y configuración de IA |

**Institución:** Universidad de Cundinamarca  
**Programa:** Ingeniería de Sistemas  
**Año:** 2026

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <sub>Desarrollado con ❤️ en la Universidad de Cundinamarca</sub>
</div>
