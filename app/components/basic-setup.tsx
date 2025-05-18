"use client"

import { Check, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Steps, Step } from "./steps"

// 使用默认导出
export default function BasicSetup() {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h3>1.2 基础工具安装</h3>
        <p>在Mac上搭建开发环境，首先需要安装一些基础工具。这些工具将为后续的服务器配置和开发工作奠定基础。</p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>前置条件</AlertTitle>
        <AlertDescription>确保您的Mac已更新至最新的macOS版本，并且拥有管理员权限。</AlertDescription>
      </Alert>

      <Steps>
        <Step number={1} title="安装Homebrew">
          <p className="text-sm text-muted-foreground mb-2">
            Homebrew是macOS上最流行的包管理器，可以轻松安装各种开发工具和软件。
          </p>
          <div className="bg-muted p-3 rounded text-sm font-mono">
            {'/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'}
          </div>
          <p className="text-sm mt-2">安装完成后，按照终端提示将Homebrew添加到PATH中。</p>
        </Step>

        <Step number={2} title="安装开发工具">
          <p className="text-sm text-muted-foreground mb-2">安装基本的开发工具和实用程序。</p>
          <div className="bg-muted p-3 rounded text-sm font-mono">brew install git wget curl node python3</div>
        </Step>

        <Step number={3} title="安装Docker">
          <p className="text-sm text-muted-foreground mb-2">Docker将用于容器化应用和服务。</p>
          <div className="bg-muted p-3 rounded text-sm font-mono">brew install --cask docker</div>
          <p className="text-sm mt-2">安装完成后，打开Docker Desktop并完成初始化设置。</p>
        </Step>

        <Step number={4} title="安装开发IDE">
          <p className="text-sm text-muted-foreground mb-2">安装Visual Studio Code作为主要开发环境。</p>
          <div className="bg-muted p-3 rounded text-sm font-mono">brew install --cask visual-studio-code</div>
        </Step>
      </Steps>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2 flex items-center">
          <Check className="h-4 w-4 mr-2 text-green-500" />
          验证安装
        </h4>
        <p className="text-sm mb-2">运行以下命令验证各工具是否正确安装：</p>
        <div className="bg-muted p-3 rounded text-sm font-mono">
          brew --version
          <br />
          git --version
          <br />
          docker --version
          <br />
          node --version
          <br />
          python3 --version
        </div>
      </div>

      <div className="prose max-w-none">
        <h4>下一步</h4>
        <p>完成基础工具安装后，我们将进入下一章节，配置Mac M4作为本地服务器。</p>
      </div>
    </div>
  )
}
