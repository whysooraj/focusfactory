import type React from "react"
import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import { Chatbot } from "@/components/chatbot/Chatbot"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Focus Factory - We Kill Procrastination",
  description: "Brutal productivity. Structured focus. Execution guaranteed.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Focus Factory',
  },
  formatDetection: {
    telephone: false,
  },
}

const defaultClerkKey = "pk_test_cXVpZXQtY29sdC0xMi5jbGVyay5hY2NvdW50cy5kZXYk"
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || defaultClerkKey

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en" className="dark">
        <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased overflow-x-hidden min-h-screen bg-background text-foreground`}>
          {children}
          <Chatbot />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
