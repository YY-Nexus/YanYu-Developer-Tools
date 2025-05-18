import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function ServerSecurityPage() {
  return (
    <PageLayout
      title="服务器安全配置"
      description="配置Mac服务器的安全策略，保护服务器免受攻击"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertTitle>安全配置</AlertTitle>
          <AlertDescription>服务器安全是系统稳定运行的基础，建议定期更新安全策略并进行安全审计。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>安全配置指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="firewall">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="firewall" className="yanyu-tab">
                防火墙
              </TabsTrigger>
              <TabsTrigger value="ssh" className="yanyu-tab">
                SSH安全
              </TabsTrigger>
              <TabsTrigger value="users" className="yanyu-tab">
                用户安全
              </TabsTrigger>
            </TabsList>

            <TabsContent value="firewall" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">防火墙配置</h3>
              <p className="text-sm text-muted-foreground mb-4">配置Mac内置防火墙，控制网络访问权限。</p>
              <CodeDisplay
                code={`# 启用防火墙
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# 启用防火墙日志
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setloggingmode on

# 允许特定应用通过防火墙
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/Docker.app`}
                language="bash"
                showLineNumbers={true}
                title="防火墙配置命令"
              />
            </TabsContent>

            <TabsContent value="ssh" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">SSH安全配置</h3>
              <p className="text-sm text-muted-foreground mb-4">加强SSH服务安全，防止未授权访问。</p>
              <CodeDisplay
                code={`# 编辑SSH配置文件
sudo nano /etc/ssh/sshd_config

# 推荐的安全配置
# 禁用密码认证，只允许密钥认证
PasswordAuthentication no
# 禁用root登录
PermitRootLogin no
# 限制SSH版本
Protocol 2
# 修改默认端口（可选）
Port 2222

# 重启SSH服务
sudo launchctl unload /System/Library/LaunchDaemons/ssh.plist
sudo launchctl load /System/Library/LaunchDaemons/ssh.plist`}
                language="bash"
                showLineNumbers={true}
                title="SSH安全配置命令"
              />
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">用户安全管理</h3>
              <p className="text-sm text-muted-foreground mb-4">管理系统用户，控制访问权限。</p>
              <CodeDisplay
                code={`# 创建新用户
sudo dscl . -create /Users/serveruser
sudo dscl . -create /Users/serveruser UserShell /bin/bash
sudo dscl . -create /Users/serveruser RealName "Server User"
sudo dscl . -create /Users/serveruser UniqueID 1001
sudo dscl . -create /Users/serveruser PrimaryGroupID 1000
sudo dscl . -create /Users/serveruser NFSHomeDirectory /Users/serveruser
sudo dscl . -passwd /Users/serveruser password

# 添加到管理员组
sudo dscl . -append /Groups/admin GroupMembership serveruser

# 查看用户列表
dscl . -list /Users`}
                language="bash"
                showLineNumbers={true}
                title="用户管理命令"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
