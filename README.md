# 🤖 AI Agent System - Orquestador de Conversaciones con IA

> ⚠️ **Estado del Proyecto**: En desarrollo activo | Versión Alpha

Sistema inteligente de orquestación de agentes de IA que integra múltiples LLMs con WhatsApp para automatizar conversaciones y gestionar flujos de negocio complejos.

## 📋 Descripción

Plataforma de automatización conversacional que combina NestJS, OpenAI/LocalAI y Twilio para crear asistentes virtuales que responden consultas de negocio a través de WhatsApp.

**Funcionalidad actual:**

- ✅ Detección automática de intenciones del usuario
- ✅ Respuestas inteligentes basadas en información del negocio (sedes, servicios, horarios)
- ✅ Gestión de sesiones de usuario con contexto persistente
- ✅ Integración con múltiples proveedores de LLM (OpenAI, LocalAI)
- ✅ Persistencia de conversaciones en Firestore
- ✅ Sistema modular de agentes especializados

## 🏗️ Arquitectura y Diseño

### Patrones Implementados

- **Factory Pattern**: Creación dinámica de agentes especializados
- **Adapter Pattern**: Abstracción de proveedores LLM (OpenAI, LocalAI)
- **State Machine**: Gestión de flujos conversacionales complejos
- **Repository Pattern**: Acceso a datos con Firestore
- **Dependency Injection**: Arquitectura modular con NestJS

### Estructura Modular

```
├── Core Module          → Orquestador, agentes, flujos, detección de intenciones
├── LLM Module           → Adaptadores para OpenAI/LocalAI (extensible)
├── Webhooks Module      → Integración con Twilio (WhatsApp/SMS)
├── Firebase Module      → Persistencia con Firestore
└── Business Module      → Configuración de agentes y reglas de negocio
```

## 🚀 Stack Tecnológico

**Backend & Framework**

- NestJS 11.0 (TypeScript)
- Node.js
- Docker

**Inteligencia Artificial**

- OpenAI API (GPT-4)
- LocalAI (modelos locales)
- NLP para detección de intenciones

**Integraciones**

- Twilio (WhatsApp, SMS)
- Firebase/Firestore (base de datos)

**Herramientas**

- ESLint, Prettier (calidad de código)
- Jest (testing)

## 🎯 Funcionalidades Destacadas

### 1. Detección Inteligente de Intenciones

Sistema que analiza mensajes del usuario y determina:

- Tipo de consulta (horarios, ubicaciones, servicios, precios)
- Agente apropiado para responder
- Contexto de la conversación

### 2. Sistema de Agentes Especializados

Factory que crea agentes según el contexto:

- **Business Agent**: Responde con información del negocio configurada
- **Default Agent**: Conversaciones generales y FAQ
- Arquitectura extensible para nuevos tipos de agentes

### 3. Gestión de Contexto Conversacional

Sistema que mantiene:

- Historial de conversación por usuario
- Sesiones persistentes en Firestore
- Metadata y preferencias del usuario

### 4. Adaptadores Intercambiables de LLM

Abstracción que permite cambiar fácilmente entre:

- OpenAI (GPT-4)
- LocalAI (modelos locales)
- Cualquier otro proveedor (extensible)

## 📦 Instalación y Ejecución

```bash
# Instalar dependencias
yarn install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
yarn start:dev

# Ejecutar en producción
yarn build && yarn start:prod

# Docker
docker build -t ai-agents .
docker run -p 3000:3000 ai-agents
```

### Variables de Entorno Requeridas

```env
PORT=3000
OPENAI_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
FIREBASE_PROJECT_ID=your_project
```

## 🔄 Flujo de Conversación

```
Usuario (WhatsApp)
    ↓
Twilio Webhook
    ↓
Conversation Orchestrator
    ├─ Session Service (recupera/crea sesión)
    ├─ Intent Detector (identifica intención)
    ├─ Agent Factory (selecciona agente apropiado)
    └─ LLM Adapter (genera respuesta contextual)
    ↓
Firestore (persiste estado)
    ↓
Usuario recibe respuesta
```

## 💡 Casos de Uso Implementados

- **Detección de Intenciones**: Identifica automáticamente qué busca el usuario
- **Consultas de Información**: Horarios de atención, ubicaciones de sedes, servicios disponibles
- **Respuestas Contextuales**: El LLM responde basándose en la configuración del negocio
- **FAQ Automatizado**: Respuestas inteligentes a preguntas frecuentes
- **Persistencia de Conversaciones**: Historial completo guardado en Firestore

## 🧪 Testing

```bash
yarn test          # Tests unitarios
yarn test:e2e      # Tests end-to-end
yarn test:cov      # Cobertura
```

## 📊 Resultados Técnicos

- ✅ Arquitectura modular y escalable con NestJS
- ✅ Diseño orientado a interfaces (SOLID principles)
- ✅ Adaptadores intercambiables de LLM
- ✅ Gestión de estado con máquinas de estados
- ✅ Persistencia en tiempo real con Firestore
- ✅ Dockerizado para despliegue en cualquier plataforma

## 🚧 En Desarrollo

### Funcionalidades actuales

- ✅ Sistema de agentes con Factory Pattern
- ✅ Integración WhatsApp vía Twilio
- ✅ Detección automática de intenciones
- ✅ Respuestas contextuales basadas en información del negocio
- ✅ Gestión de sesiones y contexto
- ✅ Persistencia en Firestore
- ✅ Adaptadores para OpenAI y LocalAI

### Próximas implementaciones

- 🔄 **Flujos conversacionales complejos**: Máquinas de estado para procesos multi-paso (agendamiento, formularios)
- 🔄 **Extracción estructurada de datos**: Captura y validación de información específica de mensajes
- 🔄 **Validación de entidades**: Nombres, fechas, números de teléfono, emails
- 🔄 Dashboard web de administración y configuración
- 🔄 Métricas y analytics de conversaciones
- 🔄 Sistema de escalamiento a agentes humanos
- 🔄 Integración con más plataformas (Telegram, Discord)

## 📄 Licencia

MIT License - Copyright (c) 2025 arzidev

---

**Desarrollado por**: [arzidev](https://github.com/arzidev)
