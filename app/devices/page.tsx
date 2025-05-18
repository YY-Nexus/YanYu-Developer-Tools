import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Laptop } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { DeviceRoles } from "@/app/components/device-roles"
import { PageHeader } from "@/app/components/layout/page-header"

export default function DevicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="设备角色与资源分配" description="根据不同Mac设备的硬件配置，合理分配角色和任务" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Laptop className="h-4 w-4 text-primary" />
            <AlertTitle>设备要求</AlertTitle>
            <AlertDescription>
              本指南适用于拥有多台Mac设备的用户，如果您只有一台设备，可以根据实际情况调整配置。
            </AlertDescription>
          </Alert>

          <div className="yanyu-section">
            <DeviceRoles />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
