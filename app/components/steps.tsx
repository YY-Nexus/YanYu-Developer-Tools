"use client"

import React from "react"

import { useState, useRef, type ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// 定义步骤操作类型
export interface StepAction {
  id: string
  title: string
  command?: string
  url?: string
  description?: string
  action?: () => void
}

interface StepProps {
  number: number
  title: string
  children: ReactNode
  action?: StepAction
  onActionClick?: (action: StepAction) => void
}

export function Step({ number, title, children, action, onActionClick }: StepProps) {
  const commandRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const handleActionClick = () => {
    if (action) {
      if (onActionClick) {
        onActionClick(action)
      } else if (action.action) {
        action.action()
      } else if (action.url) {
        window.open(action.url, "_blank")
      } else if (action.command && commandRef.current) {
        // 复制命令到剪贴板
        navigator.clipboard
          .writeText(action.command)
          .then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
          .catch((err) => console.error("复制失败:", err))
      }
    }
  }

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium mr-2">
          {number}
        </div>
        <h4 className="font-medium">{title}</h4>
      </div>
      <div className="ml-8">
        {children}

        {action && (
          <div
            className={cn(
              "mt-3 flex items-center text-sm font-medium text-primary hover:underline cursor-pointer",
              action.command && "relative",
            )}
            onClick={handleActionClick}
            ref={commandRef}
          >
            <ChevronRight className="h-4 w-4 mr-1" />
            {action.title || "执行此步骤"}

            {copied && action.command && (
              <span className="absolute right-0 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                已复制到剪贴板
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface StepsProps {
  children: ReactNode
  onStepAction?: (action: StepAction) => void
}

export function Steps({ children, onStepAction }: StepsProps) {
  return (
    <div className="space-y-4">
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                key: index,
                onActionClick: onStepAction,
              })
            }
            return child
          })
        : children}
    </div>
  )
}
