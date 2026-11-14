"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Notification {
  id: string;
  title: string;
  message?: string;
  type: string;
  read: boolean;
  createdAt: string;
}

interface AppState {
  user: User | null;
  branch: { id: string; name: string; code: string } | null;
  sidebarOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
}

type Action =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_BRANCH"; payload: { id: string; name: string; code: string } | null }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_READ"; payload: string }
  | { type: "MARK_ALL_READ" };

const initialState: AppState = {
  user: null,
  branch: null,
  sidebarOpen: true,
  notifications: [],
  unreadCount: 0,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_BRANCH":
      return { ...state, branch: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload, unreadCount: action.payload.filter((n) => !n.read).length };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications], unreadCount: state.unreadCount + 1 };
    case "MARK_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.payload ? { ...n, read: true } : n)),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case "MARK_ALL_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within AppProvider");
  return context;
}
