import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

type ToastContextType = {
  showToast: (message: string, type?: Toast["type"]) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false); // 👈 Track if client has mounted

  useEffect(() => {
    // Runs only in the browser
    setMounted(true);
  }, []);

  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Only render portal on the client */}
      {mounted &&
        createPortal(
          <div className="fixed top-4 left-4 space-y-2 z-[9999]">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`alert font-bold shadow-lg transition-all duration-300 ${
                  toast.type === "success"
                    ? "alert-success"
                    : toast.type === "error"
                    ? "alert-error"
                    : toast.type === "info"
                    ? "alert-info"
                    : "alert-warning"
                }`}
              >
                <span>{toast.message}</span>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};