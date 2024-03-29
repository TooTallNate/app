/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "tailwind.macro";
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { remToPx } from "../../utils";
import NumberInput from "./NumberInput";

const trackStyles = tw`w-full h-11 cursor-pointer border border-solid border-gray-500 rounded-lg bg-transparent`;
const thumbStyles = [
  tw`border-0 h-11 w-11 rounded-full bg-black cursor-pointer`,
  { WebkitAppearance: "none", marginTop: -1 }
];
const thumbRadiusRem = 2.75 / 2;

interface SliderInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "onChange" | "min" | "max" | "step"
  > {
  value?: number;
  onChange?(value: number): void;
  labelStep?: number;
  min?: number;
  max?: number;
  step?: number;
  labelPrecision?: number;
}

interface SliderInputRef {
  focus(): void;
}

const SliderInput = forwardRef<SliderInputRef, SliderInputProps>(
  function SliderInput(
    {
      className = "",
      onChange,
      min = 0,
      max = 100,
      step = 1,
      labelPrecision = 0,
      labelStep = step,
      ...props
    },
    ref
  ) {
    const [value, setValue] = useState(props.value || min);
    const inputElement = useRef<HTMLInputElement>(null);
    const [trackWidth, setTrackWidth] = useState(0);
    const thumbRadius = remToPx(thumbRadiusRem);
    const range = max - min;
    const progress = (value - min) / range;
    const labelCount = Math.floor(1 + range / labelStep);
    const labelWidth = (trackWidth - 2 * thumbRadius) / (labelCount - 1);
    const trackMargin = `${-(labelWidth / 2 - thumbRadius - 1.5)}px`;

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          inputElement.current!.focus();
        }
      }),
      []
    );

    useEffect(() => {
      setValue(props.value || min);
    }, [min, props.value]);

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
      <div className={`flex items-center ${className}`}>
        <NumberInput
          value={value}
          css={tw`w-16 mr-2`}
          onChange={value => {
            const clampedValue = Math.max(Math.min(value || min, max), min);
            setValue(clampedValue);
            onChange && onChange(clampedValue);
          }}
        />
        <div className="relative flex-1 h-11">
          {/* Slider Progress */}
          <div className="absolute inset-0 h-11 mx-6" aria-hidden>
            <div
              style={{ width: `${100 * progress}%` }}
              css={[
                tw`absolute bg-blue-300 top-0 bottom-0 left-0`,
                {
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
            className="absolute inset-0 h-11 flex items-center"
            style={{ marginLeft: trackMargin, marginRight: trackMargin }}
            aria-hidden
          >
            {Array.from({ length: labelCount }, (_, i) => (
              <span key={i} className="text-center text-sm flex-1 pb-px">
                {(min + labelStep * i).toFixed(labelPrecision)}
              </span>
            ))}
          </div>

          {/* Styled Range Input */}
          <input
            {...{ min, max, step, ...props }}
            value={value || 0}
            ref={inputElement}
            onChange={e => {
              const value = e.target.valueAsNumber;
              setValue(value);
              onChange && onChange(value);
            }}
            type="range"
            css={[
              tw`relative w-full mx-0 h-11 rounded-lg bg-transparent focus:outline-none focus:shadow-outline`,
              {
                WebkitAppearance: "none",
                "&::-webkit-slider-runnable-track": trackStyles,
                "&::-webkit-slider-thumb": thumbStyles,
                "&::-moz-range-track": trackStyles,
                "&::-moz-range-thumb": thumbStyles,
                "&::-moz-focus-outer": tw`border-0`,
                "&::-ms-track": tw`w-full h-11 cursor-pointer bg-transparent border-transparent text-transparent`,
                "&::-ms-fill-upper": tw`border border-solid border-gray-500 rounded-lg`,
                "&::-ms-fill-lower": tw`border border-solid border-gray-500 rounded-lg`,
                "&::-ms-thumb": thumbStyles
              }
            ]}
          />
        </div>
      </div>
    );
  }
);

export default SliderInput;
