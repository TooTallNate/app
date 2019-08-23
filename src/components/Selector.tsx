/** @jsx jsx */
import { jsx } from "@emotion/core";

interface SelectorOptionProps {
  value: string;
  selected?: string;
  title?: string;
  onClick?: (value: string) => void;
}

const SelectorOption: React.FC<SelectorOptionProps> = ({
  value,
  title = value,
  selected,
  onClick = () => {}
}) => {
  return (
    <button
      key={value}
      type="button"
      css={{
        backgroundColor: value === selected ? "#7fdcf1" : "inherit",
        fontSize: "1rem",
        fontWeight: "bold",
        padding: "12px 0",
        borderColor: "#9ca1b1",
        borderStyle: "solid",
        borderWidth: "1px 1px 0 1px",
        "&:first-of-type": {
          borderRadius: "8px 8px 0 0"
        },
        "&:last-of-type": {
          borderRadius: "0 0 8px 8px",
          borderBottomWidth: 1
        }
      }}
      onClick={() => onClick(value)}
    >
      {title}
    </button>
  );
};

interface SelectorProps {
  items: { value: string; title: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const Selector: React.FC<SelectorProps> = ({
  items,
  value,
  onChange = () => {}
}) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 4
      }}
    >
      {items.map(item => (
        <SelectorOption
          selected={value}
          value={item.value}
          title={item.title}
          key={item.value}
          onClick={() => onChange(item.value)}
        />
      ))}
    </div>
  );
};

export default Selector;
