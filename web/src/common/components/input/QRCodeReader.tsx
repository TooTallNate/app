import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException
} from "@zxing/library"; // use this path since v0.5.1
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import { useFlash } from "../../contexts/flash";
import { UrlParseFromQR } from "../../utils";
import Button from "./Button";

const codeReader = new BrowserQRCodeReader();
const VIDEO_ELEMENT_ID = "qr_video_el";
const DEFAULT_VID_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: { facingMode: "environment" }
};

const QRCodeReader = () => {
  const { setMessage } = useFlash();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  async function startDecode() {
    setOpen(true);
    const deviceList = await codeReader.listVideoInputDevices();
    if (!deviceList || !deviceList[0]) {
      setMessage({
        message: "Did not find video input device",
        level: "error",
        timeout: 4000
      });
      return reset();
    }
    codeReader.decodeFromConstraints(
      DEFAULT_VID_CONSTRAINTS,
      VIDEO_ELEMENT_ID,
      (result: any, err: any) => {
        if (result) processUrl(UrlParseFromQR(result.text));
        if (err) {
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
      <button
        className="bg-white rounded-md text-gray-800 hover:text-gray-500 focus:shadow-outline focus:outline-none"
        onClick={reset}
      >
        <span className="sr-only">Close panel</span>
        <XIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );

  const VideoRecorder = () => (
    <div className="max-h-3/4">
      <video
        id={VIDEO_ELEMENT_ID}
        className="border-2 border-dashed border-gray-200 rounded-lg p-3"
      />
    </div>
  );

  return (
    <div>
      <Button onClick={startDecode} className="w-full">
        Scan QR Code
      </Button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={setOpen}
        >
          <Dialog.Overlay className="absolute inset-0 hidden" />

          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="h-full flex flex-col bg-white overflow-y-scroll p-5">
              <h2 className="sr-only" id="profile-overview-title">
                Scan QR Code
              </h2>
              <ScannerHeader />
              <div className="flex justify-center align-center mt-auto mb-auto">
                <VideoRecorder />
              </div>
              <div className="flex mt-auto justify-center">
                <Button
                  type="button"
                  className="w-full max-w-xl bg-white border border-gray-300 text-red-600 hover:bg-gray-200"
                  onClick={reset}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default QRCodeReader;
