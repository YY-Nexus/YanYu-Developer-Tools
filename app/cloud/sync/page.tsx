import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database } from "lucide-react"
import { PageLayout } from "@/app/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeDisplay from "@/app/components/code-display"

export default function CloudSyncPage() {
  return (
    <PageLayout
      title="云端数据同步"
      description="配置本地与云端的数据同步策略，确保数据一致性"
      alertContent={
        <Alert className="mb-6 border-primary/20 bg-primary/5">
          <Database className="h-4 w-4 text-primary" />
          <AlertTitle>数据同步</AlertTitle>
          <AlertDescription>合理的数据同步策略可以确保本地与云端数据的一致性，提高数据安全性。</AlertDescription>
        </Alert>
      }
    >
      <Card>
        <CardHeader>
          <CardTitle>数据同步指南</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="files">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="files" className="yanyu-tab">
                文件同步
              </TabsTrigger>
              <TabsTrigger value="database" className="yanyu-tab">
                数据库同步
              </TabsTrigger>
              <TabsTrigger value="schedule" className="yanyu-tab">
                定时任务
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">文件同步策略</h3>
              <p className="text-sm text-muted-foreground mb-4">配置本地文件与云端存储的同步策略。</p>
              <CodeDisplay
                code={`#!/bin/bash
# 保存为 ~/sync-files.sh

# 设置变量
SRC_DIR="/Volumes/DevStorage/projects"
LOG_FILE="/Volumes/DevStorage/logs/sync_$(date +"%Y%m%d").log"
CLOUD_PROVIDER="aliyun"  # 可选：aliyun, tencent, baidu

# 确保日志目录存在
mkdir -p /Volumes/DevStorage/logs

echo "开始同步到$\{CLOUD_PROVIDER}..." | tee -a $LOG_FILE

# 根据不同云服务提供商执行不同的同步命令
case "$\{CLOUD_PROVIDER}" in
  "aliyun")
    # 阿里云OSS同步
    ossutil64 sync $SRC_DIR oss://your-bucket-name/ --delete -f | tee -a $LOG_FILE
    ;;
  "tencent")
    # 腾讯云COS同步
    coscmd sync -d $SRC_DIR / --ignore ".git/*,*.log,node_modules/*" | tee -a $LOG_FILE
    ;;
  "baidu")
    # 百度云BOS同步
    python3 ~/scripts/sync-to-bos.py | tee -a $LOG_FILE
    ;;
  *)
    echo "未知的云服务提供商: $\{CLOUD_PROVIDER}" | tee -a $LOG_FILE
    exit 1
    ;;
esac

echo "同步完成" | tee -a $LOG_FILE`}
                language="bash"
                showLineNumbers={true}
                title="文件同步脚本"
              />
            </TabsContent>

            <TabsContent value="database" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">数据库同步策略</h3>
              <p className="text-sm text-muted-foreground mb-4">配置本地数据库与云端数据库的同步策略。</p>
              <CodeDisplay
                code={`#!/bin/bash
# 保存为 ~/sync-database.sh

BACKUP_DIR="/Volumes/DevStorage/backups/db"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_NAME="your_database"
CLOUD_PROVIDER="aliyun"  # 可选：aliyun, tencent, baidu

mkdir -p $BACKUP_DIR
mysqldump --defaults-file=~/.my.cnf $DB_NAME > $BACKUP_DIR/$DB_NAME\_$DATE.sql
echo "数据库备份完成: $BACKUP_DIR/$DB_NAME\_$DATE.sql"

# 上传备份到云存储
case "$\{CLOUD_PROVIDER}" in
  "aliyun")
    # 上传到阿里云OSS
    ossutil64 cp $BACKUP_DIR/$DB_NAME\_$DATE.sql oss://your-bucket/backups/
    ;;
  "tencent")
    # 上传到腾讯云COS
    coscmd upload $BACKUP_DIR/$DB_NAME\_$DATE.sql /backups/$DB_NAME\_$DATE.sql
    ;;
  "baidu")
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
esac

echo "备份已上传到$\{CLOUD_PROVIDER}云存储"`}
                language="bash"
                showLineNumbers={true}
                title="数据库同步脚本"
              />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">定时同步任务</h3>
              <p className="text-sm text-muted-foreground mb-4">配置定时任务，自动执行同步操作。</p>
              <CodeDisplay
                code={`# 设置文件同步脚本执行权限
chmod +x ~/sync-files.sh

# 设置数据库同步脚本执行权限
chmod +x ~/sync-database.sh

# 编辑crontab
crontab -e

# 添加以下内容
# 每小时同步文件
0 * * * * ~/sync-files.sh

# 每天凌晨2点备份数据库
0 2 * * * ~/sync-database.sh

# 每周日凌晨3点执行完整备份
0 3 * * 0 ~/full-backup.sh`}
                language="bash"
                showLineNumbers={true}
                title="定时任务配置"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
