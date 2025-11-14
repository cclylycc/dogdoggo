# 🐾 Pawdona - Red Social Gamificada para Perros

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748)](https://www.prisma.io/)
[![Postgres](https://img.shields.io/badge/DB-PostgreSQL-316192)](https://www.postgresql.org/)

## 🎉 Proyecto Completamente Reescrito

Este proyecto ha sido **reescrito desde cero** para optimización máxima en Vercel.

### Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Base de Datos**: Vercel Postgres (PostgreSQL serverless)
- **ORM**: Prisma (Type-safe)
- **Autenticación**: NextAuth.js
- **UI**: Tailwind CSS + Uiverse.io Components
- **Animaciones**: Framer Motion
- **Gráficos**: Recharts
- **Lenguaje**: TypeScript

---

## ⚡ Inicio Rápido

### Prerequisitos

- Node.js 18+
- Cuenta de Vercel (gratis)
- Git

### Instalación (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Vercel y Base de Datos
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local

# 3. Setup Prisma
npx prisma generate
npx prisma db push

# 4. Iniciar aplicación
npm run dev
```

Abre http://localhost:3000 🎉

---

## 🚀 Deploy en Vercel

### Método Recomendado

1. **Push a GitHub**
   ```bash
   git add .
   git commit -m "feat: Pawdona Next.js"
   git push
   ```

2. **Importar en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - New Project → Import tu repositorio
   - Vercel detecta Next.js automáticamente

3. **Añadir Base de Datos**
   - Storage → Create Database → Postgres
   - Variables de entorno se configuran automáticamente

4. **Deploy**
   - Click "Deploy"
   - ¡Listo en ~2 minutos!

**URL**: `https://tu-proyecto.vercel.app`

---

## 🎨 Características Principales

### 🎮 Gamificación Completa

- Sistema de niveles (1-15+)
- Puntos de experiencia (XP)
- Logros y medallas
- Sistema de progreso
- Estado de ánimo del perro

### 🐕 Emparejamiento Inteligente

- Test de personalidad (5 dimensiones)
- Algoritmo de compatibilidad
- Puntuación de match (0-100%)
- Sugerencias personalizadas para primer encuentro
- Historial de matches

### 📱 Red Social

- Publicaciones con fotos
- Sistema de me gusta y comentarios
- Hashtags
- Feed de actividades
- Perfil personalizado del perro

### 💚 Registro de Salud

- Peso, vacunas, alergias
- Gráficos de tendencias (Recharts)
- Recordatorios automáticos
- Historial completo médico

### 🏃 Sistema de Paseos

- Timer integrado
- Registro de distancia
- Estadísticas detalladas
- Historial de paseos

### 📚 Cursos Educativos

- Comportamiento canino
- Psicología del perro
- Entrenamiento
- Progreso por lección
- Preguntas interactivas

### 🛡️ Panel de Administración

- Gestión de tareas (CRUD)
- Gestión de cursos (CRUD)
- Moderación de contenido
- Estadísticas de la plataforma

---

## 📁 Estructura del Proyecto

```
cursor_h/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Rutas de autenticación
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/         # Rutas protegidas
│   │   ├── dashboard/
│   │   ├── walk/
│   │   ├── match/
│   │   ├── social/
│   │   ├── health/
│   │   ├── achievements/
│   │   └── profile/
│   ├── api/                 # API Routes
│   │   └── auth/
│   ├── layout.tsx
│   ├── page.tsx            # Landing page
│   └── globals.css
├── components/              # Componentes React
│   ├── ui/                 # UI Components
│   └── LandingPage.tsx
├── lib/                     # Utilidades
│   ├── prisma.ts           # Prisma Client
│   ├── auth.ts             # NextAuth Config
│   └── utils.ts
├── prisma/
│   └── schema.prisma       # Database Schema
├── public/                  # Assets estáticos
├── types/                   # TypeScript types
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 UI Components (Uiverse.io Style)

El proyecto incluye componentes inspirados en [Uiverse.io](https://uiverse.io):

### Componentes Disponibles

```tsx
// Botón animado con gradiente
<button className="btn-uiverse">
  <span>Click Me</span>
</button>

// Card con efecto glass
<div className="card-glass p-6">
  <h3>Content</h3>
</div>

// Card con glow effect
<div className="card-glow">
  <h3>Content</h3>
</div>

// Input moderno
<input className="input-modern" />

// Badge 3D
<span className="badge-3d">New</span>

// Progress bar animado
<div className="progress-bar-animated">
  <div className="progress-fill-animated" style={{width: '70%'}} />
</div>

// Avatar con ring gradiente
<div className="avatar-ring">
  <img src="..." alt="Avatar" />
</div>

// Background animado
<div className="bg-animated">
  <h1>Content</h1>
</div>
```

---

## 🗄️ Base de Datos

### Vercel Postgres + Prisma

El proyecto usa **Vercel Postgres** (PostgreSQL serverless) con **Prisma ORM**.

#### Modelos Principales

- `User` - Usuarios
- `Dog` - Perros
- `WalkRecord` - Registros de paseos
- `HealthRecord` - Registros de salud
- `Task` - Tareas
- `Course` - Cursos
- `CourseProgress` - Progreso de cursos
- `Achievement` - Logros
- `UserAchievement` - Logros de usuario
- `Post` - Publicaciones
- `Like`, `Comment` - Interacciones
- `Match` - Emparejamientos
- `Friendship` - Amistades

#### Comandos Prisma

```bash
# Generar cliente
npx prisma generate

# Sincronizar schema con BD
npx prisma db push

# Abrir Prisma Studio (GUI)
npx prisma studio

# Formatear schema
npx prisma format
```

---

## 🔐 Autenticación

### NextAuth.js

El proyecto usa NextAuth.js para autenticación segura.

#### Rutas Protegidas (Server Component)

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login')
  }
  
  return <div>Protected Content</div>
}
```

#### Client Component

```typescript
'use client'
import { useSession } from 'next-auth/react'

export default function ClientComponent() {
  const { data: session } = useSession()
  
  return <div>Hello {session?.user?.dog?.name}</div>
}
```

---

## 📊 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia Next.js dev server
npm run build            # Build de producción
npm run start            # Inicia producción
npm run lint             # ESLint

# Base de Datos
npm run db:push          # Sincroniza schema
npm run db:studio        # Abre Prisma Studio
npm run db:generate      # Genera Prisma Client

# Limpieza
npm run clean            # Elimina archivos antiguos

# Vercel
vercel                   # Deploy preview
vercel --prod            # Deploy producción
vercel env pull          # Descargar env vars
vercel logs              # Ver logs en vivo
```

---

## 🌟 Ventajas sobre MERN Stack

| Aspecto | MERN (Anterior) | Next.js (Actual) |
|---------|-----------------|------------------|
| **Setup** | ~30 minutos | ~5 minutos |
| **Despliegue** | 2 servicios | 1 servicio |
| **Base de Datos** | MongoDB (manual) | Postgres (automático) |
| **Type-Safety** | Parcial | Completo (end-to-end) |
| **Performance** | Client-side | Server Components |
| **Configuración** | Compleja | Automática |
| **CORS** | Necesario | No necesario |
| **Costo** | $0 + setup | $0 + zero-config |

---

## 💰 Costos

### Free Tier

- **Vercel Hosting**: Gratis
  - 100GB bandwidth/mes
  - Despliegues ilimitados
  - Serverless functions

- **Vercel Postgres**: Gratis
  - 60 horas compute/mes
  - 256MB storage
  - 1GB data transfer/mes

**Total: $0.00** ✅

---

## 📚 Documentación

### Archivos de Documentación

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Este archivo |
| `QUICKSTART.md` | Guía de inicio rápido (5 min) |
| `README_NEXTJS.md` | Documentación técnica completa |
| `VERCEL_DEPLOY_NEXTJS.md` | Guía detallada de deploy |
| `PROJECT_SUMMARY.md` | Resumen de cambios |
| `MIGRATION_GUIDE.md` | Guía de migración |

### Recursos Externos

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Uiverse.io](https://uiverse.io)

---

## 🎯 Para el Hackathon

### Puntos a Destacar

1. **Arquitectura Moderna**
   - Next.js 14 con App Router
   - Server Components
   - Type-safe end-to-end

2. **UI Impresionante**
   - Componentes Uiverse.io
   - Animaciones suaves
   - Diseño profesional

3. **Base de Datos Relacional**
   - PostgreSQL con Prisma
   - Queries optimizadas
   - Relaciones complejas

4. **Deploy Profesional**
   - En producción (no localhost)
   - Escalable automáticamente
   - Monitoreo en tiempo real

5. **Funcionalidad Completa**
   - Gamificación
   - Emparejamiento inteligente
   - Red social
   - Gestión de salud
   - Sistema de cursos

### Demo Flow Sugerido

1. **Landing Page** - UI moderna
2. **Registro** - Proceso en 2 pasos
3. **Dashboard** - Gamificación visible
4. **Emparejamiento** - Test y matches
5. **Paseo** - Timer en vivo
6. **Social** - Feed de publicaciones
7. **Salud** - Gráficos de datos
8. **Admin** - Panel de gestión

---

## 🐛 Solución de Problemas

### Error: Prisma Client not generated

```bash
npx prisma generate
```

### Error: Cannot connect to database

```bash
vercel env pull .env.local
```

### Error: Build fails on Vercel

1. Verifica que Vercel Postgres esté añadido
2. Revisa que `postinstall` ejecute `prisma generate`
3. Chequea los logs en Vercel Dashboard

### Error: Module not found

```bash
rm -rf node_modules .next
npm install
```

---

## 🤝 Contribuir

Este es un proyecto de hackathon. Si quieres contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto fue creado para Madrid Hackathon 2025.

---

## 🙏 Agradecimientos

- **Next.js Team** - Por el framework increíble
- **Vercel** - Por el hosting y base de datos gratis
- **Prisma** - Por el ORM type-safe
- **Uiverse.io** - Por la inspiración de UI

---

## 📧 Contacto

Para preguntas o soporte:
- GitHub Issues
- Documentación en el proyecto

---

## ✨ Características Destacadas

- ✅ **100% TypeScript**
- ✅ **Type-Safe** (Prisma + Zod)
- ✅ **Server Components**
- ✅ **Responsive Design**
- ✅ **Animaciones Fluidas**
- ✅ **PostgreSQL Relational**
- ✅ **NextAuth Authentication**
- ✅ **Prisma Studio GUI**
- ✅ **Vercel Edge Functions**
- ✅ **Zero-Config Deploy**

---

**Hecho con ❤️ para los amigos perrunos** 🐕

**Madrid Hackathon 2025** 🏆
