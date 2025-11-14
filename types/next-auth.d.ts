import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      role: string
      dog: {
        id: string
        name: string
        breed: string
        level: number
        xp: number
        avatar?: string
      } | null
    }
  }

  interface User {
    id: string
    email: string
    role: string
    dog: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
    dog: any
  }
}

