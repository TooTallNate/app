import React, { useEffect, useState } from "react";
import FullPageSlideover from "../components/view/FullPageSlideover";
import Button from "../components/input/Button";
import QRCodeReaderInput from "../components/input/QRCodeReaderInput";

type QRCodeReaderProps = {};

const QRCodeReader = React.forwardRef<HTMLElement, QRCodeReaderProps>(
  function QRCodeReader({}, ref) {
    const [showQrReader, setShowQrReader] = useState(false);

    return (
      <div>
        <Button onClick={() => setShowQrReader(true)} className="w-full">
          Scan QR Code
        </Button>
        <FullPageSlideover open={showQrReader} toggle={setShowQrReader}>
          <QRCodeReaderInput
            scan={showQrReader}
            children={<div id="videoDiv" />}
          />
        </FullPageSlideover>
      </div>
    );
  }
);
export default QRCodeReader;
