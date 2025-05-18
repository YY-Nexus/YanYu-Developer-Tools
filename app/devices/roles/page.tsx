import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Monitor } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { DeviceRoles } from "@/app/components/device-roles"

export default function DeviceRolesPage() {
  return (
    <PageLayout
      title="设备角色与资源分配"
      description="根据不同Mac设备的硬件配置，合理分配角色和任务"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Monitor className="h-4 w-4 text-primary" />
          <AlertTitle>设备角色</AlertTitle>
          <AlertDescription>
            合理分配设备角色可以充分利用每台设备的性能特点，构建高效的开发与部署环境。
          </AlertDescription>
        </Alert>
      }
    >
      <DeviceRoles />
    </PageLayout>
  )
}
