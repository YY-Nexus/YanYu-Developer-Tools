import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Cloud } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function AliyunPage() {
  return (
    <PageLayout
      title="阿里云服务集成"
      description="将Mac服务器与阿里云服务集成，构建混合云架构"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Cloud className="h-4 w-4 text-primary" />
          <AlertTitle>阿里云集成</AlertTitle>
          <AlertDescription>阿里云提供丰富的云服务，通过集成可以实现本地与云端的无缝协作。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>阿里云集成指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cli">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cli" className="yanyu-tab">
                CLI工具
              </TabsTrigger>
              <TabsTrigger value="oss" className="yanyu-tab">
                OSS存储
              </TabsTrigger>
              <TabsTrigger value="ecs" className="yanyu-tab">
                ECS服务器
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cli" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">阿里云CLI工具</h3>
              <p className="text-sm text-muted-foreground mb-4">安装和配置阿里云命令行工具，管理云资源。</p>
              <CodeDisplay
                code={`# 安装阿里云CLI
brew install aliyun-cli

# 配置凭证
aliyun configure

# 测试连接
aliyun ecs DescribeRegions

# 查看帮助
aliyun help`}
                language="bash"
                showLineNumbers={true}
                title="阿里云CLI命令"
              />
            </TabsContent>

            <TabsContent value="oss" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">OSS对象存储</h3>
              <p className="text-sm text-muted-foreground mb-4">配置OSS对象存储，实现文件备份和共享。</p>
              <CodeDisplay
                code={`# 安装OSS工具
brew install ossutil

# 配置OSS访问凭证
ossutil64 config -e oss-cn-hangzhou.aliyuncs.com -i AccessKeyID -k AccessKeySecret

# 上传文件
ossutil64 cp local_file.txt oss://your-bucket-name/

# 下载文件
ossutil64 cp oss://your-bucket-name/remote_file.txt local_file.txt

# 同步目录
ossutil64 sync local_dir oss://your-bucket-name/remote_dir`}
                language="bash"
                showLineNumbers={true}
                title="OSS命令"
              />
            </TabsContent>

            <TabsContent value="ecs" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">ECS云服务器</h3>
              <p className="text-sm text-muted-foreground mb-4">管理ECS云服务器，实现计算资源扩展。</p>
              <CodeDisplay
                code={`# 查看ECS实例列表
aliyun ecs DescribeInstances

# 启动实例
aliyun ecs StartInstance --InstanceId i-bp67acfmxazb4ph***

# 停止实例
aliyun ecs StopInstance --InstanceId i-bp67acfmxazb4ph***

# 创建自定义镜像
aliyun ecs CreateImage --InstanceId i-bp67acfmxazb4ph*** --ImageName "MyImage" --ImageVersion "1.0" --Description "My custom image"`}
                language="bash"
                showLineNumbers={true}
                title="ECS命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
