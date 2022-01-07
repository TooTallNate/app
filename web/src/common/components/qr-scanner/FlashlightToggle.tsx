import React from "react";
import Button from "../input/Button";
import { LightningBoltIcon as LightningBoltOutlineIcon } from "@heroicons/react/outline";
import { LightningBoltIcon as LightningBoltFullIcon } from "@heroicons/react/solid";

type FlashLightToggleType = {
  torch: Boolean | undefined;
  toggle: Function;
};

export default ({ torch, toggle }: FlashLightToggleType) => {
  return (
    <>
      {torch ? (
        <Button
          type="button"
          className="mt-2 mx-auto bg-gray-900 border-gray-100"
          onClick={() => toggle(false, 500)}
          style={{ marginTop: -60, position: "relative" }}
        >
          <div className="flex flex-row inline-flex items-center">
            <div className="mx-2">{torch ? "ON" : "OFF"}</div>
            <LightningBoltFullIcon className="h-6 w-6" />
          </div>
        </Button>
      ) : (
        <Button
          type="button"
          className="mt-2 mx-auto bg-gray-100 text-gray-900"
          onClick={() => toggle(true, 500)}
          style={{ marginTop: -60, position: "relative" }}
        >
          <div className="flex flex-row inline-flex items-center">
            <div className="mx-2">{torch ? "ON" : "OFF"}</div>
            <LightningBoltOutlineIcon className="h-6 w-6" />
          </div>
        </Button>
      )}
    </>
  );
};
