/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";

interface TypeaheadInputProps {
  className?: string;
  items: { title?: string; value: any }[];
  value?: string;
}

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  className,
  items,
  value
}) => {
  const [textValue, setTextValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const matcher = new RegExp(textValue, "i");

  const matchedItems = items.filter(item =>
    matcher.test(item.title || item.value)
  );

  const menu = (
    <ul>
      {matchedItems.map(({ value, title }, i) => (
        <li key={i}>{title || value}</li>
      ))}
    </ul>
  );

  return (
    <div className={className} css={{}}>
      <input
        css={{
          fontSize: "1rem",
          padding: "12px",
          border: "1px solid #9ca1b1",
          borderRadius: 8
        }}
        onChange={e => setTextValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && matchedItems.length > 0 && menu}
    </div>
  );
};

export default TypeaheadInput;
