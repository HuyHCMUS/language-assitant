import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import TextWithDictionary from '@/components/common/TextWithDictionary'
// import TextSelectionMenu from '@/components/common/TextSelectionMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'English Assistant',
  description: 'Learn English with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {/* <TextSelectionMenu /> */}
      <TextWithDictionary>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
        </TextWithDictionary>
      </body>
    </html>
  )
}
