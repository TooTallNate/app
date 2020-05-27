import React from "react";
import Stack from "../layout/Stack";
import { Spacing } from "../layout/spacing";

const FormGroupContent: React.FC = ({ children }) => {
  return <Stack spacing={Spacing.XS}>{children}</Stack>;
};

export default FormGroupContent;
