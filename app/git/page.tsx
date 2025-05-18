import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GitBranch, GitCommit, GitMerge, GitPullRequest } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import GitServiceSetup from "@/app/components/git-service-setup"
import { PageHeader } from "@/app/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function GitPage() {
  const gitFeatures = [
    {
      title: "Gitea安装",
      description: "轻量级Git服务安装与配置",
      href: "/git/gitea",
      icon: <GitBranch className="h-5 w-5 text-primary" />,
    },
    {
      title: "仓库管理",
      description: "创建和管理Git仓库",
      href: "/git/repositories",
      icon: <GitCommit className="h-5 w-5 text-primary" />,
    },
    {
      title: "分支策略",
      description: "分支管理与合并策略",
      href: "/git/branches",
      icon: <GitMerge className="h-5 w-5 text-primary" />,
    },
    {
      title: "CI/CD集成",
      description: "持续集成与部署配置",
      href: "/git/ci-cd",
      icon: <GitPullRequest className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader
              title="Git服务"
              description="在Mac M4上搭建Git服务，并与GitHub集成，实现代码的本地存储和云端备份"
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <GitBranch className="h-4 w-4 text-primary" />
            <AlertTitle>Git服务选择</AlertTitle>
            <AlertDescription>
              我们将使用Gitea作为本地Git服务，它轻量级、易于配置，并提供完整的Git功能和Web界面。
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {gitFeatures.map((feature) => (
              <Card key={feature.title} className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.href}>
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="yanyu-section">
            <GitServiceSetup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
