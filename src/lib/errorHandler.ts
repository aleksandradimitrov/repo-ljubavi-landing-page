import { AxiosError, AxiosInstance } from 'axios';
import { toast } from 'sonner';
import {
  AppError,
  AxiosErrorDetails,
  ErrorHandlerConfig,
  ErrorSeverity,
  isAxiosError,
} from '@/types/errors';

/**
 * Default configuration for error handler
 */
const defaultConfig: ErrorHandlerConfig = {
  enableConsoleLogging: true,
  enableToastNotifications: true,
  logToExternalService: false,
};

let config: ErrorHandlerConfig = { ...defaultConfig };

/**
 * Extract detailed information from AxiosError
 */
export function extractAxiosErrorDetails(error: AxiosError): AxiosErrorDetails {
  return {
    message: error.message,
    status: error.response?.status,
    statusText: error.response?.statusText,
    endpoint: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    requestData: error.config?.data,
    responseData: error.response?.data,
  };
}

/**
 * Format AxiosError into user-friendly message
 */
export function formatAxiosErrorMessage(error: AxiosError): string {
  const status = error.response?.status;
  const endpoint = error.config?.url;

  // Handle common HTTP status codes
  switch (status) {
    case 400:
      return 'Invalid request. Please check your input and try again.';
    case 401:
      return 'You are not authorized. Please log in and try again.';
    case 403:
      return 'Access forbidden. You do not have permission to perform this action.';
    case 404:
      return `The requested resource was not found${endpoint ? ` at ${endpoint}` : ''}.`;
    case 408:
      return 'Request timeout. Please check your internet connection and try again.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Please try again later.';
    case 502:
      return 'Bad gateway. The server is temporarily unavailable.';
    case 503:
      return 'Service unavailable. Please try again later.';
    case 504:
      return 'Gateway timeout. The server is taking too long to respond.';
    default:
      if (status && status >= 500) {
        return 'A server error occurred. Please try again later.';
      }
      if (status && status >= 400) {
        return 'An error occurred with your request. Please try again.';
      }
      if (error.code === 'ERR_NETWORK') {
        return 'Network error. Please check your internet connection.';
      }
      if (error.code === 'ECONNABORTED') {
        return 'Request timeout. Please try again.';
      }
      return error.message || 'An unexpected error occurred.';
  }
}

/**
 * Create AppError from various error types
 */
export function createAppError(
  error: Error | AxiosError | unknown,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  context?: Record<string, any>
): AppError {
  if (isAxiosError(error)) {
    const details = extractAxiosErrorDetails(error);
    return {
      message: formatAxiosErrorMessage(error),
      code: `HTTP_${details.status || 'UNKNOWN'}`,
      severity,
      timestamp: new Date(),
      context: {
        ...context,
        ...details,
      },
      originalError: error,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      severity,
      timestamp: new Date(),
      context,
      originalError: error,
    };
  }

  return {
    message: String(error) || 'An unknown error occurred',
    severity,
    timestamp: new Date(),
    context,
  };
}

/**
 * Log error to console with formatting
 */
function logErrorToConsole(appError: AppError) {
  if (!config.enableConsoleLogging) return;

  const style = {
    [ErrorSeverity.INFO]: 'color: #3b82f6',
    [ErrorSeverity.WARNING]: 'color: #f59e0b',
    [ErrorSeverity.ERROR]: 'color: #ef4444',
    [ErrorSeverity.CRITICAL]: 'color: #dc2626; font-weight: bold',
  };

  console.group(
    `%c[${appError.severity.toUpperCase()}] ${appError.timestamp.toLocaleTimeString()}`,
    style[appError.severity]
  );
  console.error('Message:', appError.message);
  if (appError.code) console.error('Code:', appError.code);
  if (appError.context) console.error('Context:', appError.context);
  if (appError.originalError) console.error('Original Error:', appError.originalError);
  console.groupEnd();
}

/**
 * Show toast notification for error
 */
function showErrorToast(appError: AppError) {
  if (!config.enableToastNotifications) return;

  // Don't show toast for info level
  if (appError.severity === ErrorSeverity.INFO) return;

  const toastFn = {
    [ErrorSeverity.INFO]: toast.info,
    [ErrorSeverity.WARNING]: toast.warning,
    [ErrorSeverity.ERROR]: toast.error,
    [ErrorSeverity.CRITICAL]: toast.error,
  };

  toastFn[appError.severity](appError.message, {
    description: appError.code ? `Error code: ${appError.code}` : undefined,
  });
}

/**
 * Log error to external service (e.g., Sentry, LogRocket)
 */
function logErrorToExternalService(appError: AppError) {
  if (!config.logToExternalService || !config.externalServiceUrl) return;

  // TODO: Implement external error logging
  // Example: Send to Sentry, LogRocket, etc.
  console.log('Would log to external service:', appError);
}

/**
 * Main error handler function
 */
export function handleError(
  error: Error | AxiosError | unknown,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  context?: Record<string, any>
): AppError {
  const appError = createAppError(error, severity, context);

  logErrorToConsole(appError);
  showErrorToast(appError);
  logErrorToExternalService(appError);

  return appError;
}

/**
 * Handle window errors
 */
function handleWindowError(event: ErrorEvent) {
  event.preventDefault();
  handleError(event.error || new Error(event.message), ErrorSeverity.ERROR, {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
}

/**
 * Handle unhandled promise rejections
 */
function handleUnhandledRejection(event: PromiseRejectionEvent) {
  event.preventDefault();
  handleError(event.reason, ErrorSeverity.ERROR, {
    type: 'unhandled_promise_rejection',
  });
}

/**
 * Setup Axios error interceptor
 */
export function setupAxiosInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle Axios errors globally
      handleError(error, ErrorSeverity.ERROR, {
        source: 'axios_interceptor',
      });
      return Promise.reject(error);
    }
  );
}

/**
 * Initialize global error handler
 */
export function initializeErrorHandler(customConfig?: Partial<ErrorHandlerConfig>) {
  // Merge custom config with defaults
  config = { ...defaultConfig, ...customConfig };

  // Register window error handler
  window.addEventListener('error', handleWindowError);

  // Register unhandled promise rejection handler
  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  console.log('✓ Global error handler initialized');
}

/**
 * Cleanup error handler (useful for testing)
 */
export function cleanupErrorHandler() {
  window.removeEventListener('error', handleWindowError);
  window.removeEventListener('unhandledrejection', handleUnhandledRejection);
}
