/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";

interface SelectorOptionProps {
  value: any;
  title: string;
  selected: any;
  name: string;
  onChange?: (value: any) => void;
}

const SelectorOption: React.FC<SelectorOptionProps> = ({
  value,
  name,
  title = value,
  selected,
  onChange = () => {}
}) => {
  return (
    <Fragment>
      <input
        key={`${value}-input`}
        id={`${name}-${value}`}
        name={name}
        type="radio"
        css={{
          opacity: 0,
          position: "absolute"
        }}
        value={value}
        checked={value === selected}
        onChange={onChange}
      />
      <label
        key={`${value}-label`}
        htmlFor={`${name}-${value}`}
        css={{
          fontSize: "1rem",
          fontWeight: "bold",
          padding: 12,
          border: "solid #9ca1b1",
          borderWidth: "0 0 1px 0",
          "&:last-of-type": {
            borderBottomWidth: 0
          },
          "input:checked + &": {
            backgroundColor: "#7fdcf1"
          }
        }}
      >
        {title}
      </label>
    </Fragment>
  );
};

interface SelectorProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  items: { value: any; title: string }[];
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
}

let nameCounter = 0;

const Selector: React.FC<SelectorProps> = ({
  items,
  value,
  name,
  onChange = () => {},
  "aria-labelledby": ariaLabelledBy,
  className,
  id,
  ...props
}) => {
  const _name = name || `selector-${nameCounter++}`;

  return (
    <div
      {...{ className, id }}
      aria-labelledby={ariaLabelledBy}
      css={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "1px solid #9ca1b1",
        overflow: "hidden",
        "&:focus-within": {
          boxShadow: "0 0 0 1px #9ca1b1"
        }
      }}
      role="group"
    >
      {items.map(item => (
        <SelectorOption
          {...props}
          name={_name}
          selected={value}
          value={item.value}
          title={item.title}
          key={item.value}
          onChange={e => onChange(e.target.value)}
        />
      ))}
    </div>
  );
};

export default Selector;