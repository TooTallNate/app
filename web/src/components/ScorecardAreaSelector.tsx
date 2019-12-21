import React from "react";
import TypeaheadInput from "./ui/TypeaheadInput";

interface ScorecardAreaSelectorProps
  extends Omit<
    React.ComponentProps<typeof TypeaheadInput>,
    "value" | "onChange" | "items"
  > {
  value?: string;
  onChange?: (area?: string) => void;
}

const ITEMS: string[] = [
  "QUAD 10 - 13",
  "QUAD 14 - 6",
  "QUAD 3 - 9",
  "QUAD 7 - 2"
];

const ScorecardAreaSelector: React.FC<ScorecardAreaSelectorProps> = ({
  value,
  onChange = () => {},
  ...props
}) => {
  return (
    <TypeaheadInput
      {...props}
      items={ITEMS.map(value => ({ value, title: value }))}
      value={value}
      onChange={area => {
        onChange(area);
      }}
    />
  );
};

export default ScorecardAreaSelector;
