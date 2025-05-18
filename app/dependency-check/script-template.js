/**
 * 依赖健康检查脚本
 * 用于检查项目依赖的健康状况，确保依赖版本一致性和安全性
 */

const fs = require("fs")
const path = require("path")
const https = require("https")
const { execSync } = require("child_process")

// 核心依赖及其版本策略
const coreDependencies = {
  react: {
    version: "18.2.0",
    exactMatch: true,
    description: "React核心库",
  },
  "react-dom": {
    version: "18.2.0",
    exactMatch: true,
    description: "React DOM操作库",
  },
  next: {
    version: "15.2.4",
    exactMatch: true,
    description: "Next.js框架",
  },
  tailwindcss: {
    version: "3.4.17",
    exactMatch: true,
    description: "Tailwind CSS",
  },
  "date-fns": {
    version: "2.30.0",
    exactMatch: true,
    description: "日期处理库",
  },
}

// 依赖状态类型
const DependencyStatus = {
  COMPATIBLE: "compatible",
  OUTDATED: "outdated",
  INCOMPATIBLE: "incompatible",
  VULNERABLE: "vulnerable",
}

// 读取package.json
function readPackageJson() {
  const packageJsonPath = path.join(process.cwd(), "package.json")
  const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8")
  return JSON.parse(packageJsonContent)
}

// 获取npm包的最新版本信息
async function getPackageInfo(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}`

    https
      .get(url, (res) => {
        let data = ""

        res.on("data", (chunk) => {
          data += chunk
        })

        res.on("end", () => {
          try {
            const packageInfo = JSON.parse(data)
            resolve({
              name: packageName,
              latestVersion: packageInfo["dist-tags"].latest,
            })
          } catch (error) {
            reject(error)
          }
        })
      })
      .on("error", (error) => {
        reject(error)
      })
  })
}

// 检查依赖健康状况
async function checkDependencies() {
  try {
    const packageJson = readPackageJson()
    const { dependencies = {} } = packageJson

    const dependencyList = []
    const summary = {
      total: 0,
      compatible: 0,
      outdated: 0,
      incompatible: 0,
      vulnerable: 0,
    }

    // 检查核心依赖
    for (const [name, config] of Object.entries(coreDependencies)) {
      const currentVersion = dependencies[name]?.replace(/[\^~>=<]/g, "")

      if (!currentVersion) {
        console.log(`缺少核心依赖: ${name}`)
        continue
      }

      // 获取最新版本
      const packageInfo = await getPackageInfo(name)
      const latestVersion = packageInfo.latestVersion

      // 确定依赖状态
      let status
      if (config.exactMatch && currentVersion !== config.version) {
        status = DependencyStatus.INCOMPATIBLE
        summary.incompatible++
      } else if (latestVersion !== currentVersion) {
        status = DependencyStatus.OUTDATED
        summary.outdated++
      } else {
        status = DependencyStatus.COMPATIBLE
        summary.compatible++
      }

      dependencyList.push({
        name,
        currentVersion,
        recommendedVersion: config.version,
        latestVersion,
        status,
        description: config.description,
        isCore: true,
      })

      summary.total++
    }

    // 检查其他依赖
    for (const [name, version] of Object.entries(dependencies)) {
      // 跳过已检查的核心依赖
      if (coreDependencies[name]) continue

      const currentVersion = version.replace(/[\^~>=<]/g, "")

      // 获取最新版本
      const packageInfo = await getPackageInfo(name)
      const latestVersion = packageInfo.latestVersion

      // 确定依赖状态
      let status
      if (latestVersion !== currentVersion) {
        status = DependencyStatus.OUTDATED
        summary.outdated++
      } else {
        status = DependencyStatus.COMPATIBLE
        summary.compatible++
      }

      dependencyList.push({
        name,
        currentVersion,
        recommendedVersion: currentVersion,
        latestVersion,
        status,
        description: "",
        isCore: false,
      })

      summary.total++
    }

    // 检查安全漏洞
    try {
      const auditOutput = execSync("npm audit --json", { encoding: "utf-8" })
      const auditResult = JSON.parse(auditOutput)

      if (auditResult.vulnerabilities) {
        const vulnerablePackages = Object.keys(auditResult.vulnerabilities)

        for (const packageName of vulnerablePackages) {
          const dependency = dependencyList.find((dep) => dep.name === packageName)

          if (dependency) {
            dependency.status = DependencyStatus.VULNERABLE
            summary.vulnerable++

            if (dependency.status === DependencyStatus.COMPATIBLE) {
              summary.compatible--
            } else if (dependency.status === DependencyStatus.OUTDATED) {
              summary.outdated--
            } else if (dependency.status === DependencyStatus.INCOMPATIBLE) {
              summary.incompatible--
            }
          }
        }
      }
    } catch (error) {
      console.error("安全漏洞检查失败:", error)
    }

    // 生成报告
    const report = {
      dependencies: dependencyList,
      summary,
      lastChecked: new Date().toLocaleString(),
    }

    // 保存报告
    fs.writeFileSync(path.join(process.cwd(), "dependency-report.json"), JSON.stringify(report, null, 2))

    // 输出摘要
    console.log("依赖健康检查完成!")
    console.log(`总依赖数: ${summary.total}`)
    console.log(`兼容依赖: ${summary.compatible}`)
    console.log(`过时依赖: ${summary.outdated}`)
    console.log(`不兼容依赖: ${summary.incompatible}`)
    console.log(`存在漏洞依赖: ${summary.vulnerable}`)

    // 如果有不兼容或漏洞依赖，返回非零退出码
    if (summary.incompatible > 0 || summary.vulnerable > 0) {
      process.exit(1)
    }

    return report
  } catch (error) {
    console.error("依赖检查失败:", error)
    process.exit(1)
  }
}

// 执行检查
checkDependencies()

export default checkDependencies
