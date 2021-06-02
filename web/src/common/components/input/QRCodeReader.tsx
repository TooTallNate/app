import { XIcon } from "@heroicons/react/outline";
import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException
} from "@zxing/library"; // use this path since v0.5.1
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useFlash } from "../../contexts/flash";
import { UrlParseFromQR } from "../../utils";
import Button from "./Button";

const codeReader = new BrowserQRCodeReader();

const QRCodeReader = () => {
  const { setMessage } = useFlash();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (open) getDeviceId();
    else reset();
  });

  const ErrorMsg = (msg: string) =>
    setMessage({ message: msg, level: "error", timeout: 2000 });

  async function getDeviceId() {
    await codeReader
      .getVideoInputDevices()
      .then(videoInputDevices => {
        setDeviceId(videoInputDevices[0].deviceId || "");
      })
      .catch(err => {
        console.error(err);
      });
  }

  function startDecode() {
    setOpen(true);
    if (!deviceId) getDeviceId();
    codeReader.decodeFromInputVideoDeviceContinuously(
      deviceId,
      "video",
      (result: any, err: any) => {
        if (result) processUrl(UrlParseFromQR(result.text));
        if (err) {
          switch (err.constructor) {
            case NotFoundException:
            case ChecksumException:
            case FormatException:
              break;
            default:
              ErrorMsg(err.message || "Uncaught error while decoding.");
              reset();
              break;
          }
        }
      }
    );
  }

  function processUrl(url: string) {
    reset();
    history.push(url);
  }

  function reset() {
    codeReader.stopContinuousDecode();
    codeReader.reset();
    setOpen(false);
  }

  const ScannerHeader = () => (
    <div className="flex items-start justify-between mb-6">
      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
        Scan QR Code
      </h2>
      <div className="ml-3 h-7 flex items-center">
        <button
          className="bg-white rounded-md text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={reset}
        >
          <span className="sr-only">Close panel</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );

  const VideoRecorder = () => (
    <video
      id="video"
      className="border-2 border-dashed border-gray-200 rounded-lg p-3"
    />
  );

  return (
    <div>
      <Button onClick={startDecode} className="w-full">
        Scan QR Code
      </Button>
      <div
        className="fixed inset-0 overflow-hidden"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
        hidden={!open}
      >
        <div className="h-full flex flex-col bg-white overflow-y-scroll p-5">
          <h2 className="sr-only" id="profile-overview-title">
            Scan QR Code
          </h2>
          <ScannerHeader />
          <div className="flex justify-center align-center mt-auto mb-auto">
            <VideoRecorder />
          </div>
          <div className="mt-auto">
            <Button
              type="button"
              className="w-full max-w-xl bg-white border border-gray-300 text-red-600 hover:bg-gray-200"
              onClick={reset}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeReader;
