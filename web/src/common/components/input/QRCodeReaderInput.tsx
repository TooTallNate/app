import QrScanner from "qr-scanner";
import React from "react";

const VIDEO_ELEMENT_ID = "qr_scanner";
// const DEFAULT_VID_CONSTRAINTS: MediaStreamConstraints = {
//   audio: false,
//   video: { facingMode: "environment" }
// };

type QRCodeReaderInputProps = {
  scan: boolean;
  children: JSX.Element;
};

function rafAsync() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve); //faster than set time out
  });
}

async function getElement(s: string) {
  let querySelector = null;
  while (querySelector === null) {
    await rafAsync();
    querySelector = document.getElementById(s);
  }
  return querySelector;
}

const QRCodeReaderInput = React.forwardRef<
  HTMLVideoElement,
  QRCodeReaderInputProps
>(function QRCodeReaderInput({ scan, children }, ref) {
  let scanner: QrScanner | undefined;
  QrScanner.WORKER_PATH =
    "../../../../../node_modules/qr-scanner/qr-scanner.umd.min.js";

  if (!scan && scanner) {
    console.log("HERE");
    scanner.stop();
    scanner.destroy();
  }

  if (scan) {
    console.log("SCAN:::: ", scan);
    if (scanner) {
      console.log("SCAN?", scanner);
      scanner.start();
    } else {
      console.log("HEREERER");
      getElement(VIDEO_ELEMENT_ID).then(video => {
        console.log("VIDEO", video);
        scanner = new QrScanner(
          video,
          result => console.log("RESULT::: ", result),
          error => console.log("ERROR::: ", error)
        );
        scanner.start();
      });
    }
  }

  QrScanner.listCameras(true).then(x => console.log(x));

  return (
    <div>
      <div id="videoDiv" />
    </div>
  );
});

export default QRCodeReaderInput;
