/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Label } from "../styled";
import React from "react";

interface FormFieldProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;

  const firstChild = React.Children.toArray(children)[0];

  return (
    <div {...props}>
      <Label id={labelId}>{label}</Label>
      {firstChild &&
        React.isValidElement(firstChild) &&
        React.cloneElement(firstChild, {
          "aria-labelledby": labelId,
          name
        })}
    </div>
  );
};

export default FormField;
