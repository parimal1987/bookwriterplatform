import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './header'
import { Fragment } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <Header />
      <div className="container mt-2">
        {children}
      </div>
    </Fragment>
  )
}
