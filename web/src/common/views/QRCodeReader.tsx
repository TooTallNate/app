import React, { useState } from "react";
import Button from "../components/input/Button";
import QRCodeReaderInput from "../components/qr-scanner/QRCodeReaderInput";
import FullPageSlideover from "../components/view/FullPageSlideover";

const QRCodeReader = React.forwardRef<HTMLElement>(function QRCodeReader(
  {},
  ref
) {
  const [showQrReader, setShowQrReader] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowQrReader(true)} className="w-full">
        Scan QR Code
      </Button>
      <FullPageSlideover
        open={showQrReader}
        toggle={setShowQrReader}
        title={"Scan QR Code"}
      >
        <div className="h-full flex flex-col justify-center align-center p-3">
          <QRCodeReaderInput scan={showQrReader} />
        </div>
      </FullPageSlideover>
    </div>
  );
});
export default QRCodeReader;
