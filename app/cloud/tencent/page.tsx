import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cloud } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function TencentPage() {
  return (
    <PageLayout
      title="腾讯云服务集成"
      description="将Mac服务器与腾讯云服务集成，构建混合云架构"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Cloud className="h-4 w-4 text-primary" />
          <AlertTitle>腾讯云集成</AlertTitle>
          <AlertDescription>腾讯云提供丰富的云服务，通过集成可以实现本地与云端的无缝协作。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>腾讯云集成指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cli">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cli" className="yanyu-tab">
                CLI工具
              </TabsTrigger>
              <TabsTrigger value="cos" className="yanyu-tab">
                COS存储
              </TabsTrigger>
              <TabsTrigger value="cvm" className="yanyu-tab">
                CVM服务器
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cli" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">腾讯云CLI工具</h3>
              <p className="text-sm text-muted-foreground mb-4">安装和配置腾讯云命令行工具，管理云资源。</p>
              <CodeDisplay
                code={`# 安装腾讯云CLI
pip3 install tccli

# 配置凭证
tccli configure

# 测试连接
tccli cvm DescribeRegions

# 查看帮助
tccli help`}
                language="bash"
                showLineNumbers={true}
                title="腾讯云CLI命令"
              />
            </TabsContent>

            <TabsContent value="cos" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">COS对象存储</h3>
              <p className="text-sm text-muted-foreground mb-4">配置COS对象存储，实现文件备份和共享。</p>
              <CodeDisplay
                code={`# 安装COSCMD工具
pip3 install coscmd

# 配置COS访问凭证
coscmd config -a SecretId -s SecretKey -b bucket-name -r ap-guangzhou

# 上传文件
coscmd upload local_file.txt /remote_file.txt

# 下载文件
coscmd download /remote_file.txt local_file.txt

# 同步目录
coscmd sync -d local_dir /remote_dir`}
                language="bash"
                showLineNumbers={true}
                title="COS命令"
              />
            </TabsContent>

            <TabsContent value="cvm" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">CVM云服务器</h3>
              <p className="text-sm text-muted-foreground mb-4">管理CVM云服务器，实现计算资源扩展。</p>
              <CodeDisplay
                code={`# 查看CVM实例列表
tccli cvm DescribeInstances

# 启动实例
tccli cvm StartInstances --InstanceIds '["ins-xxxxxxxx"]'

# 停止实例
tccli cvm StopInstances --InstanceIds '["ins-xxxxxxxx"]'

# 创建自定义镜像
tccli cvm CreateImage --InstanceId ins-xxxxxxxx --ImageName "MyImage" --ImageDescription "My custom image"`}
                language="bash"
                showLineNumbers={true}
                title="CVM命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
