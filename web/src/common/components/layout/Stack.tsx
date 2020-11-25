import React, { Children } from "react";
import { Spacing } from "./spacing";
import VerticalSpacer from "./VerticalSpacer";

interface StackProps {
  className?: string;
  spacing?: Spacing;
}

const Stack: React.FC<StackProps> = ({ children, className, spacing }) => {
  return (
    <div className={`min-h-full flex flex-col ${className}`}>
      {Children.map(children, (child, i) =>
        i === 0 ? (
          child
        ) : (
          <>
            <VerticalSpacer spacing={spacing} />
            {child}
          </>
        )
      )}
    </div>
  );
};

export default Stack;
