"use client"

import type { ReactNode } from "react"
import { Footer } from "@/app/components/layout/footer"
import { PageHeader } from "@/app/components/layout/page-header"
import { GlobalLogo } from "@/app/components/ui/global-logo"

interface PageLayoutProps {
  title: string
  description?: string
  children: ReactNode
  showLogo?: boolean
  headerContent?: ReactNode
  alertContent?: ReactNode
}

export function PageLayout({
  title,
  description,
  children,
  showLogo = true,
  headerContent,
  alertContent,
}: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            {showLogo && (
              <div className="flex justify-center mb-6">
                <GlobalLogo size="md" showShadow={true} />
              </div>
            )}
            <PageHeader title={title} description={description}>
              {headerContent}
            </PageHeader>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          {alertContent}
          <div className="yanyu-section">{children}</div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PageLayout
