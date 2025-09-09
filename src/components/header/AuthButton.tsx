'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Routes, Pages } from '@/constants/enums'
import Link from '../link'
import { Button, buttonVariants } from '../ui/button'
import { User, LogOut, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { performLogout, forceLogoutRedirect } from '@/lib/auth-utils'

const AuthButton = () => {
  const { data: session, status } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSignOut = async () => {
    try {
      // Close dropdown first
      setShowDropdown(false);
      
      // Show loading state
      toast.loading('Signing out...');
      
      // Use comprehensive logout utility
      await performLogout({
        redirect: false,
        callbackUrl: '/',
      });
      
      // Show success message
      toast.success('Signed out successfully!');
      
      // Force clean redirect
      forceLogoutRedirect('/');
      
    } catch (error) {
      toast.error('Error signing out');
      console.error('Sign out error:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
    )
  }

  if (session) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="lg"
          className="px-4 py-2 rounded-full bg-chart-5 text-background hover:text-background hover:bg-chart-1 flex items-center gap-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{session.user?.name || 'User'}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
              <p className="text-xs text-gray-500">{session.user?.email}</p>
            </div>
            <div className="py-1">
              <Link
                href={`/${Routes.PROFILE}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                <User className="w-4 h-4 inline mr-2" />
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Backdrop to close dropdown */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    )
  }

  return (
    <Link
      href={`/${Routes.AUTH}/${Pages.LOGIN}`}
      className={`${buttonVariants({ size: 'lg', variant: 'outline' })} !px-8 !rounded-full bg-chart-5 text-background hover:text-background hover:bg-chart-1 font-semibold`}
    >
      Login
    </Link>
  )
}

export default AuthButton
