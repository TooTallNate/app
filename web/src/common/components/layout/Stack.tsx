import React, { Children, ReactElement } from "react";
import { Spacing } from "./spacing";
import VerticalSpacer from "./VerticalSpacer";

interface StackProps {
  className?: string;
  spacing?: Spacing;
  root?: ReactElement;
}

const Stack: React.FC<StackProps> = ({
  children,
  className,
  spacing,
  root = <div />
}) => {
  return React.cloneElement(root, {
    className: `flex flex-col ${root.props.className || ""} ${className}`,
    children: Children.map(children, (child, i) =>
      i === 0 ? (
        child
      ) : (
        <>
          <VerticalSpacer spacing={spacing} />
          {child}
        </>
      )
    )
  });
};

export default Stack;
