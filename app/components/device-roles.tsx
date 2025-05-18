"use client"

import { useState } from "react"
import { Laptop, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CodeDisplay from "./code-display"
import CommandHelper from "./command-helper"

export function DeviceRoles() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  const deviceCommands = {
    "mac-m4": {
      performance: `sudo sysctl -w kern.maxfiles=524288
sudo sysctl -w kern.maxfilesperproc=262144`,
      network: `sudo networksetup -setv6off Wi-Fi
sudo ifconfig en0 mtu 9000`,
    },
    "imac-m4": {
      tools: `brew install node python go rust docker kubectl
brew install --cask visual-studio-code jetbrains-toolbox`,
      dev: `npm install -g yarn pnpm typescript vercel
pip install virtualenv pipenv`,
    },
    "imac-m1": {
      basic: `brew install git node
brew install --cask visual-studio-code`,
      ssh: `ssh-keygen -t ed25519
ssh-copy-id user@mac-m4-server`,
    },
  }

  const networkSetupCommand = `# 在Mac M4上设置主机名
sudo scutil --set HostName mac-m4-server

# 在其他设备上添加hosts记录
echo "192.168.1.100 mac-m4-server" | sudo tee -a /etc/hosts`

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>1.1 设备角色与资源分配</h3>
        <p>
          本章将指导您如何根据不同Mac设备的硬件配置，合理分配角色和任务，构建高效的开发与部署环境。
          我们将充分利用每台设备的性能特点，打造一个协同工作的本地服务器集群。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`cursor-pointer transition-all ${
            selectedDevice === "mac-m4" ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => setSelectedDevice("mac-m4")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2 text-primary" />
              Mac M4 32G+2T
            </CardTitle>
            <CardDescription>主服务器</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-600 hover:bg-green-700">性能最佳选择</Badge>
            <ul className="mt-2 text-sm space-y-1">
              <li>• Git服务与代码存储</li>
              <li>• CI/CD流程管理</li>
              <li>• 数据库与缓存服务</li>
              <li>• 自动化部署控制</li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            selectedDevice === "imac-m4" ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => setSelectedDevice("imac-m4")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Laptop className="h-5 w-5 mr-2 text-blue-500" />
              iMac M4 Pro Max 128G+2T
            </CardTitle>
            <CardDescription>主力工作站</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="bg-blue-600 hover:bg-blue-700">强大的开发环境</Badge>
            <ul className="mt-2 text-sm space-y-1">
              <li>• 主要开发环境</li>
              <li>• 资源密集型任务处理</li>
              <li>• 虚拟化与容器管理</li>
              <li>• 大型项目构建</li>
            </ul>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            selectedDevice === "imac-m1" ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => setSelectedDevice("imac-m1")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Laptop className="h-5 w-5 mr-2 text-amber-500" />
              iMac M1 Pro 8G+256G
            </CardTitle>
            <CardDescription>辅助设备</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="bg-amber-600 hover:bg-amber-700">辅助开发</Badge>
            <ul className="mt-2 text-sm space-y-1">
              <li>• 轻量级开发任务</li>
              <li>• 测试与QA</li>
              <li>• 文档编写</li>
              <li>• 监控与管理界面</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {selectedDevice && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {selectedDevice === "mac-m4" && "Mac M4 32G+2T 配置指南"}
              {selectedDevice === "imac-m4" && "iMac M4 Pro Max 128G+2T 配置指南"}
              {selectedDevice === "imac-m1" && "iMac M1 Pro 8G+256G 配置指南"}
            </CardTitle>
            <CardDescription>
              {selectedDevice === "mac-m4" && "作为主服务器，需要进行以下优化配置"}
              {selectedDevice === "imac-m4" && "作为主力工作站，需要进行以下开发环境配置"}
              {selectedDevice === "imac-m1" && "作为辅助设备，需要进行以下基础配置"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDevice === "mac-m4" && (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">系统性能优化</span>
                    <CommandHelper
                      command={deviceCommands["mac-m4"].performance}
                      title="Mac M4系统性能优化"
                      description="提高系统文件描述符限制，优化服务器性能"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["mac-m4"].performance} language="bash" />

                  <div className="flex justify-between items-center mb-1 mt-4">
                    <span className="text-sm font-medium">网络优化</span>
                    <CommandHelper
                      command={deviceCommands["mac-m4"].network}
                      title="Mac M4网络优化"
                      description="优化网络设置，提高传输效率"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["mac-m4"].network} language="bash" />
                </>
              )}

              {selectedDevice === "imac-m4" && (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">开发工具安装</span>
                    <CommandHelper
                      command={deviceCommands["imac-m4"].tools}
                      title="iMac M4开发工具安装"
                      description="安装常用开发语言和工具"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["imac-m4"].tools} language="bash" />

                  <div className="flex justify-between items-center mb-1 mt-4">
                    <span className="text-sm font-medium">开发环境配置</span>
                    <CommandHelper
                      command={deviceCommands["imac-m4"].dev}
                      title="iMac M4开发环境配置"
                      description="配置Node.js和Python开发环境"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["imac-m4"].dev} language="bash" />
                </>
              )}

              {selectedDevice === "imac-m1" && (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">基础工具安装</span>
                    <CommandHelper
                      command={deviceCommands["imac-m1"].basic}
                      title="iMac M1基础工具安装"
                      description="安装基本的开发工具"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["imac-m1"].basic} language="bash" />

                  <div className="flex justify-between items-center mb-1 mt-4">
                    <span className="text-sm font-medium">SSH访问配置</span>
                    <CommandHelper
                      command={deviceCommands["imac-m1"].ssh}
                      title="iMac M1 SSH访问配置"
                      description="配置SSH密钥，实现无密码访问主服务器"
                    />
                  </div>
                  <CodeDisplay code={deviceCommands["imac-m1"].ssh} language="bash" />
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedDevice(null)}>
              返回
            </Button>
            <Button>查看详细配置</Button>
          </CardFooter>
        </Card>
      )}

      <div className="prose max-w-none mt-6">
        <h4>设备协同工作流</h4>
        <p>
          通过合理分配各设备角色，我们可以构建一个高效的开发与部署工作流。 Mac
          M4作为中心服务器，管理代码仓库和自动化流程； iMac M4 Pro Max作为主力开发工作站； iMac
          M1作为辅助设备处理轻量级任务。
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">设备间网络配置</h4>
          <CommandHelper
            command={networkSetupCommand}
            title="设备间网络配置"
            description="配置设备间的网络连接，实现无缝通信"
          />
        </div>
        <CodeDisplay code={networkSetupCommand} language="bash" />
      </div>
    </div>
  )
}
