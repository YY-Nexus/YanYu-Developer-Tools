import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Server } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import ServerConfig from "../components/server-config"
import { PageHeader } from "@/app/components/layout/page-header"

export default function ServerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader
              title="服务器基础配置"
              description="将Mac M4配置为功能完善的本地服务器，包括网络设置、安全配置和性能优化"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Server className="h-4 w-4 text-primary" />
            <AlertTitle>服务器角色</AlertTitle>
            <AlertDescription>Mac M4将作为主服务器，负责代码存储、构建和部署流程管理。</AlertDescription>
          </Alert>

          <div className="yanyu-section">
            <ServerConfig />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
