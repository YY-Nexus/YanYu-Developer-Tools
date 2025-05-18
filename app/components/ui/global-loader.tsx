"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNavigation } from "./navigation-context"
import { GlobalLogo } from "./global-logo"
import { useEffect, useState } from "react"

export function GlobalLoader() {
  const { isNavigating } = useNavigation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isNavigating) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 25
          return newProgress >= 95 ? 95 : newProgress // 最多到95%，等待实际加载完成
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      // 导航完成后，快速完成进度条
      setProgress(100)
    }
  }, [isNavigating])

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1, 0.9, 1],
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="mb-8"
            >
              <GlobalLogo size="lg" showShadow={true} />
            </motion.div>

            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            <motion.p
              className="mt-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              加载中 {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
