import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GitPullRequest } from "lucide-react"
import { Footer } from "@/app/components/layout/footer"
import { PageHeader } from "@/app/components/layout/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function CiCdPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 yanyu-gradient-bg -z-10" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl">
            <PageHeader title="CI/CD集成" description="配置持续集成和持续部署流程，实现自动化构建和部署" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <GitPullRequest className="h-4 w-4 text-primary" />
            <AlertTitle>CI/CD集成</AlertTitle>
            <AlertDescription>
              持续集成和持续部署（CI/CD）可以自动化构建、测试和部署过程，提高开发效率和代码质量。本指南将介绍如何将CI/CD工具与Git服务集成。
            </AlertDescription>
          </Alert>

          <Card className="yanyu-section">
            <CardHeader>
              <CardTitle>CI/CD集成指南</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="github-actions">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="github-actions" className="yanyu-tab">
                    GitHub Actions
                  </TabsTrigger>
                  <TabsTrigger value="jenkins" className="yanyu-tab">
                    Jenkins
                  </TabsTrigger>
                  <TabsTrigger value="gitea-actions" className="yanyu-tab">
                    Gitea Actions
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="github-actions">
                  <div className="prose max-w-none mb-6">
                    <h3>GitHub Actions集成</h3>
                    <p>
                      GitHub
                      Actions是GitHub提供的CI/CD工具，可以直接在GitHub仓库中配置和运行工作流。它与GitHub无缝集成，支持自动触发构建、测试和部署。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">基本概念</h4>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>工作流（Workflow）</strong>：定义在<code>.github/workflows</code>目录下的YAML文件
                        </li>
                        <li>
                          <strong>事件（Event）</strong>：触发工作流的GitHub事件，如push、pull_request等
                        </li>
                        <li>
                          <strong>作业（Job）</strong>：工作流中的一组步骤，可以并行或串行执行
                        </li>
                        <li>
                          <strong>步骤（Step）</strong>：作业中的单个任务，可以运行命令或使用Action
                        </li>
                        <li>
                          <strong>Action</strong>：可重用的工作单元，可以是GitHub提供的或社区贡献的
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">Node.js项目CI/CD配置</h4>
                      <CodeDisplay
                        code={`# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
  deploy:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: \${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'`}
                        language="yaml"
                        showLineNumbers={true}
                        title="GitHub Actions配置文件"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">配置步骤</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>
                          在GitHub仓库中创建<code>.github/workflows</code>目录
                        </li>
                        <li>
                          在该目录下创建YAML配置文件，如<code>ci-cd.yml</code>
                        </li>
                        <li>配置工作流的触发事件、作业和步骤</li>
                        <li>在GitHub仓库的Settings中配置必要的Secrets（如部署令牌）</li>
                        <li>推送代码到GitHub，自动触发CI/CD流程</li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="jenkins">
                  <div className="prose max-w-none mb-6">
                    <h3>Jenkins集成</h3>
                    <p>
                      Jenkins是一个开源的自动化服务器，可以用于构建、测试和部署软件。它可以与Git服务集成，实现代码提交后的自动化流程。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">安装Jenkins</h4>
                      <CodeDisplay
                        code={`# 在Mac上安装Jenkins
brew install jenkins-lts

# 启动Jenkins服务
brew services start jenkins-lts

# 访问Jenkins Web界面
open http://localhost:8080`}
                        language="bash"
                        showLineNumbers={true}
                        title="Jenkins安装命令"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">配置Git Webhook</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>在Jenkins中创建新的Pipeline项目</li>
                        <li>配置Git仓库URL和凭证</li>
                        <li>在Jenkins项目配置中启用"Build Triggers" > "GitHub hook trigger for GITScm polling"</li>
                        <li>在Gitea/GitHub仓库设置中添加Webhook：</li>
                      </ol>
                      <CodeDisplay
                        code={`# Webhook URL格式
http://jenkins-server:8080/github-webhook/

# 内容类型
application/json

# 触发事件
Push events, Pull Request events`}
                        language="bash"
                        title="Webhook配置"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">Jenkinsfile配置</h4>
                      <CodeDisplay
                        code={`// Jenkinsfile
pipeline {
  agent any

  tools {
    nodejs 'Node18'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      when {
        branch 'main'
      }
      steps {
        sh 'npm run deploy'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    success {
      echo 'Build succeeded!'
    }
    failure {
      echo 'Build failed!'
    }
  }
}`}
                        language="groovy"
                        showLineNumbers={true}
                        title="Jenkinsfile配置"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gitea-actions">
                  <div className="prose max-w-none mb-6">
                    <h3>Gitea Actions集成</h3>
                    <p>
                      Gitea Actions是Gitea内置的CI/CD功能，与GitHub
                      Actions兼容。它允许您在Gitea仓库中配置工作流，自动执行构建、测试和部署任务。
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-3">启用Gitea Actions</h4>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>
                          编辑Gitea配置文件<code>app.ini</code>
                        </li>
                        <li>添加或修改以下配置：</li>
                      </ol>
                      <CodeDisplay
                        code={`[actions]
ENABLED=true
DEFAULT_ACTIONS_URL=https://gitea.com/actions`}
                        language="ini"
                        title="Gitea Actions配置"
                      />
                      <p className="text-sm mt-2">重启Gitea服务使配置生效：</p>
                      <CodeDisplay code={`docker restart gitea`} language="bash" />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">配置工作流</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        在仓库中创建<code>.gitea/workflows</code>目录，添加工作流配置文件：
                      </p>
                      <CodeDisplay
                        code={`# .gitea/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
    
  deploy:
    needs: build-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy application
      run: |
        echo "Deploying application..."
        # 添加部署命令`}
                        language="yaml"
                        showLineNumbers={true}
                        title="Gitea Actions配置文件"
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-3">配置Runner</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Gitea Actions需要Runner来执行工作流。您可以设置自托管Runner：
                      </p>
                      <CodeDisplay
                        code={`# 安装act_runner
wget -O act_runner https://gitea.com/gitea/act_runner/releases/download/v0.2.5/act_runner-0.2.5-linux-amd64
chmod +x act_runner

# 注册Runner
./act_runner register --no-interactive --instance http://mac-server:3000 --token YOUR_RUNNER_TOKEN

# 启动Runner
./act_runner daemon`}
                        language="bash"
                        showLineNumbers={true}
                        title="Runner配置命令"
                      />
                      <p className="text-sm mt-2">
                        Runner令牌可以在Gitea管理界面的"设置" > "Actions" > "Runners"中获取。
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">CI/CD最佳实践</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>自动化测试</strong>：确保每次代码提交都运行测试，及早发现问题
                  </li>
                  <li>
                    <strong>代码质量检查</strong>：集成代码风格检查、静态分析等工具
                  </li>
                  <li>
                    <strong>环境一致性</strong>：使用容器技术确保开发、测试和生产环境的一致性
                  </li>
                  <li>
                    <strong>安全扫描</strong>：集成安全漏洞扫描工具，提前发现安全问题
                  </li>
                  <li>
                    <strong>部署策略</strong>：采用蓝绿部署、金丝雀发布等策略，降低部署风险
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
