/** @jsx jsx */
import { jsx } from "@emotion/core";

interface Props {
  items: { value: string; title: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

const ButtonSelector: React.FC<Props> = ({
  items,
  value: selected,
  onChange = () => {}
}) => {
  const buttons = items.map(({ value, title }) => (
    <button
      key={value}
      type="button"
      css={{
        backgroundColor: value === selected ? "lightblue" : "inherit"
      }}
      onClick={() => onChange(value)}
    >
      {title}
    </button>
  ));
  return <div>{buttons}</div>;
};

export default ButtonSelector;
