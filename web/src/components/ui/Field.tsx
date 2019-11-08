import React from "react";
import { Label, Group } from "../styled";

type FieldProps = React.ComponentProps<typeof Group> & {
  label: string;
  name: string;
};

const Field: React.FC<FieldProps> = ({ label, name, children, ...props }) => {
  const labelId = `${name}-label`;
  const firstChild = React.Children.toArray(children)[0];
  return (
    <Group {...props}>
      <Label id={labelId}>{label}</Label>
      {firstChild &&
        React.isValidElement(firstChild) &&
        React.cloneElement(firstChild, {
          "aria-labelledby": labelId,
          name
        })}
    </Group>
  );
};

export default Field;
