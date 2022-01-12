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

  const [scanner, setScanner] = useState<BrowserQRCodeReader | null>(null);
  const [scanning, setScanning] = useState(false);
  const [hasTorch, setHasTorch] = useState<Boolean>(false);
  const [torch, setTorch] = useState<Boolean>(false);
  const [videoElem, setVideoElem] = useState<any>();

  !videoElem &&
    getVideoElement(VIDEO_ELEMENT_ID)
      .then((e: HTMLVideoElement | undefined) => {
        setVideoElem(e);
      })
      .catch(() =>
        setMessage({
          message: "Unable to create camera video element.",
          level: "error",
          timeout: 4000
        })
      );

  useEffect(() => {
    if (!scanner) setScanner(new BrowserQRCodeReader());

    if (scan && videoElem && !scanning) startDecode();
    else if (!scan) resetScanner();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scan, scanning, videoElem, resetScanner, startDecode]);

  function resetScanner() {
    scanner && scanner.stopContinuousDecode();
    scanner && scanner.reset();
    setScanning(false);
    toggle(false);
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
    setScanning(true);
    toggleTorch(false);
    scanner &&
      scanner.decodeFromConstraints(
        DEFAULT_VID_CONSTRAINTS,
        videoElem,
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

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
      {scan && <video id={VIDEO_ELEMENT_ID} style={{ position: "relative" }} />}
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
