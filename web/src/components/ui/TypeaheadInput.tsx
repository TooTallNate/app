/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect, KeyboardEventHandler } from "react";
import { TextInput } from "../styled";

interface TypeaheadItem {
  title: string;
  value: any;
}

interface TypeaheadInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  items: TypeaheadItem[];
  value?: any;
  onChange?: (value: any) => void;
}

let idCounter = 0;

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  items,
  value,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onKeyDown = () => {},
  className,
  "aria-labelledby": ariaLabelledBy,
  ...props
}) => {
  const id = useState(() => idCounter++);
  const el = useRef<HTMLDivElement>(null);
  const [textValue, setTextValue] = useState<string>();
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
    } else if (value !== undefined) {
      onChange(undefined);
    }
  }, [items, onChange, textValue, value]);

  // Cycle through the autocomplete options using the arrow keys.
  const _onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
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
    onKeyDown(e);
  };

  return (
    <div
      ref={el}
      css={{
        position: "relative"
      }}
      className={className}
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={`items-${id}`}
      aria-controls={`items-${id}`}
      aria-expanded={isOpen}
    >
      <TextInput
        {...props}
        autoComplete="off"
        value={textValue}
        onChange={e => {
          setTextValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={e => {
          setIsOpen(true);
          onFocus(e);
        }}
        onBlur={e => {
          setIsOpen(false);
          setMatchedIndex(0);
          onBlur(e);
        }}
        onKeyDown={_onKeyDown}
        aria-labelledby={ariaLabelledBy}
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
          aria-labelledby={ariaLabelledBy}
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
