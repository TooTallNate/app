/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect } from "react";

interface TypeaheadInputProps {
  className?: string;
  items: { title?: string; value: any }[];
  value?: string;
  onChange?: (value: any) => void;
}

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  className,
  items,
  value,
  onChange = () => {}
}) => {
  const blurTimeout = useRef<number>();
  const input = useRef<HTMLInputElement>(null);
  const [textValue, setTextValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // When the external value changes, update text value.
  useEffect(() => {
    const selected = items.find(item => item.value === value);
    if (selected) {
      setTextValue(selected.title || selected.value.toString());
    }
  }, [value, items]);

  // Filter items to the ones that match the text value.
  const matcher = new RegExp(textValue);
  const matchedItems = items.filter(item =>
    matcher.test(item.title || item.value.toString())
  );

  // When an child element focuses, ensure that the menu stays open.
  const onFocus = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }
    setIsOpen(true);
  };

  // When a child element blurs, start to close the menu,
  // but let it be cancelled if another element focuses.
  const onBlur = () => {
    if (blurTimeout.current) {
      clearTimeout(blurTimeout.current);
    }
    blurTimeout.current = setTimeout(() => {
      setIsOpen(false);
      // When the entire input blurs, trigger the change event.
      const selected = items.find(
        ({ title, value }) => (title || value).toString() === textValue
      );
      onChange(selected ? selected.value : null);
    });
  };

  const menu = (
    <ul
      css={{
        position: "absolute",
        padding: 0,
        background: "white",
        width: "calc(100% - 32px)",
        margin: "0 16px",
        border: "1px solid #9ca1b1",
        borderTop: "none",
        borderRadius: "0 0 8px 8px",
        maxHeight: 44 * 4,
        overflowX: "auto"
      }}
    >
      {matchedItems.map(({ value, title }, i) => (
        <li
          key={i}
          css={{
            listStyle: "none",
            height: 44
          }}
        >
          <button
            css={{
              border: "none",
              background: "inherit",
              boxSizing: "border-box",
              margin: 0,
              padding: "0 16px",
              lineHeight: "44px",
              width: "100%",
              height: "100%",
              textAlign: "left"
            }}
            onClick={() => {
              setTextValue(title || value);
              if (input.current) {
                input.current.focus();
              }
              setIsOpen(false);
              onChange(value);
            }}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            {title || value}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={className}
      css={{
        position: "relative"
      }}
    >
      <input
        ref={input}
        css={{
          fontSize: "1rem",
          padding: "12px",
          border: "1px solid #9ca1b1",
          borderRadius: 8,
          width: "100%",
          boxSizing: "border-box"
        }}
        value={textValue}
        onChange={e => {
          setTextValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isOpen && matchedItems.length > 0 && menu}
    </div>
  );
};

export default TypeaheadInput;
