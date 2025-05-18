"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Download, FileCode2, Shield } from "lucide-react"
import { checkDependencies, fixDependencies } from "@/app/dependency-check/actions"
import { toast } from "@/components/ui/use-toast"

// 依赖状态类型
type DependencyStatus = "compatible" | "outdated" | "incompatible" | "vulnerable"

// 依赖项类型
interface Dependency {
  name: string
  currentVersion: string
  recommendedVersion: string
  latestVersion: string
  status: DependencyStatus
  description: string
  isCore: boolean
}

// 依赖检查结果类型
interface DependencyCheckResult {
  dependencies: Dependency[]
  summary: {
    total: number
    compatible: number
    outdated: number
    incompatible: number
    vulnerable: number
  }
  lastChecked: string
}

export function DependencyChecker() {
  const [isChecking, setIsChecking] = useState(false)
  const [isFixing, setIsFixing] = useState(false)
  const [checkResult, setCheckResult] = useState<DependencyCheckResult | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // 执行依赖检查
  const runDependencyCheck = async () => {
    setIsChecking(true)
    try {
      const result = await checkDependencies()
      setCheckResult(result)
      toast({
        title: "依赖检查完成",
        description: `检查了 ${result.summary.total} 个依赖项`,
      })
    } catch (error) {
      toast({
        title: "依赖检查失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    } finally {
      setIsChecking(false)
    }
  }

  // 修复依赖问题
  const runDependencyFix = async () => {
    setIsFixing(true)
    try {
      await fixDependencies()
      toast({
        title: "依赖修复完成",
        description: "已尝试修复所有依赖问题，请重新检查依赖状态",
      })
      // 修复后重新检查
      await runDependencyCheck()
    } catch (error) {
      toast({
        title: "依赖修复失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      })
    } finally {
      setIsFixing(false)
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: DependencyStatus) => {
    switch (status) {
      case "compatible":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "outdated":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "incompatible":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "vulnerable":
        return <Shield className="h-5 w-5 text-red-500" />
    }
  }

  // 获取状态文本
  const getStatusText = (status: DependencyStatus) => {
    switch (status) {
      case "compatible":
        return "兼容"
      case "outdated":
        return "过时"
      case "incompatible":
        return "不兼容"
      case "vulnerable":
        return "安全漏洞"
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: DependencyStatus) => {
    switch (status) {
      case "compatible":
        return "bg-green-500"
      case "outdated":
        return "bg-amber-500"
      case "incompatible":
        return "bg-red-500"
      case "vulnerable":
        return "bg-red-500"
    }
  }

  // 过滤依赖项
  const filterDependencies = (dependencies: Dependency[]) => {
    switch (activeTab) {
      case "all":
        return dependencies
      case "core":
        return dependencies.filter((dep) => dep.isCore)
      case "compatible":
        return dependencies.filter((dep) => dep.status === "compatible")
      case "issues":
        return dependencies.filter((dep) => dep.status !== "compatible")
      default:
        return dependencies
    }
  }

  // 模拟依赖检查结果（实际应用中会从服务器获取）
  const mockCheckResult: DependencyCheckResult = {
    dependencies: [
      {
        name: "react",
        currentVersion: "19.1.0",
        recommendedVersion: "18.2.0",
        latestVersion: "19.1.0",
        status: "incompatible",
        description: "React核心库",
        isCore: true,
      },
      {
        name: "react-dom",
        currentVersion: "19.1.0",
        recommendedVersion: "18.2.0",
        latestVersion: "19.1.0",
        status: "incompatible",
        description: "React DOM操作库",
        isCore: true,
      },
      {
        name: "next",
        currentVersion: "15.2.4",
        recommendedVersion: "15.2.4",
        latestVersion: "15.3.2",
        status: "compatible",
        description: "Next.js框架",
        isCore: true,
      },
      {
        name: "tailwindcss",
        currentVersion: "3.4.17",
        recommendedVersion: "3.4.17",
        latestVersion: "4.1.7",
        status: "outdated",
        description: "Tailwind CSS",
        isCore: true,
      },
      {
        name: "date-fns",
        currentVersion: "4.1.0",
        recommendedVersion: "2.30.0",
        latestVersion: "4.1.0",
        status: "incompatible",
        description: "日期处理库",
        isCore: true,
      },
      {
        name: "@hookform/resolvers",
        currentVersion: "3.10.0",
        recommendedVersion: "3.10.0",
        latestVersion: "5.0.1",
        status: "outdated",
        description: "表单验证解析器",
        isCore: false,
      },
      {
        name: "lucide-react",
        currentVersion: "0.454.0",
        recommendedVersion: "0.454.0",
        latestVersion: "0.511.0",
        status: "outdated",
        description: "图标库",
        isCore: false,
      },
      {
        name: "framer-motion",
        currentVersion: "12.12.1",
        recommendedVersion: "12.12.1",
        latestVersion: "12.12.1",
        status: "compatible",
        description: "动画库",
        isCore: false,
      },
      {
        name: "zod",
        currentVersion: "3.24.4",
        recommendedVersion: "3.24.4",
        latestVersion: "3.24.4",
        status: "compatible",
        description: "类型验证库",
        isCore: false,
      },
      {
        name: "react-hook-form",
        currentVersion: "7.56.4",
        recommendedVersion: "7.56.4",
        latestVersion: "7.56.4",
        status: "compatible",
        description: "表单处理库",
        isCore: false,
      },
    ],
    summary: {
      total: 10,
      compatible: 4,
      outdated: 3,
      incompatible: 3,
      vulnerable: 0,
    },
    lastChecked: new Date().toLocaleString("zh-CN"),
  }

  // 使用模拟数据或实际检查结果
  const displayResult = checkResult || mockCheckResult
  const filteredDependencies = filterDependencies(displayResult.dependencies)

  return (
    <Card className="yanyu-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>依赖健康检查</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={runDependencyCheck} disabled={isChecking || isFixing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
              {isChecking ? "检查中..." : "检查依赖"}
            </Button>
            <Button variant="default" size="sm" onClick={runDependencyFix} disabled={isChecking || isFixing}>
              <FileCode2 className="h-4 w-4 mr-2" />
              {isFixing ? "修复中..." : "修复依赖"}
            </Button>
          </div>
        </CardTitle>
        <CardDescription>最后检查时间: {displayResult.lastChecked}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* 健康状态摘要 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">依赖健康状态</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{displayResult.summary.total}</div>
                  <div className="text-sm text-muted-foreground">总依赖数</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{displayResult.summary.compatible}</div>
                  <div className="text-sm text-muted-foreground">兼容依赖</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-500">{displayResult.summary.outdated}</div>
                  <div className="text-sm text-muted-foreground">过时依赖</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">
                    {displayResult.summary.incompatible + displayResult.summary.vulnerable}
                  </div>
                  <div className="text-sm text-muted-foreground">问题依赖</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 健康度进度条 */}
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">依赖健康度</span>
              <span className="text-sm font-medium">
                {Math.round((displayResult.summary.compatible / displayResult.summary.total) * 100)}%
              </span>
            </div>
            <Progress value={(displayResult.summary.compatible / displayResult.summary.total) * 100} className="h-2" />
          </div>
        </div>

        {/* 依赖列表 */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="yanyu-tab">
              全部
            </TabsTrigger>
            <TabsTrigger value="core" className="yanyu-tab">
              核心依赖
            </TabsTrigger>
            <TabsTrigger value="compatible" className="yanyu-tab">
              兼容依赖
            </TabsTrigger>
            <TabsTrigger value="issues" className="yanyu-tab">
              问题依赖
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-4">
              {filteredDependencies.length === 0 ? (
                <Alert>
                  <AlertTitle>没有找到依赖</AlertTitle>
                  <AlertDescription>当前筛选条件下没有找到依赖项。</AlertDescription>
                </Alert>
              ) : (
                filteredDependencies.map((dep) => (
                  <Card key={dep.name} className="overflow-hidden">
                    <div className={`h-1 ${getStatusColor(dep.status)}`}></div>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{dep.name}</span>
                            {dep.isCore && (
                              <Badge variant="outline" className="text-xs">
                                核心
                              </Badge>
                            )}
                            <Badge
                              className={`text-xs ${
                                dep.status === "compatible"
                                  ? "bg-green-500"
                                  : dep.status === "outdated"
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                            >
                              {getStatusText(dep.status)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{dep.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">当前版本:</span>
                            <Badge
                              variant="outline"
                              className={
                                dep.status === "compatible"
                                  ? "border-green-500"
                                  : dep.status === "outdated"
                                    ? "border-amber-500"
                                    : "border-red-500"
                              }
                            >
                              {dep.currentVersion}
                            </Badge>
                          </div>
                          {dep.currentVersion !== dep.recommendedVersion && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">推荐版本:</span>
                              <Badge variant="outline" className="border-green-500">
                                {dep.recommendedVersion}
                              </Badge>
                            </div>
                          )}
                          {dep.status === "outdated" && (
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">最新版本:</span>
                              <Badge variant="outline" className="border-blue-500">
                                {dep.latestVersion}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          导出报告
        </Button>
        <div className="text-sm text-muted-foreground">
          {displayResult.summary.incompatible > 0 ? (
            <span className="text-red-500">发现 {displayResult.summary.incompatible} 个不兼容依赖，建议修复</span>
          ) : displayResult.summary.outdated > 0 ? (
            <span className="text-amber-500">发现 {displayResult.summary.outdated} 个过时依赖，建议更新</span>
          ) : (
            <span className="text-green-500">所有依赖都是兼容的</span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
