#!/bin/bash

echo "🐕 DogDogGo - Configuración de Base de Datos"
echo "=========================================="
echo ""
echo "Elige una opción:"
echo ""
echo "1. Vercel Postgres (Recomendado - Gratis en la nube)"
echo "2. PostgreSQL Local (Requiere PostgreSQL instalado)"
echo "3. Salir"
echo ""
read -p "Opción [1-3]: " option

case $option in
  1)
    echo ""
    echo "📦 Configurando Vercel Postgres..."
    echo ""
    echo "Paso 1: Instalando Vercel CLI..."
    npm install -g vercel
    
    echo ""
    echo "Paso 2: Inicia sesión en Vercel (se abrirá tu navegador)..."
    vercel login
    
    echo ""
    echo "Paso 3: Vinculando proyecto..."
    vercel link
    
    echo ""
    echo "🌐 IMPORTANTE: Ahora ve a tu navegador:"
    echo "   1. https://vercel.com/dashboard"
    echo "   2. Abre tu proyecto 'dogdoggo'"
    echo "   3. Ve a Storage → Create Database → Postgres"
    echo "   4. Click en 'Create' y espera 30 segundos"
    echo ""
    read -p "Presiona ENTER cuando hayas creado la base de datos..."
    
    echo ""
    echo "Paso 4: Descargando variables de entorno..."
    vercel env pull .env.local
    
    echo ""
    echo "Paso 5: Creando tablas..."
    npx prisma db push
    
    echo ""
    echo "✅ ¡Listo! Ejecuta: npm run dev"
    ;;
    
  2)
    echo ""
    echo "📦 Configurando PostgreSQL Local..."
    echo ""
    
    # Verificar si PostgreSQL está instalado
    if ! command -v psql &> /dev/null; then
      echo "❌ PostgreSQL no está instalado"
      echo ""
      echo "Instálalo con:"
      echo "  macOS: brew install postgresql@15"
      echo "  Ubuntu: sudo apt install postgresql"
      echo ""
      exit 1
    fi
    
    echo "✅ PostgreSQL encontrado"
    echo ""
    read -p "Usuario de PostgreSQL [postgres]: " pg_user
    pg_user=${pg_user:-postgres}
    
    read -sp "Contraseña de PostgreSQL: " pg_pass
    echo ""
    
    echo "Creando archivo .env.local..."
    cat > .env.local << EOF
DATABASE_URL="postgresql://${pg_user}:${pg_pass}@localhost:5432/dogdoggo"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="desarrollo-local-secret"
EOF
    
    echo "Creando base de datos 'dogdoggo'..."
    createdb dogdoggo 2>/dev/null || echo "Base de datos ya existe"
    
    echo ""
    echo "Creando tablas..."
    npx prisma db push
    
    echo ""
    echo "✅ ¡Listo! Ejecuta: npm run dev"
    ;;
    
  3)
    echo "Saliendo..."
    exit 0
    ;;
    
  *)
    echo "Opción inválida"
    exit 1
    ;;
esac

