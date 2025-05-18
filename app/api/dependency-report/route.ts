import { type NextRequest, NextResponse } from "next/server"
import { checkDependencies } from "@/app/dependency-check/actions"

export async function GET(request: NextRequest) {
  try {
    const result = await checkDependencies()

    // 设置响应头，使浏览器将响应视为下载文件
    const headers = {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="dependency-report-${new Date().toISOString().split("T")[0]}.json"`,
    }

    return NextResponse.json(result, { headers })
  } catch (error) {
    return NextResponse.json({ error: "生成依赖报告失败" }, { status: 500 })
  }
}
