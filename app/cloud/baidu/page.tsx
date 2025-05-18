import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cloud } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function BaiduPage() {
  return (
    <PageLayout
      title="百度云服务集成"
      description="将Mac服务器与百度云服务集成，构建混合云架构"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Cloud className="h-4 w-4 text-primary" />
          <AlertTitle>百度云集成</AlertTitle>
          <AlertDescription>百度云提供丰富的云服务，通过集成可以实现本地与云端的无缝协作。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>百度云集成指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cli">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cli" className="yanyu-tab">
                CLI工具
              </TabsTrigger>
              <TabsTrigger value="bos" className="yanyu-tab">
                BOS存储
              </TabsTrigger>
              <TabsTrigger value="bcc" className="yanyu-tab">
                BCC服务器
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cli" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">百度云CLI工具</h3>
              <p className="text-sm text-muted-foreground mb-4">安装和配置百度云命令行工具，管理云资源。</p>
              <CodeDisplay
                code={`# 安装百度云CLI
pip3 install bce-cli

# 配置凭证
bce config

# 测试连接
bce bcc list

# 查看帮助
bce help`}
                language="bash"
                showLineNumbers={true}
                title="百度云CLI命令"
              />
            </TabsContent>

            <TabsContent value="bos" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">BOS对象存储</h3>
              <p className="text-sm text-muted-foreground mb-4">配置BOS对象存储，实现文件备份和共享。</p>
              <CodeDisplay
                code={`# 安装Python SDK
pip3 install bce-python-sdk

# 使用Python SDK上传文件
python3 -c "
import os
from baidubce.services.bos.bos_client import BosClient
from baidubce.auth.credentials import AccessKeyCredentials
from baidubce.bce_client_configuration import BceClientConfiguration

config = BceClientConfiguration(
  credentials=AccessKeyCredentials('your-access-key-id', 'your-secret-access-key'),
  endpoint='bj.bcebos.com'
)
client = BosClient(config)
client.put_object_from_file(
  'your-bucket-name', 
  'remote_file.txt',
  'local_file.txt'
)
print('文件上传成功')
"`}
                language="bash"
                showLineNumbers={true}
                title="BOS命令"
              />
            </TabsContent>

            <TabsContent value="bcc" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">BCC云服务器</h3>
              <p className="text-sm text-muted-foreground mb-4">管理BCC云服务器，实现计算资源扩展。</p>
              <CodeDisplay
                code={`# 查看BCC实例列表
bce bcc list

# 启动实例
bce bcc startInstance --instanceId i-xxxxxxxx

# 停止实例
bce bcc stopInstance --instanceId i-xxxxxxxx

# 创建自定义镜像
bce bcc createImage --instanceId i-xxxxxxxx --imageName "MyImage" --description "My custom image"`}
                language="bash"
                showLineNumbers={true}
                title="BCC命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
