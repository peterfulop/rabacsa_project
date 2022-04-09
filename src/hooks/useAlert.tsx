import { Alert } from "@mui/material";
import { AlertColor } from "@mui/material";
import { useState } from "react";

export default function useAlert() {
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertColor, setAlertColor] = useState<AlertColor>("success");

  const setAlert = (severity: AlertColor, message: string) => {
    setIsAlert(true);
    setAlertColor(severity);
    setAlertMessage(message);
  };

  const hideAlert = () => setIsAlert(false);

  const alert = () => {
    return (
      <>
        {isAlert && (
          <Alert
            severity={alertColor}
            onClose={() => {
              setIsAlert(false);
            }}
          >
            <strong>{alertMessage}</strong>
          </Alert>
        )}
      </>
    );
  };

  return {
    isAlert,
    alert,
    setAlert,
    hideAlert,
  };
}
