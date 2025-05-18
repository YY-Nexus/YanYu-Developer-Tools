import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Network } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function DeviceNetworkPage() {
  return (
    <PageLayout
      title="设备网络配置"
      description="配置Mac设备的网络连接，实现设备间的高效通信"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Network className="h-4 w-4 text-primary" />
          <AlertTitle>网络配置</AlertTitle>
          <AlertDescription>良好的网络配置是设备间高效通信的基础，建议为服务器设备配置静态IP地址。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>网络配置指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="static-ip">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="static-ip" className="yanyu-tab">
                静态IP配置
              </TabsTrigger>
              <TabsTrigger value="hostname" className="yanyu-tab">
                主机名设置
              </TabsTrigger>
              <TabsTrigger value="dns" className="yanyu-tab">
                DNS配置
              </TabsTrigger>
            </TabsList>

            <TabsContent value="static-ip" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">配置静态IP地址</h3>
              <p className="text-sm text-muted-foreground mb-4">为Mac服务器配置静态IP地址，确保网络地址稳定可靠。</p>
              <CodeDisplay
                code={`# 查看当前网络接口
networksetup -listallnetworkservices

# 设置静态IP（以Wi-Fi为例）
sudo networksetup -setmanual "Wi-Fi" 192.168.1.100 255.255.255.0 192.168.1.1`}
                language="bash"
                showLineNumbers={true}
                title="静态IP配置命令"
              />
            </TabsContent>

            <TabsContent value="hostname" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">设置主机名</h3>
              <p className="text-sm text-muted-foreground mb-4">配置易记的主机名，方便网络访问和识别。</p>
              <CodeDisplay
                code={`# 设置主机名
sudo scutil --set HostName mac-server
sudo scutil --set LocalHostName mac-server
sudo scutil --set ComputerName mac-server

# 验证设置
hostname`}
                language="bash"
                showLineNumbers={true}
                title="主机名配置命令"
              />
            </TabsContent>

            <TabsContent value="dns" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">DNS服务器配置</h3>
              <p className="text-sm text-muted-foreground mb-4">配置DNS服务器，优化网络解析速度。</p>
              <CodeDisplay
                code={`# 设置DNS服务器（以Wi-Fi为例）
sudo networksetup -setdnsservers "Wi-Fi" 8.8.8.8 8.8.4.4

# 查看当前DNS配置
networksetup -getdnsservers "Wi-Fi"`}
                language="bash"
                showLineNumbers={true}
                title="DNS配置命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
