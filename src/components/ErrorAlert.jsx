import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // SHADCN-UI Alerts
import { X } from "lucide-react"; // Ikona zamknięcia

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null; // Jeśli brak błędu, nic nie renderujemy

  return (
    <Alert variant="destructive" className="border border-red-500 mb-4">
      <X className="h-4 w-4 text-red-500 cursor-pointer" onClick={onClose} />
      <AlertTitle>Błąd</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
