import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { DocsSidebar } from "@/app/components/docs/docs-sidebar"
import { DocsSearch } from "@/app/components/docs/docs-search"
import { DocsPagination } from "@/app/components/docs/docs-pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <PageLayout
      title="文档中心"
      description="YanYu Cloud³ Developer Tools 完整文档和指南"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <FileText className="h-4 w-4 text-primary" />
          <AlertTitle>文档版本</AlertTitle>
          <AlertDescription>当前文档适用于 YanYu Cloud³ Developer Tools v1.0.0 及以上版本。</AlertDescription>
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
            <CardHeader>
              <CardTitle>欢迎使用 YanYu Cloud³ 文档</CardTitle>
              <CardDescription>全面了解如何使用 YanYu Cloud³ Developer Tools</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                YanYu Cloud³ Developer Tools
                是一套专为Mac设备设计的开发工具集，帮助开发者构建高效的云原生应用，从本地开发到云端部署提供一站式解决方案。
              </p>

              <h3>快速入门</h3>
              <p>如果您是首次使用 YanYu Cloud³，建议从以下几个方面开始了解：</p>

              <ul>
                <li>
                  <a href="/docs/getting-started">入门指南</a> - 快速上手 YanYu Cloud³
                </li>
                <li>
                  <a href="/docs/setup">环境配置</a> - 配置开发环境
                </li>
                <li>
                  <a href="/docs/server-setup">服务器设置</a> - 将Mac设备配置为服务器
                </li>
                <li>
                  <a href="/docs/git-integration">Git服务集成</a> - 配置本地Git服务
                </li>
              </ul>

              <h3>核心功能</h3>
              <p>YanYu Cloud³ 提供以下核心功能：</p>

              <ul>
                <li>
                  <strong>设备配置</strong> - 根据不同Mac设备的硬件配置，合理分配角色和任务
                </li>
                <li>
                  <strong>服务器配置</strong> - 配置Mac M4作为本地服务器，提供高性能计算能力
                </li>
                <li>
                  <strong>Git服务</strong> - 在本地搭建Git服务并与GitHub集成，实现代码管理
                </li>
                <li>
                  <strong>云服务集成</strong> - 将本地Mac服务器与各大云服务商集成，实现混合云架构
                </li>
                <li>
                  <strong>开发工具</strong> - 提供丰富的开发工具和脚本，提高开发效率
                </li>
                <li>
                  <strong>数据管理</strong> - 提供数据库管理和备份功能，确保数据安全
                </li>
              </ul>

              <h3>API参考</h3>
              <p>如果您需要了解 YanYu Cloud³ 的API接口，请参考：</p>

              <ul>
                <li>
                  <a href="/docs/api/overview">API概览</a> - API接口总览
                </li>
                <li>
                  <a href="/docs/api/authentication">认证与授权</a> - API认证方式
                </li>
                <li>
                  <a href="/docs/api/endpoints">接口列表</a> - 详细API接口文档
                </li>
              </ul>

              <h3>最佳实践</h3>
              <p>了解如何最有效地使用 YanYu Cloud³：</p>

              <ul>
                <li>
                  <a href="/docs/best-practices/architecture">架构设计</a> - 最佳架构实践
                </li>
                <li>
                  <a href="/docs/best-practices/security">安全最佳实践</a> - 保护您的开发环境
                </li>
                <li>
                  <a href="/docs/best-practices/performance">性能优化</a> - 提高系统性能
                </li>
              </ul>
            </CardContent>
          </Card>

          <DocsPagination
            prev={{ title: "首页", href: "/" }}
            next={{ title: "入门指南", href: "/docs/getting-started" }}
          />
        </div>
      </div>
    </PageLayout>
  )
}
