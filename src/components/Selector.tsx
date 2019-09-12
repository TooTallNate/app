/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, ChangeEventHandler } from "react";

interface SelectorOptionProps {
  value: string;
  selected?: string;
  title?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SelectorOption: React.FC<SelectorOptionProps> = ({
  value,
  title = value,
  selected,
  onChange = () => {}
}) => {
  return (
    <Fragment>
      <input
        key={`${value}-input`}
        id={value}
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
        htmlFor={value}
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

interface SelectorProps {
  items: { value: string; title: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({
  items,
  value,
  onChange = () => {}
}) => {
  return (
    <div
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
    >
      {items.map(item => (
        <SelectorOption
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
