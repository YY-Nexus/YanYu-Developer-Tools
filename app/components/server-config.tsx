"use client"

import { useState } from "react"
import { Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Steps, Step, type StepAction } from "./steps"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// 预设步骤操作
const stepActions: Record<string, StepAction> = {
  "network-static-ip": {
    id: "network-static-ip",
    title: "复制静态IP配置命令",
    command:
      'networksetup -listallnetworkservices && sudo networksetup -setmanual "Wi-Fi" 192.168.1.100 255.255.255.0 192.168.1.1',
    description: "此命令将列出所有网络接口，并为Wi-Fi接口设置静态IP",
  },
  "network-hostname": {
    id: "network-hostname",
    title: "复制主机名配置命令",
    command:
      "sudo scutil --set HostName mac-server && sudo scutil --set LocalHostName mac-server && sudo scutil --set ComputerName mac-server",
    description: "此命令将设置系统的主机名、本地主机名和计算机名",
  },
  "network-ssh": {
    id: "network-ssh",
    title: "复制SSH启用命令",
    command: "sudo systemsetup -setremotelogin on",
    description: "此命令将启用SSH远程登录服务",
  },
  "security-firewall": {
    id: "security-firewall",
    title: "复制防火墙配置命令",
    command:
      "sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on && sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/Docker.app",
    description: "此命令将启用macOS内置防火墙，并允许Docker应用通过防火墙",
  },
  "security-user": {
    id: "security-user",
    title: "复制用户创建命令",
    command:
      'sudo dscl . -create /Users/serveruser && sudo dscl . -create /Users/serveruser UserShell /bin/bash && sudo dscl . -create /Users/serveruser RealName "Server User" && sudo dscl . -create /Users/serveruser UniqueID 1001 && sudo dscl . -create /Users/serveruser PrimaryGroupID 1000 && sudo dscl . -create /Users/serveruser NFSHomeDirectory /Users/serveruser && sudo dscl . -passwd /Users/serveruser password && sudo dscl . -append /Groups/admin GroupMembership serveruser',
    description: "此命令将创建一个名为serveruser的新用户，并将其添加到管理员组",
  },
  "security-ssh-key": {
    id: "security-ssh-key",
    title: "复制SSH密钥配置命令",
    command: 'ssh-keygen -t ed25519 -C "your_email@example.com" && ssh-copy-id serveruser@mac-server',
    description: "此命令将生成SSH密钥，并将公钥复制到服务器",
  },
  "performance-sysctl": {
    id: "performance-sysctl",
    title: "复制系统参数优化命令",
    command:
      "echo 'kern.maxfiles=65536' | sudo tee -a /etc/sysctl.conf && echo 'kern.maxfilesperproc=32768' | sudo tee -a /etc/sysctl.conf && sudo sysctl -w kern.maxfiles=65536 && sudo sysctl -w kern.maxfilesperproc=32768",
    description: "此命令将增加系统最大文件描述符数量，提高服务器性能",
  },
  "performance-maintenance": {
    id: "performance-maintenance",
    title: "复制维护脚本创建命令",
    command:
      "cat > ~/maintenance.sh << 'EOF'\n#!/bin/bash\n# 清理系统缓存\nsudo purge\n# 运行系统维护脚本\nsudo periodic daily weekly monthly\nEOF\n\nchmod +x ~/maintenance.sh\n\n(crontab -l 2>/dev/null; echo \"0 3 * * * ~/maintenance.sh\") | crontab -",
    description: "此命令将创建一个系统维护脚本，并设置为每天凌晨3点自动运行",
  },
  "performance-monitor": {
    id: "performance-monitor",
    title: "复制监控工具安装命令",
    command: "brew install htop glances && glances -w",
    description: "此命令将安装htop和glances监控工具，并启动glances的Web界面",
  },
}

// 使用默认导出
export default function ServerConfig() {
  const [activeTab, setActiveTab] = useState("network")
  const [actionDialog, setActionDialog] = useState<{ open: boolean; action: StepAction | null }>({
    open: false,
    action: null,
  })

  const handleStepAction = (action: StepAction) => {
    setActionDialog({
      open: true,
      action,
    })
  }

  const executeAction = () => {
    if (actionDialog.action?.command) {
      navigator.clipboard.writeText(actionDialog.action.command)
      toast({
        title: "命令已复制到剪贴板",
        description: "您可以在终端中粘贴并执行此命令",
      })
    }
    setActionDialog({ open: false, action: null })
  }

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>2.1 服务器基础配置</h3>
        <p>本章将指导您如何将Mac M4配置为功能完善的本地服务器，包括网络设置、安全配置和性能优化。</p>
      </div>

      <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle>服务器角色</AlertTitle>
        <AlertDescription>Mac M4将作为主服务器，负责代码存储、构建和部署流程管理。</AlertDescription>
      </Alert>

      <Tabs defaultValue="network" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="network">网络配置</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="performance">性能优化</TabsTrigger>
        </TabsList>

        <TabsContent value="network" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="配置静态IP" action={stepActions["network-static-ip"]}>
              <p className="text-sm text-muted-foreground mb-2">为Mac M4设置静态IP地址，确保服务器地址稳定。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 查看当前网络接口
                <br />
                networksetup -listallnetworkservices
                <br />
                <br /># 设置静态IP（以Wi-Fi为例）
                <br />
                sudo networksetup -setmanual "Wi-Fi" 192.168.1.100 255.255.255.0 192.168.1.1
              </div>
            </Step>

            <Step number={2} title="配置主机名" action={stepActions["network-hostname"]}>
              <p className="text-sm text-muted-foreground mb-2">设置易记的主机名，方便网络访问。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                sudo scutil --set HostName mac-server
                <br />
                sudo scutil --set LocalHostName mac-server
                <br />
                sudo scutil --set ComputerName mac-server
              </div>
            </Step>

            <Step number={3} title="启用远程登录" action={stepActions["network-ssh"]}>
              <p className="text-sm text-muted-foreground mb-2">启用SSH服务，允许远程登录到服务器。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">sudo systemsetup -setremotelogin on</div>
              <p className="text-sm mt-2">可以通过系统偏好设置 → 共享 → 远程登录来启用此功能。</p>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="配置防火墙" action={stepActions["security-firewall"]}>
              <p className="text-sm text-muted-foreground mb-2">启用macOS内置防火墙，增强服务器安全性。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 启用防火墙
                <br />
                sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
                <br />
                <br /># 允许特定应用通过防火墙
                <br />
                sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /Applications/Docker.app
              </div>
            </Step>

            <Step number={2} title="创建专用用户" action={stepActions["security-user"]}>
              <p className="text-sm text-muted-foreground mb-2">创建专用服务账户，避免使用管理员账户运行服务。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                sudo dscl . -create /Users/serveruser
                <br />
                sudo dscl . -create /Users/serveruser UserShell /bin/bash
                <br />
                sudo dscl . -create /Users/serveruser RealName "Server User"
                <br />
                sudo dscl . -create /Users/serveruser UniqueID 1001
                <br />
                sudo dscl . -create /Users/serveruser PrimaryGroupID 1000
                <br />
                sudo dscl . -create /Users/serveruser NFSHomeDirectory /Users/serveruser
                <br />
                sudo dscl . -passwd /Users/serveruser password
                <br />
                sudo dscl . -append /Groups/admin GroupMembership serveruser
              </div>
            </Step>

            <Step number={3} title="配置SSH密钥认证" action={stepActions["security-ssh-key"]}>
              <p className="text-sm text-muted-foreground mb-2">设置SSH密钥认证，提高安全性并简化登录过程。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 在客户端生成SSH密钥
                <br />
                ssh-keygen -t ed25519 -C "your_email@example.com"
                <br />
                <br /># 将公钥复制到服务器
                <br />
                ssh-copy-id serveruser@mac-server
              </div>
            </Step>
          </Steps>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Steps onStepAction={handleStepAction}>
            <Step number={1} title="调整系统参数" action={stepActions["performance-sysctl"]}>
              <p className="text-sm text-muted-foreground mb-2">优化系统参数，提高服务器性能。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 增加最大文件描述符数量
                <br />
                {"echo 'kern.maxfiles=65536' | sudo tee -a /etc/sysctl.conf"}
                <br />
                {"echo 'kern.maxfilesperproc=32768' | sudo tee -a /etc/sysctl.conf"}
                <br />
                <br /># 应用更改
                <br />
                sudo sysctl -w kern.maxfiles=65536
                <br />
                sudo sysctl -w kern.maxfilesperproc=32768
              </div>
            </Step>

            <Step number={2} title="配置自动维护" action={stepActions["performance-maintenance"]}>
              <p className="text-sm text-muted-foreground mb-2">设置定期维护任务，保持系统性能。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 创建维护脚本
                <br />
                {"cat > ~/maintenance.sh << 'EOF'"}
                <br />
                #!/bin/bash
                <br /># 清理系统缓存
                <br />
                sudo purge
                <br /># 运行系统维护脚本
                <br />
                sudo periodic daily weekly monthly
                <br />
                {"EOF"}
                <br />
                <br /># 设置执行权限
                <br />
                chmod +x ~/maintenance.sh
                <br />
                <br /># 添加到crontab
                <br />
                {'(crontab -l 2>/dev/null; echo "0 3 * * * ~/maintenance.sh") | crontab -'}
              </div>
            </Step>

            <Step number={3} title="监控系统资源" action={stepActions["performance-monitor"]}>
              <p className="text-sm text-muted-foreground mb-2">安装监控工具，实时监控系统资源使用情况。</p>
              <div className="bg-muted p-3 rounded text-sm font-mono">
                # 安装监控工具
                <br />
                brew install htop glances
                <br />
                <br /># 使用glances启动Web监控界面
                <br />
                glances -w
              </div>
              <p className="text-sm mt-2">安装完成后，可以通过浏览器访问 http://mac-server:61208 查看系统监控信息。</p>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>

      <div className="prose max-w-none">
        <h4>下一步</h4>
        <p>完成服务器基础配置后，我们将在下一章节搭建Git服务，为代码管理和版本控制奠定基础。</p>
      </div>

      {/* 操作对话框 */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionDialog.action?.title || "执行操作"}</DialogTitle>
            <DialogDescription>{actionDialog.action?.description || "您即将执行此操作，请确认。"}</DialogDescription>
          </DialogHeader>

          {actionDialog.action?.command && (
            <div className="bg-muted p-3 rounded text-sm font-mono my-4 max-h-60 overflow-y-auto">
              {actionDialog.action.command.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setActionDialog({ open: false, action: null })}>
              取消
            </Button>
            <Button onClick={executeAction}>复制命令</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
