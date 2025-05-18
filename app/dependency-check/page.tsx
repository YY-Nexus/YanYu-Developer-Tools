import { DependencyChecker } from "@/components/dependency-checker"
import { PageHeader } from "@/app/components/layout/page-header"

export const metadata = {
  title: "依赖健康检查 | YanYu Cloud³ Developer Tools",
  description: "检查项目依赖的健康状况，确保依赖版本一致性和安全性",
}

export default function DependencyCheckPage() {
  return (
    <div className="container mx-auto py-10">
      <PageHeader title="依赖健康检查" description="检查项目依赖的健康状况，确保依赖版本一致性和安全性" />
      <div className="mt-8">
        <DependencyChecker />
      </div>
    </div>
  )
}
