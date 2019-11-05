/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Label, FormGroup } from "../styled";
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
    <FormGroup {...props}>
      <Label id={labelId}>{label}</Label>
      {firstChild &&
        React.isValidElement(firstChild) &&
        React.cloneElement(firstChild, {
          "aria-labelledby": labelId,
          name
        })}
    </FormGroup>
  );
};

export default Field;
