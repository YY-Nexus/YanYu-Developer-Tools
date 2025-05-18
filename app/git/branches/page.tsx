import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GitMerge } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { PageHeader } from "@/app/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function BranchesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="Git分支策略" description="设计高效的分支管理策略，提高团队协作效率" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <GitMerge className="h-4 w-4 text-primary" />
            <AlertTitle>分支策略</AlertTitle>
            <AlertDescription>
              良好的分支策略可以提高团队协作效率，减少合并冲突，保持代码质量。本指南将介绍几种常用的分支策略。
            </AlertDescription>
          </Alert>

          <Card className="yanyu-section">
            <CardHeader>
              <CardTitle>Git分支策略指南</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="gitflow">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="gitflow" className="yanyu-tab">
                    Git Flow
                  </TabsTrigger>
                  <TabsTrigger value="github-flow" className="yanyu-tab">
                    GitHub Flow
                  </TabsTrigger>
                  <TabsTrigger value="trunk" className="yanyu-tab">
                    主干开发
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="gitflow">
                  <div className="prose max-w-none mb-6">
                    <h3>Git Flow 分支策略</h3>
                    <p>
                      Git
                      Flow是一种复杂但结构清晰的分支策略，适合有计划发布周期的大型项目。它定义了严格的分支角色和合并规则。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">主要分支</h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>master/main</strong>：主分支，存储正式发布的历史
                        </li>
                        <li>
                          <strong>develop</strong>：开发分支，包含最新的开发特性
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">辅助分支</h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>feature/*</strong>：新功能分支，从develop分支创建，完成后合并回develop
                        </li>
                        <li>
                          <strong>release/*</strong>：发布分支，从develop分支创建，用于准备发布
                        </li>
                        <li>
                          <strong>hotfix/*</strong>：热修复分支，从master分支创建，用于修复生产环境问题
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">Git Flow命令</h4>
                      <CodeDisplay
                        code={`# 安装Git Flow
brew install git-flow

# 初始化Git Flow
git flow init

# 开始新功能
git flow feature start feature_name

# 完成功能
git flow feature finish feature_name

# 开始发布
git flow release start 1.0.0

# 完成发布
git flow release finish 1.0.0

# 开始热修复
git flow hotfix start hotfix_name

# 完成热修复
git flow hotfix finish hotfix_name`}
                        language="bash"
                        showLineNumbers={true}
                        title="Git Flow命令"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="github-flow">
                  <div className="prose max-w-none mb-6">
                    <h3>GitHub Flow 分支策略</h3>
                    <p>
                      GitHub
                      Flow是一种简单的分支策略，适合持续部署的项目。它只有一个长期分支（main），所有功能都通过短期分支开发并通过Pull
                      Request合并。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">工作流程</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>从main分支创建功能分支</li>
                        <li>在功能分支上进行开发</li>
                        <li>提交Pull Request</li>
                        <li>代码审查</li>
                        <li>部署测试</li>
                        <li>合并到main分支</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">GitHub Flow命令</h4>
                      <CodeDisplay
                        code={`# 从main分支创建功能分支
git checkout main
git pull
git checkout -b feature-name

# 提交更改
git add .
git commit -m "Add feature"

# 推送到远程仓库
git push -u origin feature-name

# 在GitHub上创建Pull Request

# 合并后删除功能分支
git checkout main
git pull
git branch -d feature-name`}
                        language="bash"
                        showLineNumbers={true}
                        title="GitHub Flow命令"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trunk">
                  <div className="prose max-w-none mb-6">
                    <h3>主干开发策略</h3>
                    <p>
                      主干开发（Trunk-Based
                      Development）是一种所有开发者直接在主干（main/master）上工作的策略，通过功能开关控制功能的发布。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">工作流程</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>所有开发者在main分支上工作</li>
                        <li>使用短期分支进行复杂功能开发（不超过1-2天）</li>
                        <li>频繁集成代码（每天至少一次）</li>
                        <li>使用功能开关控制功能的可见性</li>
                        <li>通过自动化测试保证代码质量</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">主干开发命令</h4>
                      <CodeDisplay
                        code={`# 更新main分支
git checkout main
git pull

# 直接在main分支上工作
# 或创建短期分支
git checkout -b short-lived-branch

# 频繁集成代码
git checkout main
git pull
git merge short-lived-branch
git push

# 使用功能开关
if (featureFlags.isEnabled('new-feature')) {
  // 新功能代码
} else {
  // 旧功能代码
}`}
                        language="bash"
                        showLineNumbers={true}
                        title="主干开发命令"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">选择合适的分支策略</h4>
                <p className="text-sm text-muted-foreground">
                  选择分支策略时，需要考虑团队规模、项目复杂度、发布频率等因素。对于小型团队和需要快速迭代的项目，GitHub
                  Flow或主干开发可能更合适；对于大型项目和有计划发布周期的团队，Git Flow可能更适合。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
