import { AlertCircle } from 'lucide-react';

export const FormError = ({ message }: { message: string }) => {
    if (!message) return null;
    return (
        <div className="bg-destructive/25 text-secondary-foreground flex items-center gap-2 text-xs font-medium p-3 rounded-md">
            <AlertCircle className="w-4 h-4" />
            {message}
        </div>
    );
};
