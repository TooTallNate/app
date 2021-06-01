import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException
} from "@zxing/library"; // use this path since v0.5.1
import React, { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Button from "./Button";

const codeReader = new BrowserQRCodeReader();

const QRCodeReader = () => {
  const [open, setOpen] = useState(true);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (open) {
      codeReader
        .getVideoInputDevices()
        .then(videoInputDevices => {
          setDeviceId(videoInputDevices[0].deviceId || "");
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      codeReader.reset();
    }
  });

  function startDecode() {
    setOpen(true);
    codeReader.decodeFromInputVideoDeviceContinuously(
      deviceId,
      "video",
      (result: any, err: any) => {
        //result properly found
        if (result && result.text) {
          reset();
        }

        if (err) {
          if (err instanceof NotFoundException) {
            console.log("No QR code found.");
          }

          if (err instanceof ChecksumException) {
            console.log("A code was found, but it's read value was not valid.");
          }

          if (err instanceof FormatException) {
            console.log("A code was found, but it was in a invalid format.");
          }
        }
      }
    );
  }

  function reset() {
    codeReader.stopContinuousDecode();
    codeReader.reset();
    setOpen(false);
  }

  const VideoBlock = () => (
    <div
      className="border-2 p-3 border-dashed border-gray-200 justify-center"
      aria-hidden="true"
    >
      <video id="video" className="mx-auto" />
    </div>
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
        <div className="absolute inset-0 overflow-hidden" onClick={reset}>
          <div
            className="absolute inset-0 bg-gray-900 opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={reset}
          />

          <div className="fixed inset-y-0 mt-48 w-full flex">
            <div className="w-screen">
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll rounded-t-lg">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Scan QR Code
                    </h2>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={reset}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                  {open && <VideoBlock />}
                </div>
                <div className="flex-shrink-0 px-4 py-4 flex justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default QRCodeReader;
