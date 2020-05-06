import React from "react";
import { Spacing, widthClass } from "./spacing";

export interface VerticalSpacerProps {
  spacing?: Spacing;
}

const HorizontalSpacer: React.FC<VerticalSpacerProps> = ({
  spacing = Spacing.M
}) => {
  return <div className={widthClass(spacing)} />;
};

export default HorizontalSpacer;
