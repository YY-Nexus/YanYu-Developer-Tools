import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HardDrive } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function DeviceStoragePage() {
  return (
    <PageLayout
      title="存储设备管理"
      description="管理Mac设备的存储资源，优化存储性能和空间利用"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <HardDrive className="h-4 w-4 text-primary" />
          <AlertTitle>存储管理</AlertTitle>
          <AlertDescription>合理管理存储资源可以提高系统性能，延长设备寿命，并确保数据安全。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>存储管理指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="disk-info">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="disk-info" className="yanyu-tab">
                磁盘信息
              </TabsTrigger>
              <TabsTrigger value="partition" className="yanyu-tab">
                分区管理
              </TabsTrigger>
              <TabsTrigger value="performance" className="yanyu-tab">
                性能优化
              </TabsTrigger>
            </TabsList>

            <TabsContent value="disk-info" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">查看磁盘信息</h3>
              <p className="text-sm text-muted-foreground mb-4">查看Mac设备的磁盘信息，了解存储设备状态。</p>
              <CodeDisplay
                code={`# 查看磁盘列表
diskutil list

# 查看磁盘使用情况
df -h

# 查看详细磁盘信息
system_profiler SPStorageDataType`}
                language="bash"
                showLineNumbers={true}
                title="磁盘信息命令"
              />
            </TabsContent>

            <TabsContent value="partition" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">分区管理</h3>
              <p className="text-sm text-muted-foreground mb-4">管理磁盘分区，合理规划存储空间。</p>
              <CodeDisplay
                code={`# 创建新分区（请谨慎操作）
diskutil partitionDisk /dev/disk2 1 GPT APFS "Data" 100%

# 挂载分区
diskutil mount /dev/disk2s1

# 卸载分区
diskutil unmount /dev/disk2s1`}
                language="bash"
                showLineNumbers={true}
                title="分区管理命令"
              />
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">存储性能优化</h3>
              <p className="text-sm text-muted-foreground mb-4">优化存储设备性能，提高读写速度。</p>
              <CodeDisplay
                code={`# 清理系统缓存
sudo purge

# 验证磁盘
diskutil verifyVolume /dev/disk1s1

# 修复磁盘权限
sudo diskutil repairPermissions /`}
                language="bash"
                showLineNumbers={true}
                title="性能优化命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
