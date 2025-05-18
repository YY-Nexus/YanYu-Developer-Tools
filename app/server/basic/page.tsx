import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import BasicSetup from "@/app/components/basic-setup"

export default function ServerBasicPage() {
  return (
    <PageLayout
      title="服务器基础配置"
      description="配置Mac服务器的基础环境，为后续服务部署奠定基础"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Terminal className="h-4 w-4 text-primary" />
          <AlertTitle>基础配置</AlertTitle>
          <AlertDescription>良好的基础配置是服务器稳定运行的保障，建议按照推荐步骤进行配置。</AlertDescription>
        </Alert>
      }
    >
      <BasicSetup />
    </PageLayout>
  )
}
