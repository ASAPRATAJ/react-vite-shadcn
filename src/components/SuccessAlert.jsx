import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const SuccessAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Alert variant="success" className="border border-green-500 mb-4">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <AlertTitle>Sukces</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SuccessAlert;
