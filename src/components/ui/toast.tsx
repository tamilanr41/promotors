"use client";
import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

type ToastVariant = "default" | "success" | "error" | "warning" | "info"

interface Toast {
  id: string
  message: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | null>(null)

function useToastContext() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("Toast components must be used within ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const newToast: Toast = { ...toast, id }
      setToasts((prev) => [...prev, newToast])
    },
    []
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const iconMap: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const variantStyles: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  success: "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-100",
  error: "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-100",
  warning:
    "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
  info: "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-100",
}

function ToastContainer() {
  const { toasts, removeToast } = useToastContext()

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onClose: () => void
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const variant = toast.variant ?? "default"
  const Icon = iconMap[variant]

  React.useEffect(() => {
    if (toast.duration !== Infinity && toast.duration !== 0) {
      const timer = setTimeout(onClose, toast.duration ?? 5000)
      return () => clearTimeout(timer)
    }
  }, [toast.duration, onClose])

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-right-full",
        variantStyles[variant]
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

interface ToastAction {
  label: string
  onClick: () => void
}

function toast(message: string, variant?: ToastVariant, duration?: number) {
  const event = new CustomEvent<Omit<Toast, "id">>("toast", {
    detail: { message, variant, duration },
  })
  window.dispatchEvent(event)
}

toast.success = (message: string, duration?: number) =>
  toast(message, "success", duration)
toast.error = (message: string, duration?: number) =>
  toast(message, "error", duration)
toast.warning = (message: string, duration?: number) =>
  toast(message, "warning", duration)
toast.info = (message: string, duration?: number) =>
  toast(message, "info", duration)

export { ToastProvider, toast, useToastContext }
export type { Toast, ToastVariant }
