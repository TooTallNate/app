/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";
import { StackedContainer, StackedItem } from "../styled";

interface StackedLabelProps {
  selected: boolean;
}

interface StackedButtonProps {
  value: any;
  selected?: any;
  onChange?(value?: any): void;
}

interface StackedButtonInputProps {
  value?: any;
  onChange?(value?: any): void;
}

const StackedLabel = styled(StackedItem.withComponent("label"))<
  StackedLabelProps
>(props =>
  props.selected
    ? {
        backgroundColor: "#7fdcf1"
      }
    : {}
);

export const StackedButton: React.FC<StackedButtonProps> = ({
  value,
  selected,
  onChange = () => {},
  children
}) => {
  return (
    <StackedLabel selected={selected === value}>
      <input
        type="radio"
        css={{
          opacity: 0,
          position: "absolute"
        }}
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
      />
      {children}
    </StackedLabel>
  );
};

const StackedButtonInput: React.FC<StackedButtonInputProps> = ({
  children,
  onChange = () => {},
  value
}) => {
  return (
    <StackedContainer>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              selected: value,
              onChange
            })
          : child
      )}
    </StackedContainer>
  );
};

export default StackedButtonInput;
