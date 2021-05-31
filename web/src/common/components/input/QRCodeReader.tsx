import {
  BrowserQRCodeReader,
  ChecksumException,
  FormatException,
  NotFoundException
} from "@zxing/library"; // use this path since v0.5.1
import React, { useState } from "react";

const QRCodeReader = () => {
  const codeReader = new BrowserQRCodeReader();

  const [deviceId, setDeviceId] = useState("");

  function decodeContinuously(selectedDeviceId: string) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result: any, err: any) => {
        const resultTxt = document.getElementById("result");
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result);
          codeReader.reset();
          if (resultTxt) resultTxt.textContent = result.text;
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
    alert(deviceId);

    console.log("STARTED >>>>>>>");
    decodeContinuously(deviceId);

    console.log(`Started decode from camera with id ${"selectedDeviceId"}`);
  }

  function resetClicked() {
    codeReader.stopContinuousDecode();
    codeReader.reset();
    console.log("RESET >>>>>>>");
  }

  window.addEventListener("load", function() {
    console.log("ZXing code reader initialized");

    codeReader
      .getVideoInputDevices()
      .then(videoInputDevices => {
        setDeviceId(videoInputDevices[0].deviceId || "");

        const btn = document.getElementById("startButton");
        const resetBtn = document.getElementById("resetButton");
        const resultTxt = document.getElementById("result");

        // btn && btn.addEventListener("click", () => {});

        resetBtn &&
          resetBtn.addEventListener("click", () => {
            codeReader.reset();
            if (resultTxt) resultTxt.textContent = "";
            console.log("Reset.");
          });
      })
      .catch(err => {
        console.error(err);
      });
  });

  return (
    <div>
      <section className="container" id="demo-content">
        <h1 className="title">Scan QR Code from Video Camera</h1>
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
          <code id="result"></code>
        </pre>

        <p>
          See the{" "}
          <a href="https://github.com/zxing-js/library/tree/master/docs/examples/qr-camera/">
            source code
          </a>{" "}
          for this example.
        </p>
      </section>
    </div>
  );
};

export default QRCodeReader;
