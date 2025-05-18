import CloudIntegration from "./components/cloud-integration"

export default function CloudIntegrationPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-2">YanYu Cloud³ Developer Tools</h1>
        <p className="text-muted-foreground mb-6">云服务集成 - 连接本地与云端</p>
        <CloudIntegration />
      </div>
    </main>
  )
}
