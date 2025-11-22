import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeErrorHandler } from "@/lib/errorHandler";

// Initialize global error handler before rendering the app
initializeErrorHandler({
  enableConsoleLogging: true,
  enableToastNotifications: true,
  logToExternalService: false,
});

createRoot(document.getElementById("root")!).render(<App />);
