import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import { EmailFunctionRequest } from "@/types/emailFunctionRequest.type";
import { supabase } from "@/integrations/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function callEmailFunction(data: {
  req: EmailFunctionRequest,
  callLocal?: boolean
}) {
  const { req, callLocal = false } = data;

  try {
    if (callLocal) {
      return await axiosInstance.post('http://localhost:54321/functions/v1/send-request-email', req);
    } else {
      return await supabase.functions.invoke("send-request-email", { body: req })
    }
  } catch (err) {
    // Errors are automatically handled by the global error handler
    // Re-throw to allow caller to handle if needed
    throw err;
  }
}
