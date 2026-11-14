import * as React from "react"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  duration?: number
}

export interface ToastAction {
  label: string
  onClick: () => void
}

type ToastListener = (toast: Toast) => void

let listeners: ToastListener[] = []
let toastCount = 0

function generateId(): string {
  return `toast-${++toastCount}-${Date.now()}`
}

function dispatch(toast: Toast): void {
  listeners.forEach((listener) => listener(toast))
}

export function toast(toastOrMessage: Toast | string, options?: Partial<Omit<Toast, "id">>) {
  const toastData: Toast =
    typeof toastOrMessage === "string"
      ? { id: generateId(), title: toastOrMessage, ...options }
      : { ...toastOrMessage, id: toastOrMessage.id || generateId() }

  dispatch(toastData)
  return toastData.id
}

toast.success = (title: string, options?: Partial<Omit<Toast, "id" | "title">>) =>
  toast({ title, variant: "success", ...options } as Toast)

toast.error = (title: string, options?: Partial<Omit<Toast, "id" | "title">>) =>
  toast({ title, variant: "error", ...options } as Toast)

toast.warning = (title: string, options?: Partial<Omit<Toast, "id" | "title">>) =>
  toast({ title, variant: "warning", ...options } as Toast)

toast.info = (title: string, options?: Partial<Omit<Toast, "id" | "title">>) =>
  toast({ title, variant: "info", ...options } as Toast)

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  React.useEffect(() => {
    const listener: ToastListener = (newToast) => {
      setToasts((prev) => [...prev, newToast])

      const duration = newToast.duration ?? 5000
      if (duration !== Infinity && duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== newToast.id))
        }, duration)
      }
    }

    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => {
    setToasts([])
  }, [])

  return { toasts, toast, dismiss, dismissAll }
}
