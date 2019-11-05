/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Label, FieldGroup } from "../styled";
import React from "react";

interface FieldProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  name: string;
}

const Field: React.FC<FieldProps> = ({ label, name, children, ...props }) => {
  const labelId = `${name}-label`;
  const firstChild = React.Children.toArray(children)[0];
  return (
    <FieldGroup {...props}>
      <Label id={labelId}>{label}</Label>
      {firstChild &&
        React.isValidElement(firstChild) &&
        React.cloneElement(firstChild, {
          "aria-labelledby": labelId,
          name
        })}
    </FieldGroup>
  );
};

export default Field;
