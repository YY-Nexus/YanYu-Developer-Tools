import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cloud, Code, Database, Github, Laptop, Server } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { GlobalLogo } from "@/app/components/ui/global-logo"
import { PageTransition } from "@/app/components/ui/page-transition"
import { AnimatedLink } from "@/app/components/ui/animated-link"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* 英雄区域 */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex justify-center mb-4">
                <GlobalLogo size="lg" showShadow={true} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl whitespace-nowrap">
                YanYu Cloud<sup>3</sup> Developer Tools
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                专业的云端开发工具集，助力开发者构建高效的云原生应用，从本地开发到云端部署一站式解决方案。
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedLink href="/devices">
                  <Button size="lg" className="gap-2 btn-primary group">
                    开始使用
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </AnimatedLink>
                <AnimatedLink href="/docs">
                  <Button size="lg" variant="outline" className="btn-outline">
                    查看文档
                  </Button>
                </AnimatedLink>
              </div>
            </div>
          </div>
        </section>

        {/* 功能区域 */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">核心功能</h2>
              <p className="mt-4 text-muted-foreground">全方位的开发工具，满足您的各种需求</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Laptop className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">设备配置</CardTitle>
                  <CardDescription>根据不同Mac设备的硬件配置，合理分配角色和任务</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    优化您的Mac设备性能，合理分配资源，打造高效的开发环境。
                  </p>
                  <Link href="/devices">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Server className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">服务器配置</CardTitle>
                  <CardDescription>配置Mac M4作为本地服务器，提供高性能计算能力</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    将您的Mac设备变成功能强大的本地服务器，支持各种开发和部署需求。
                  </p>
                  <Link href="/server">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Github className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">Git服务</CardTitle>
                  <CardDescription>在本地搭建Git服务并与GitHub集成，实现代码管理</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    搭建本地Git服务，与GitHub无缝集成，实现代码版本控制和团队协作。
                  </p>
                  <Link href="/git">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Cloud className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">云服务集成</CardTitle>
                  <CardDescription>将本地Mac服务器与各大云服务商集成，实现混合云架构</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    连接阿里云、腾讯云、百度云等主流云服务，构建混合云架构。
                  </p>
                  <Link href="/cloud">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Code className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">开发工具</CardTitle>
                  <CardDescription>提供丰富的开发工具和脚本，提高开发效率</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    集成各种开发工具和脚本，自动化开发流程，提高工作效率。
                  </p>
                  <Link href="/tools">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="yanyu-card card-3d">
                <CardHeader>
                  <div className="yanyu-icon-bg w-fit">
                    <Database className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4">数据管理</CardTitle>
                  <CardDescription>提供数据库管理和备份功能，确保数据安全</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    管理本地和云端数据库，自动备份和恢复，保障数据安全。
                  </p>
                  <Link href="/data">
                    <Button variant="outline" className="w-full btn-outline group">
                      查看详情
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 快速入门区域 */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">快速入门</h2>
              <p className="mt-4 text-muted-foreground">按照以下步骤开始使用YanYu Cloud³</p>
            </div>

            <div className="yanyu-section">
              <Tabs defaultValue="devices" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
                  <TabsTrigger value="devices" className="yanyu-tab">
                    设备配置
                  </TabsTrigger>
                  <TabsTrigger value="basic" className="yanyu-tab">
                    基础环境
                  </TabsTrigger>
                  <TabsTrigger value="server" className="yanyu-tab">
                    服务器配置
                  </TabsTrigger>
                  <TabsTrigger value="git" className="yanyu-tab">
                    Git服务
                  </TabsTrigger>
                  <TabsTrigger value="vercel" className="yanyu-tab">
                    Vercel集成
                  </TabsTrigger>
                  <TabsTrigger value="cloud" className="yanyu-tab">
                    云服务集成
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="devices">
                  <Card>
                    <CardHeader>
                      <CardTitle>设备角色与资源分配</CardTitle>
                      <CardDescription>根据不同Mac设备的硬件配置，合理分配角色和任务</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>根据设备性能和用途，将不同的Mac设备分配为服务器、开发工作站或辅助设备。</p>
                      <div className="mt-4">
                        <Link href="/devices">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>基础环境准备</CardTitle>
                      <CardDescription>安装必要的开发工具和软件</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>安装Homebrew、Git、Docker等基础开发工具，为后续配置奠定基础。</p>
                      <div className="mt-4">
                        <Link href="/basic">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="server">
                  <Card>
                    <CardHeader>
                      <CardTitle>服务器配置</CardTitle>
                      <CardDescription>配置Mac M4作为本地服务器</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>配置网络、安全和性能参数，将Mac M4变成高性能的本地服务器。</p>
                      <div className="mt-4">
                        <Link href="/server">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="git">
                  <Card>
                    <CardHeader>
                      <CardTitle>Git服务搭建</CardTitle>
                      <CardDescription>在本地搭建Git服务并与GitHub集成</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>使用Gitea搭建本地Git服务，并与GitHub集成，实现代码的本地存储和云端备份。</p>
                      <div className="mt-4">
                        <Link href="/git">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="vercel">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vercel集成</CardTitle>
                      <CardDescription>将本地服务器与Vercel部署流程集成</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>配置Vercel CLI和部署钩子，实现代码提交后的自动部署。</p>
                      <div className="mt-4">
                        <Link href="/vercel">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="cloud">
                  <Card>
                    <CardHeader>
                      <CardTitle>云服务集成</CardTitle>
                      <CardDescription>将本地Mac服务器与各大云服务商集成</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>配置阿里云、腾讯云、百度云等云服务的CLI工具和SDK，实现本地与云端的无缝集成。</p>
                      <div className="mt-4">
                        <Link href="/cloud">
                          <Button className="btn-primary">查看详细指南</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA区域 */}
        <section className="py-16 bg-primary/20 text-foreground">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold">准备好开始了吗？</h2>
              <p className="mt-4">立即开始使用YanYu Cloud³ Developer Tools，提升您的开发效率和项目质量。</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="btn-primary group">
                    免费试用
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="btn-outline">
                    联系我们
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  )
}
