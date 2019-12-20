/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "tailwind.macro";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { remToPx } from "../../utils";
import { NumberInput } from "./text-inputs";

const trackStyles = tw`w-full h-10 cursor-pointer border border-solid border-gray-500 rounded-lg bg-transparent`;
const thumbStyles = [
  tw`border-0 h-12 w-12 rounded-full bg-black cursor-pointer`,
  { WebkitAppearance: "none", marginTop: -5 }
];
const thumbRadiusRem = 3 / 2;

interface SliderInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "onChange" | "min" | "max" | "step"
  > {
  value: number;
  onChange?(value: number): void;
  labelStep?: number;
  min?: number;
  max?: number;
  step?: number;
  labelPrecision?: number;
}

const SliderInput: React.FC<SliderInputProps> = ({
  className,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  labelPrecision = 0,
  labelStep = step,
  ...props
}) => {
  const [value, setValue] = useState(props.value);
  const inputElement = useRef<HTMLInputElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const thumbRadius = remToPx(thumbRadiusRem);
  const range = max - min;
  const progress = (value - min) / range;
  const labelCount = Math.floor(1 + range / labelStep);
  const labelWidth = (trackWidth - 2 * thumbRadius) / (labelCount - 1);
  const trackMargin = `${-(labelWidth / 2 - thumbRadius - 1.5)}px`;

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    if (value !== props.value) {
      onChange && onChange(value);
    }
  }, [onChange, props.value, value]);

  useLayoutEffect(() => {
    function handler() {
      if (inputElement.current) {
        setTrackWidth(inputElement.current.clientWidth);
      }
    }
    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div className={className} css={tw`flex items-center`}>
      <NumberInput
        {...{ value, ...props }}
        css={tw`w-16 mr-2`}
        onChange={value => setValue(value || min)}
      />
      <div css={tw`relative flex-1 h-14`}>
        {/* Slider Progress */}
        <div css={[tw`absolute inset-0 h-10 my-2 mx-6`]} aria-hidden>
          <div
            css={[
              tw`absolute bg-blue-300 top-0 bottom-0 left-0`,
              {
                width: `${100 * progress}%`,
                "&::before": [
                  { content: '" "' },
                  tw`w-8 -ml-6 rounded-l-lg bg-blue-300 absolute left-0 top-0 bottom-0`
                ]
              }
            ]}
          />
        </div>

        {/* Slider Labels */}
        <div
          css={[
            tw`absolute inset-0 h-10 my-2 flex items-center`,
            { marginLeft: trackMargin, marginRight: trackMargin }
          ]}
          aria-hidden
        >
          {Array.from({ length: labelCount }, (_, i) => (
            <span key={i} css={tw`text-center text-sm flex-1`}>
              {(min + labelStep * i).toFixed(labelPrecision)}
            </span>
          ))}
        </div>

        {/* Styled Range Input */}
        <input
          {...{ value, min, max, step, ...props }}
          ref={inputElement}
          onChange={e => setValue(e.target.valueAsNumber)}
          type="range"
          css={[
            tw`relative w-full my-2 mx-0 h-10 rounded-lg bg-transparent focus:outline-none focus:shadow-outline`,
            {
              WebkitAppearance: "none",
              "&::-webkit-slider-runnable-track": trackStyles,
              "&::-webkit-slider-thumb": thumbStyles,
              "&::-moz-range-track": trackStyles,
              "&::-moz-range-thumb": thumbStyles,
              "&::-moz-focus-outer": tw`border-0`,
              "&::-ms-track": tw`w-full h-10 cursor-pointer bg-transparent border-transparent text-transparent`,
              "&::-ms-fill-upper": tw`border border-solid border-gray-500 rounded-lg`,
              "&::-ms-fill-lower": tw`border border-solid border-gray-500 rounded-lg`,
              "&::-ms-thumb": thumbStyles
            }
          ]}
        />
      </div>
    </div>
  );
};

export default SliderInput;
