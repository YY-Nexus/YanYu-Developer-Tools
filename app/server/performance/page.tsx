import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HardDrive } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function ServerPerformancePage() {
  return (
    <PageLayout
      title="服务器性能优化"
      description="优化Mac服务器性能，提高服务响应速度和稳定性"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <HardDrive className="h-4 w-4 text-primary" />
          <AlertTitle>性能优化</AlertTitle>
          <AlertDescription>合理的性能优化可以充分发挥服务器硬件性能，提高系统稳定性和响应速度。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>性能优化指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="system">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="system" className="yanyu-tab">
                系统参数
              </TabsTrigger>
              <TabsTrigger value="memory" className="yanyu-tab">
                内存优化
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="yanyu-tab">
                性能监控
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">系统参数优化</h3>
              <p className="text-sm text-muted-foreground mb-4">调整系统内核参数，提高服务器性能。</p>
              <CodeDisplay
                code={`# 增加文件描述符限制
echo 'kern.maxfiles=65536' | sudo tee -a /etc/sysctl.conf
echo 'kern.maxfilesperproc=32768' | sudo tee -a /etc/sysctl.conf

# 应用更改
sudo sysctl -w kern.maxfiles=65536
sudo sysctl -w kern.maxfilesperproc=32768

# 查看当前设置
sysctl kern.maxfiles kern.maxfilesperproc`}
                language="bash"
                showLineNumbers={true}
                title="系统参数优化命令"
              />
            </TabsContent>

            <TabsContent value="memory" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">内存优化</h3>
              <p className="text-sm text-muted-foreground mb-4">优化内存使用，提高系统响应速度。</p>
              <CodeDisplay
                code={`# 清理系统缓存
sudo purge

# 查看内存使用情况
vm_stat

# 查看进程内存使用
top -o mem

# 限制特定进程的内存使用（示例）
sudo launchctl limit maxproc 2048 2048`}
                language="bash"
                showLineNumbers={true}
                title="内存优化命令"
              />
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">性能监控工具</h3>
              <p className="text-sm text-muted-foreground mb-4">安装和使用性能监控工具，实时监控系统状态。</p>
              <CodeDisplay
                code={`# 安装监控工具
brew install htop glances

# 使用htop监控系统
htop

# 使用glances启动Web监控界面
glances -w

# 安装Prometheus监控系统
brew install prometheus

# 安装Grafana可视化工具
brew install grafana`}
                language="bash"
                showLineNumbers={true}
                title="性能监控命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
