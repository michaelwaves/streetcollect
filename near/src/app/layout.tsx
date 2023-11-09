import './globals.css'
import type { Metadata } from 'next'
import { Inter, Audiowide, Lilita_One, Ubuntu, Archivo } from 'next/font/google'
import { WalletProvider } from '@/context/WalletProvider'
import Header from '@/components/HeaderSimple'
import { FirebaseUserProvider } from '@/context/FirebaseUserProvider'


const inter = Inter({ subsets: ['latin'] })
const lilita = Lilita_One({ subsets: ['latin'], weight: ["400"], variable: "--font-lilita" })
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ["400"], variable: "--font-ubuntu" })
const audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-audiowide" })
const archivo = Archivo({ subsets: ['latin'], weight: ["400"], variable: "--font-archivo" })

export const metadata: Metadata = {
  title: 'Trademint',
  description: 'The Cool Patent Marketplace',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lilita.variable} ${ubuntu.variable} ${audiowide.variable} ${archivo.variable}`}>
        <WalletProvider>
          <FirebaseUserProvider>
            <Header />
            {children}
          </FirebaseUserProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
