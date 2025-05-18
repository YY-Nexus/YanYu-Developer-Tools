"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import WorkflowDiagram from "./workflow-diagram"

// 代码显示组件
const CodeDisplay = ({ code, title }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      {title && <div className="text-sm font-medium mb-1">{title}</div>}
      <div className="bg-muted rounded-md p-3 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 btn-hover-effect"
          onClick={copyToClipboard}
          aria-label="复制代码"
        >
          {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
        <pre className="text-xs overflow-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

export default function CloudIntegration() {
  // 生成同步脚本命令
  const getSyncScriptCommand = (provider) => {
    return `#!/bin/bash
# 保存为 ~/sync-to-${provider}.sh

# 设置变量
SRC_DIR="/Volumes/DevStorage/projects"
LOG_FILE="/Volumes/DevStorage/logs/${provider}_sync_$(date +"%Y%m%d").log"

# 确保日志目录存在
mkdir -p /Volumes/DevStorage/logs

echo "开始同步到${provider}..." | tee -a $LOG_FILE

# 根据不同云服务提供商执行不同的同步命令
case "${provider}" in
  "aliyun")
    # 阿里云OSS同步
    ossutil64 sync $SRC_DIR oss://your-bucket-name/ --delete -f | tee -a $LOG_FILE
    ;;
  "baiduyun")
    # 百度云BOS同步
    python3 ~/scripts/sync-to-bos.py | tee -a $LOG_FILE
    ;;
  "tencentyun")
    # 腾讯云COS同步
    coscmd upload -rs $SRC_DIR / --ignore ".git/*,*.log,node_modules/*" | tee -a $LOG_FILE
    ;;
  *)
    echo "未知的云服务提供商: ${provider}" | tee -a $LOG_FILE
    exit 1
    ;;
esac

echo "同步完成" | tee -a $LOG_FILE
`
  }

  // 生成数据库备份脚本命令
  const getDbBackupCommand = (provider) => {
    return `#!/bin/bash
# 保存为 ~/backup-${provider}-db.sh

BACKUP_DIR="/Volumes/DevStorage/backups/${provider}-db"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_NAME="your_database"

mkdir -p $BACKUP_DIR
mysqldump --defaults-file=~/.${provider}_db.cnf $DB_NAME ${">"} $BACKUP_DIR/$DB_NAME\_$DATE.sql
echo "${provider}数据库备份完成: $BACKUP_DIR/$DB_NAME\_$DATE.sql"

# 上传备份到云存储
case "${provider}" in
  "aliyun")
    # 上传到阿里云OSS
    ossutil64 cp $BACKUP_DIR/$DB_NAME\_$DATE.sql oss://your-bucket/backups/
    ;;
  "baiduyun")
    # 上传到百度云BOS
    python3 -c "
import os
from baidubce.services.bos.bos_client import BosClient
from baidubce.auth.credentials import AccessKeyCredentials
from baidubce.bce_client_configuration import BceClientConfiguration

config = BceClientConfiguration(
  credentials=AccessKeyCredentials('your-access-key-id', 'your-secret-access-key'),
  endpoint='bj.bcebos.com'
)
client = BosClient(config)
client.put_object_from_file(
  'your-bucket-name', 
  'backups/$DB_NAME\_$DATE.sql',
  '$BACKUP_DIR/$DB_NAME\_$DATE.sql'
)
print('备份已上传到百度云BOS')
"
    ;;
  "tencentyun")
    # 上传到腾讯云COS
    coscmd upload $BACKUP_DIR/$DB_NAME\_$DATE.sql /backups/$DB_NAME\_$DATE.sql
    ;;
esac

echo "备份已上传到${provider}云存储"
`
  }

  return (
    <div>
      <div className="mb-8">
        <WorkflowDiagram />
      </div>

      <Tabs defaultValue="aliyun" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="aliyun" className="yanyu-tab">
            阿里云
          </TabsTrigger>
          <TabsTrigger value="baiduyun" className="yanyu-tab">
            百度云
          </TabsTrigger>
          <TabsTrigger value="tencentyun" className="yanyu-tab">
            腾讯云
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aliyun">
          <Card className="yanyu-card card-3d">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Mac设备与阿里云对接</CardTitle>
                <Badge className="bg-rainbow-blue text-white hover:bg-rainbow-blue/90">推荐配置</Badge>
              </div>
              <CardDescription>配置Mac设备与阿里云ECS、OSS等服务的对接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">1. 安装阿里云CLI工具</h3>
                <CodeDisplay
                  code={`# 安装阿里云CLI工具
brew install aliyun-cli

# 配置凭证
aliyun configure`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">2. 配置OSS工具</h3>
                <CodeDisplay
                  code={`# 安装ossutil工具
brew install ossutil

# 配置OSS访问凭证
ossutil64 config -e oss-cn-hangzhou.aliyuncs.com -i AccessKeyID -k AccessKeySecret`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">3. 创建自动同步脚本</h3>
                <CodeDisplay title="~/sync-to-aliyun.sh" code={getSyncScriptCommand("aliyun")} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">4. 创建数据库备份脚本</h3>
                <CodeDisplay title="~/backup-aliyun-db.sh" code={getDbBackupCommand("aliyun")} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">5. 设置定时任务</h3>
                <CodeDisplay
                  code={`# 编辑crontab
crontab -e

# 添加以下内容
# 每天凌晨2点备份数据库
0 2 * * * ~/backup-aliyun-db.sh

# 每小时同步到OSS
0 * * * * ~/sync-to-aliyun.sh`}
                />
              </div>

              <div className="flex justify-end">
                <Button className="btn-primary">开始配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="baiduyun">
          <Card className="yanyu-card card-3d">
            <CardHeader>
              <CardTitle>Mac设备与百度云对接</CardTitle>
              <CardDescription>配置Mac设备与百度云BCC、BOS等服务的对接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">1. 安装百度云CLI工具</h3>
                <CodeDisplay
                  code={`# 安装百度云CLI
pip3 install bce-cli

# 配置凭证
bce config`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">2. 安装Python SDK</h3>
                <CodeDisplay
                  code={`# 安装Python SDK
pip3 install bce-python-sdk`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">3. 创建自动同步脚本</h3>
                <CodeDisplay title="~/sync-to-baiduyun.sh" code={getSyncScriptCommand("baiduyun")} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">4. 创建数据库备份脚本</h3>
                <CodeDisplay title="~/backup-baiduyun-db.sh" code={getDbBackupCommand("baiduyun")} />
              </div>

              <div className="flex justify-end">
                <Button className="btn-primary">开始配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tencentyun">
          <Card className="yanyu-card card-3d">
            <CardHeader>
              <CardTitle>Mac设备与腾讯云对接</CardTitle>
              <CardDescription>配置Mac设备与腾讯云CVM、COS等服务的对接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">1. 安装腾讯云CLI工具</h3>
                <CodeDisplay
                  code={`# 安装腾讯云CLI
pip3 install tccli

# 配置凭证
tccli configure`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">2. 安装COSCMD工具</h3>
                <CodeDisplay
                  code={`# 安装COSCMD
pip3 install coscmd

# 配置COS访问凭证
coscmd config -a your-secret-id -s your-secret-key -b your-bucket-name -r ap-guangzhou`}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">3. 创建自动同步脚本</h3>
                <CodeDisplay title="~/sync-to-tencentyun.sh" code={getSyncScriptCommand("tencentyun")} />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">4. 创建数据库备份脚本</h3>
                <CodeDisplay title="~/backup-tencentyun-db.sh" code={getDbBackupCommand("tencentyun")} />
              </div>

              <div className="flex justify-end">
                <Button className="btn-primary">开始配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
