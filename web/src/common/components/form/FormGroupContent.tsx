import React from "react";
import Stack from "../layout/Stack";
import { Spacing } from "../layout/spacing";

const FormGroupContent: React.FC = ({ children }) => {
  return (
    <Stack className="pl-8" spacing={Spacing.XS}>
      {children}
    </Stack>
  );
};

export default FormGroupContent;
