import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import BasicSetup from "../components/basic-setup"
import { PageHeader } from "@/app/components/layout/page-header"

export default function BasicPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="基础环境准备" description="安装必要的开发工具和软件，为后续配置奠定基础" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Terminal className="h-4 w-4 text-primary" />
            <AlertTitle>前置条件</AlertTitle>
            <AlertDescription>确保您的Mac已更新至最新的macOS版本，并且拥有管理员权限。</AlertDescription>
          </Alert>

          <div className="yanyu-section">
            <BasicSetup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
