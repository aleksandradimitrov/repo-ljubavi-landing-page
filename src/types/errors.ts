import { AxiosError } from 'axios';

/**
 * Error severity levels for categorizing errors
 */
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Custom application error with additional metadata
 */
export interface AppError {
  message: string;
  code?: string;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: Record<string, any>;
  originalError?: Error | AxiosError;
}

/**
 * Axios error details extracted for logging
 */
export interface AxiosErrorDetails {
  message: string;
  status?: number;
  statusText?: string;
  endpoint?: string;
  method?: string;
  requestData?: any;
  responseData?: any;
}

/**
 * Error handler configuration options
 */
export interface ErrorHandlerConfig {
  enableConsoleLogging?: boolean;
  enableToastNotifications?: boolean;
  logToExternalService?: boolean;
  externalServiceUrl?: string;
}

/**
 * Type guard to check if error is AxiosError
 */
export function isAxiosError(error: any): error is AxiosError {
  return error?.isAxiosError === true;
}

/**
 * Type guard to check if error is AppError
 */
export function isAppError(error: any): error is AppError {
  return error?.severity !== undefined && error?.timestamp !== undefined;
}
