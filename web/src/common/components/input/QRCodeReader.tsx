import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException
} from "@zxing/library"; // use this path since v0.5.1
import React, { useEffect, useState } from "react";

const QRCodeReader = () => {
  const codeReader = new BrowserQRCodeReader();

  const [deviceId, setDeviceId] = useState("");
  const [resultTxt, setResultTxt] = useState("");

  useEffect(() => {
    console.log("ZXing code reader initialized");
    codeReader
      .getVideoInputDevices()
      .then(videoInputDevices => {
        setDeviceId(videoInputDevices[0].deviceId || "");
      })
      .catch(err => {
        console.error(err);
      });
  });

  function decodeContinuously(selectedDeviceId: string) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result: any, err: any) => {
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result);
          codeReader.reset();
          setResultTxt(result);
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

  function startClicked() {
    alert(`STARTED >>>>>>> ${deviceId}`);
    decodeContinuously(deviceId);
  }

  function resetClicked() {
    setResultTxt("");
    codeReader.stopContinuousDecode();
    codeReader.reset();
  }

  return (
    <div>
      <section className="container" id="demo-content">
        <div>
          <button
            className="button"
            id="startButton"
            onClick={() => startClicked()}
          >
            Start
          </button>
          <br />
          <button
            className="button"
            id="resetButton"
            onClick={() => resetClicked()}
          >
            Reset
          </button>
        </div>

        <div>
          <video id="video" width="300" height="200"></video>
        </div>

        <div id="sourceSelectPanel">
          <select id="sourceSelect"></select>
        </div>

        <div>
          <select id="decoding-style">
            <option value="once">Decode once</option>
            <option value="continuously">Decode continuously</option>
          </select>
        </div>

        <label>Result:</label>
        <pre>
          <code id="result">{resultTxt}</code>
        </pre>
      </section>
    </div>
  );
};

export default QRCodeReader;
