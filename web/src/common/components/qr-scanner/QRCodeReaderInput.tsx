/* eslint import/no-webpack-loader-syntax: off */
import {
  BrowserQRCodeReader,
  ChecksumException,
  Exception,
  FormatException,
  NotFoundException,
  Result
} from "@zxing/library"; // use this path since v0.5.1
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFlash } from "../../contexts/flash";
import { UrlParseFromQR } from "../../utils";
import FlashlightToggle from "./FlashlightToggle";

const VIDEO_ELEMENT_ID = "qr_scanner";
const DEFAULT_VID_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: "environment" }
};

type QRCodeReaderInputProps = {
  scan: boolean;
  toggle: Function;
  processUrl?: Function;
};

const QRCodeReaderInput: React.FC<QRCodeReaderInputProps> = ({
  scan,
  toggle,
  processUrl
}) => {
  const history = useHistory();
  const { setMessage } = useFlash();

  const [loading, setLoading] = useState(true);
  const [hasTorch, setHasTorch] = useState<Boolean>(false);
  const [torch, setTorch] = useState<Boolean | undefined>(undefined);
  const [error, setError] = useState("");
  const [videoElem, setVideoElem] = useState<any>();
  const [scanner, setScanner] = useState(new BrowserQRCodeReader());

  useEffect(() => {
    if (scan && videoElem) {
      verifyDevices();
      scanner && startDecode();
    } else if (!scan) {
      resetScanner();
    }
  }, [resetScanner, scan, scanner, startDecode, verifyDevices, videoElem]);

  function resetScanner() {
    scanner && scanner.stopContinuousDecode();
    scanner && scanner.reset();
    toggle(false);
  }

  async function verifyDevices() {
    const deviceList = scanner && (await scanner.listVideoInputDevices());
    console.log(scanner);
    if (!deviceList || !deviceList[0]) {
      setMessage({
        message: "Did not find video input device",
        level: "error",
        timeout: 4000
      });
      return resetScanner();
    }
  }

  function processResult(url: string) {
    if (processUrl) {
      processUrl(UrlParseFromQR(url));
    } else {
      resetScanner();
      history.push(url);
    }
    return;
  }

  function processError(err: any) {
    switch (err.constructor) {
      case NotFoundException:
      case ChecksumException:
      case FormatException:
        break;
      default:
        setMessage({
          message: err.message || "Uncaught error while decoding.",
          level: "error",
          timeout: 4000
        });
        resetScanner();
        break;
    }
  }

  async function startDecode() {
    toggleTorch(true);
    scanner &&
      scanner.decodeFromConstraints(
        DEFAULT_VID_CONSTRAINTS,
        VIDEO_ELEMENT_ID,
        (result: Result, error: Exception | undefined) => {
          if (result) processResult(result.getText());
          if (error) processError(error);
        }
      );
  }

  function toggleTorch(toggle: boolean, timer = 2000) {
    setTorch(toggle);
    setTimeout(() => {
      // @ts-ignore
      videoElem.srcObject
        .getVideoTracks()[0]
        .applyConstraints({ advanced: [{ torch: toggle }] })
        .then(() => setHasTorch(true))
        .catch(() => setTorch(false));
    }, timer);
  }

  getVideoElement(VIDEO_ELEMENT_ID)
    .then((e: HTMLVideoElement | undefined) => {
      setVideoElem(e);
      setError("");
    })
    .catch(() => setError("Unable to create camera."))
    .finally(() => setLoading(false));

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
      <video id={VIDEO_ELEMENT_ID} style={{ position: "relative" }} />
      {hasTorch && <FlashlightToggle torch={torch} toggle={toggleTorch} />}
    </div>
  );
};

export default QRCodeReaderInput;

const rafAsync = () => new Promise(resolve => requestAnimationFrame(resolve));

async function getVideoElement(s: string) {
  let querySelector: HTMLVideoElement | undefined = undefined;
  while (querySelector === undefined) {
    await rafAsync();
    querySelector = document.getElementById(s) as HTMLVideoElement;
  }
  return querySelector;
}
