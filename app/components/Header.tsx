import Link from "next/link"
import { UserCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          HealthGuard AI
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-secondary hover:text-primary">
            Dashboard
          </Link>
          <Link href="/claims" className="text-secondary hover:text-primary">
            Claims
          </Link>
          <Link href="/reports" className="text-secondary hover:text-primary">
            Reports
          </Link>
          <Link href="/resources" className="text-secondary hover:text-primary">
            Resources
          </Link>
          <UserCircle className="text-secondary hover:text-primary cursor-pointer" />
        </div>
      </nav>
    </header>
  )
}

