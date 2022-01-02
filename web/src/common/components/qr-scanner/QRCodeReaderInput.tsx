/* eslint import/no-webpack-loader-syntax: off */

import QrScannerWorkerPath from "!!file-loader!./qr-scanner-worker.min.js";
import { LightningBoltIcon as LightningBoltOutlineIcon } from "@heroicons/react/outline";
import { LightningBoltIcon as LightningBoltFullIcon } from "@heroicons/react/solid";
import QrScanner from "qr-scanner";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../input/Button";
import { useFlash } from "../../contexts/flash";

QrScanner.WORKER_PATH = QrScannerWorkerPath;

const VIDEO_ELEMENT_ID = "qr_scanner";

type QRCodeReaderInputProps = {
  scan: boolean;
};

const QRCodeReaderInput: React.FC<QRCodeReaderInputProps> = ({ scan }) => {
  const history = useHistory();
  const { setMessage } = useFlash();

  const [loading, setLoading] = useState(true);
  const [torch, setTorch] = useState<Boolean | undefined>(undefined);
  const [error, setError] = useState("");
  const [videoElem, setVideoElem] = useState<HTMLVideoElement>();
  const [scanner, setScanner] = useState<QrScanner>();

  const handleUrl = (url: string) => {
    reset();
    history.push(url);
  };

  const handleError = (e: string) => {
    switch (e.toLowerCase()) {
      case "no qr code found":
        break;
      default:
        setMessage({
          message: e || "Uncaught error while decoding.",
          level: "error",
          timeout: 4000
        });
        reset();
        break;
    }
  };

  useEffect(() => {
    if (!loading && scan && !scanner && videoElem) {
      setScanner(
        new QrScanner(videoElem, r => handleUrl(r), e => handleError(e))
      );
    }
  }, [handleError, handleUrl, loading, scan, scanner, videoElem]);

  useEffect(() => {
    if (scan && scanner) {
      scanner.start().then(() => {
        scanner.hasFlash().then(hasTorch => {
          if (hasTorch) setTorch(true);
        });
      });
    }
    if (!scan && scanner) reset();
  }, [reset, scan, scanner]);

  const reset = useCallback(() => {
    scanner && scanner.stop();
    scanner && scanner.destroy();
  });

  useEffect(() => {
    if (scanner && torch === true) scanner.turnFlashOn();
    if (scanner && torch === false) scanner.turnFlashOff();
  }, [scanner, torch]);

  getElement(VIDEO_ELEMENT_ID)
    .then((e: HTMLVideoElement | undefined) => {
      setVideoElem(e);
      setError("");
    })
    .catch(() => setError("Unable to create camera."))
    .finally(() => setLoading(false));

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
      <video id={VIDEO_ELEMENT_ID} />
      {torch !== undefined && (
        <Button
          type="button"
          className={`mt-2 mx-auto ${!torch && "bg-gray-700 border-none"}`}
          onClick={() => setTorch(!torch)}
        >
          <div className="flex flex-row inline-flex items-center">
            <div className="mx-2">{torch ? "ON" : "OFF"}</div>
            {torch && (
              <LightningBoltFullIcon className="h-6 w-6" aria-hidden="true" />
            )}
            {torch === false && (
              <LightningBoltOutlineIcon
                className="h-6 w-6"
                aria-hidden="true"
              />
            )}
          </div>
        </Button>
      )}
    </div>
  );
};

const rafAsync = () => new Promise(resolve => requestAnimationFrame(resolve));

async function getElement(s: string) {
  let querySelector: HTMLVideoElement | undefined = undefined;
  while (querySelector === undefined) {
    await rafAsync();
    querySelector = document.getElementById(s) as HTMLVideoElement;
  }
  return querySelector;
}

export default QRCodeReaderInput;
