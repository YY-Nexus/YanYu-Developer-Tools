import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Navbar } from "@/app/components/layout/navbar"
import { NavigationProvider } from "@/app/components/ui/navigation-context"
import { GlobalLoader } from "@/app/components/ui/global-loader"
import { BreadcrumbProvider } from "@/app/components/ui/breadcrumb-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YanYu Cloud³ Developer Tools",
  description: "云端开发工具集 - 从基础到高级的递进式指南",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavigationProvider>
            <BreadcrumbProvider>
              <Navbar />
              <GlobalLoader />
              <main className="min-h-[calc(100vh-4rem)]">{children}</main>
              <Toaster />
            </BreadcrumbProvider>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
