import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import CloudIntegration from "../components/cloud-integration"
import { RainbowLogo } from "@/app/components/ui/rainbow-logo"

export default function CloudPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center mb-4">
              <RainbowLogo size="lg" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl whitespace-nowrap">
              YanYu Cloud<sup>3</sup> 云服务集成
            </h1>
            <p className="mt-4 text-muted-foreground">将本地Mac服务器与各大云服务商无缝集成，构建混合云架构</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <AlertTitle>对接前须知</AlertTitle>
            <AlertDescription>
              确保您的Mac设备已启用远程登录，并配置了固定IP地址或DHCP保留。所有设备应处于同一网络环境或通过VPN连接。
            </AlertDescription>
          </Alert>

          <div className="yanyu-section">
            <CloudIntegration />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
