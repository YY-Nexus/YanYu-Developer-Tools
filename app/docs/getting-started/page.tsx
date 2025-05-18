import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { DocsSidebar } from "@/app/components/docs/docs-sidebar"
import { DocsSearch } from "@/app/components/docs/docs-search"
import { DocsPagination } from "@/app/components/docs/docs-pagination"
import { Card, CardContent } from "@/components/ui/card"
import CodeDisplay from "@/app/components/code-display"

export default function GettingStartedPage() {
  return (
    <PageLayout
      title="入门指南"
      description="快速上手 YanYu Cloud³ Developer Tools"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <FileText className="h-4 w-4 text-primary" />
          <AlertTitle>提示</AlertTitle>
          <AlertDescription>本指南假设您已经拥有Mac设备，并且具备基本的命令行操作知识。</AlertDescription>
        </Alert>
      }
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <DocsSidebar />
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <DocsSearch />
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6 prose max-w-none">
              <h2>入门指南</h2>

              <p>
                欢迎使用 YanYu Cloud³ Developer Tools！本指南将帮助您快速上手，了解如何使用我们的工具集来提升开发效率。
              </p>

              <h3>前置条件</h3>
              <ul>
                <li>Mac设备（推荐M系列芯片）</li>
                <li>macOS 12.0或更高版本</li>
                <li>至少8GB内存和50GB可用存储空间</li>
                <li>管理员权限</li>
                <li>稳定的互联网连接</li>
              </ul>

              <h3>安装步骤</h3>

              <h4>1. 安装Homebrew</h4>
              <p>Homebrew是macOS上最流行的包管理器，我们将使用它来安装其他工具。</p>

              <CodeDisplay
                code={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}
                language="bash"
                title="安装Homebrew"
              />

              <h4>2. 安装YanYu CLI</h4>
              <p>YanYu CLI是我们的命令行工具，用于管理YanYu Cloud³的各项功能。</p>

              <CodeDisplay
                code={`brew tap yanyu/tools
brew install yanyu-cli`}
                language="bash"
                title="安装YanYu CLI"
              />

              <h4>3. 初始化配置</h4>
              <p>运行初始化命令，配置YanYu Cloud³环境。</p>

              <CodeDisplay code={`yanyu init`} language="bash" title="初始化YanYu环境" />

              <p>按照提示完成初始化配置，包括：</p>
              <ul>
                <li>选择设备角色（服务器、开发工作站或辅助设备）</li>
                <li>配置网络设置</li>
                <li>选择要安装的服务（Git、数据库等）</li>
                <li>配置云服务集成</li>
              </ul>

              <h3>验证安装</h3>
              <p>完成安装后，运行以下命令验证安装是否成功：</p>

              <CodeDisplay code={`yanyu status`} language="bash" title="验证安装" />

              <p>如果安装成功，您将看到类似以下的输出：</p>

              <CodeDisplay
                code={`YanYu Cloud³ Developer Tools v1.0.0
状态: 正常运行
设备角色: 服务器
已安装服务:
  - Git服务 (Gitea): 运行中
  - 数据库 (PostgreSQL): 运行中
  - 缓存服务 (Redis): 运行中
云服务集成:
  - 阿里云: 已配置
  - 腾讯云: 未配置
  - 百度云: 未配置`}
                language="bash"
                title="状态输出"
              />

              <h3>下一步</h3>
              <p>恭喜！您已经成功安装了YanYu Cloud³ Developer Tools。接下来，您可以：</p>

              <ul>
                <li>
                  <a href="/docs/setup">配置开发环境</a> - 详细了解如何配置开发环境
                </li>
                <li>
                  <a href="/docs/server-setup">设置服务器</a> - 将Mac设备配置为服务器
                </li>
                <li>
                  <a href="/docs/git-setup">配置Git服务</a> - 设置本地Git服务
                </li>
                <li>
                  <a href="/docs/cloud-integration">云服务集成</a> - 集成各大云服务商
                </li>
              </ul>

              <h3>常见问题</h3>

              <h4>安装失败怎么办？</h4>
              <p>如果安装过程中遇到问题，请尝试以下解决方案：</p>
              <ul>
                <li>确保您的Mac设备满足系统要求</li>
                <li>检查网络连接是否稳定</li>
                <li>
                  运行 <code>yanyu doctor</code> 命令诊断问题
                </li>
                <li>
                  查看 <a href="/docs/troubleshooting">故障排除</a> 文档
                </li>
              </ul>

              <h4>如何更新YanYu CLI？</h4>
              <p>运行以下命令更新YanYu CLI：</p>

              <CodeDisplay
                code={`brew update
brew upgrade yanyu-cli`}
                language="bash"
                title="更新YanYu CLI"
              />

              <h4>如何卸载YanYu Cloud³？</h4>
              <p>如果您需要卸载YanYu Cloud³，请运行以下命令：</p>

              <CodeDisplay code={`yanyu uninstall`} language="bash" title="卸载YanYu Cloud³" />

              <p>
                这将卸载所有YanYu Cloud³组件，但不会删除您的数据。如果您想完全删除所有数据，请添加 <code>--purge</code>{" "}
                参数：
              </p>

              <CodeDisplay code={`yanyu uninstall --purge`} language="bash" title="完全卸载YanYu Cloud³" />
            </CardContent>
          </Card>

          <DocsPagination
            prev={{ title: "文档首页", href: "/docs" }}
            next={{ title: "安装", href: "/docs/installation" }}
          />
        </div>
      </div>
    </PageLayout>
  )
}
