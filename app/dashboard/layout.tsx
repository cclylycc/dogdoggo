import { ReactNode } from 'react'
import BottomNav from '@/components/BottomNav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
      <BottomNav />
    </div>
  )
}

