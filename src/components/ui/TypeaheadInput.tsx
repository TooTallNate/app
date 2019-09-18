/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect, KeyboardEventHandler } from "react";

interface TypeaheadItem {
  title: string;
  value: any;
}

interface TypeaheadInputProps {
  items: TypeaheadItem[];
  labelId: string;
  value?: string;
  onChange?: (value: any) => void;
  className?: string;
  id?: string;
}

let idCounter = 0;

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  items,
  value,
  labelId,
  onChange = () => {},
  ...props
}) => {
  const id = useState(() => idCounter++);
  const el = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState("");
  const [matchedItems, setMatchedItems] = useState<TypeaheadItem[]>([]);
  const [matchedIndex, setMatchedIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  // When the external value changes, update text value.
  useEffect(() => {
    const selected = items.find(item => item.value === value);
    if (selected) {
      setTextValue(selected.title);
    }
  }, [value, items]);

  // Filter items to the ones that match the text value.
  useEffect(() => {
    const matcher = new RegExp(`^${textValue}`);
    setMatchedItems(items.filter(item => matcher.test(item.title)).slice(0, 4));
    setMatchedIndex(0);
  }, [textValue, items]);

  // Raise change event when textValue changes
  useEffect(() => {
    const selected = items.find(item => item.title === textValue);
    if (selected) {
      if (selected.value !== value) {
        onChange(selected.value);
      }
    } else if (value !== null) {
      onChange(null);
    }
  }, [items, onChange, textValue, value]);

  // Cycle through the autocomplete options using the arrow keys.
  const onKeyDown: KeyboardEventHandler = e => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        if (matchedIndex === 0) {
          setMatchedIndex(Math.max(0, matchedItems.length - 1));
        } else {
          setMatchedIndex(matchedIndex - 1);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (matchedIndex === Math.max(0, matchedItems.length - 1)) {
          setMatchedIndex(0);
        } else {
          setMatchedIndex(matchedIndex + 1);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setIsOpen(false);
        setMatchedIndex(0);
        break;
      }
      case "Enter": {
        e.preventDefault();
        setIsOpen(false);
        if (typeof matchedIndex === "number") {
          setTextValue(matchedItems[matchedIndex].value);
        }
      }
    }
  };

  return (
    <div
      ref={el}
      {...props}
      css={{
        position: "relative"
      }}
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={`items-${id}`}
      aria-controls={`items-${id}`}
      aria-expanded={isOpen}
    >
      <input
        autoComplete="off"
        css={{
          fontSize: "1rem",
          padding: "12px",
          border: "1px solid #9ca1b1",
          borderRadius: 8,
          width: "100%",
          boxSizing: "border-box",
          "&:focus": {
            boxShadow: "0 0 0 1px #9ca1b1",
            outline: "none"
          }
        }}
        value={textValue}
        onChange={e => {
          setTextValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={e => {
          setIsOpen(false);
          setMatchedIndex(0);
        }}
        onKeyDown={onKeyDown}
        aria-labelledby={labelId}
        aria-autocomplete="list"
        aria-controls="items"
        aria-activedescendant={
          typeof matchedIndex === "number"
            ? `items-${id}-${matchedIndex}`
            : undefined
        }
      />
      {matchedItems.length > 0 && (
        <ul
          id={`items-${id}`}
          role="listbox"
          aria-labelledby={labelId}
          css={{
            display: isOpen ? "block" : "none",
            position: "absolute",
            background: "white",
            width: "calc(100% - 32px)",
            margin: "0 16px",
            padding: "0 0 8px 0",
            border: "1px solid #9ca1b1",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            maxHeight: 44 * 4,
            overflowX: "auto",
            zIndex: 1
          }}
        >
          {matchedItems.map(({ value, title }, i) => (
            <li
              key={i}
              id={`items-${id}-${i}`}
              role="option"
              css={{
                listStyle: "none",
                height: 44,
                border: "none",
                background: "inherit",
                boxSizing: "border-box",
                margin: 0,
                padding: "0 16px",
                lineHeight: "44px",
                width: "100%",
                textAlign: "left",
                backgroundColor: matchedIndex === i ? "#7fdcf1" : "inherit",
                cursor: "pointer"
              }}
              onMouseDown={() => {
                setTextValue(title);
                setIsOpen(false);
              }}
              aria-selected={matchedIndex === i}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeaheadInput;
