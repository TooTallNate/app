import React from "react";
import { Spacing, heightClass } from "./spacing";

export interface VerticalSpacerProps {
  spacing?: Spacing;
}

const VerticalSpacer: React.FC<VerticalSpacerProps> = ({
  spacing = Spacing.M
}) => {
  return <div className={heightClass(spacing)} />;
};

export default VerticalSpacer;
