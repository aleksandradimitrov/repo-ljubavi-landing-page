export interface EmailFunctionRequest {
    email: string;
    name: string;
    language: string;
    details: {
        message: string;
        timestamp: string;
    };
} 