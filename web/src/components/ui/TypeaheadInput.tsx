/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  useState,
  useRef,
  useEffect,
  KeyboardEventHandler,
  FocusEventHandler
} from "react";
import TextInput from "./TextInput";
import typeaheadMachine, {
  TypeaheadItem,
  TypeaheadContext,
  TypeaheadEvent
} from "./TypeaheadInput.machine";
import { useMachine } from "@xstate/react";
import { StateListener } from "xstate/lib/interpreter";

interface TypeaheadInputProps
  extends Omit<React.ComponentProps<typeof TextInput>, "value" | "onChange"> {
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
  const [id] = useState(() => idCounter++);
  const [current, send, service] = useMachine(typeaheadMachine);
  const listElement = useRef<HTMLUListElement>(null);

  const isOpen = current.matches("active.matching");

  // Make sure the item option is visible.
  useEffect(() => {
    if (listElement.current) {
      const item = listElement.current.children[current.context.selectedIndex];
      if (item) item.scrollIntoView(false);
    }
  }, [current.context.selectedIndex]);

  // Emit the onChange event when the value of the typeahead machine changes.
  useEffect(() => {
    const handler: StateListener<TypeaheadContext, TypeaheadEvent> = state => {
      if (state.event.type === "SELECT") {
        const item = state.context.value;
        onChange(typeof item === "undefined" ? item : item.value);
      }
    };
    service.onTransition(handler);
    return () => {
      service.off(handler);
    };
  }, [onChange, service]);

  // Override the context of the typeahead machine when items or value change.
  useEffect(() => {
    send({ type: "OVERRIDE", items, value });
  }, [items, send, value]);

  const _onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case "ArrowUp": {
        send("PREV");
        break;
      }
      case "ArrowDown": {
        send("NEXT");
        break;
      }
      case "Enter": {
        send("SELECT");
        break;
      }
      case "Escape": {
        send("CANCEL");
        break;
      }
    }
    onKeyDown(e);
  };

  const _onFocus: FocusEventHandler<HTMLInputElement> = e => {
    send("FOCUS");
    onFocus(e);
  };

  const _onBlur: FocusEventHandler<HTMLInputElement> = e => {
    send("BLUR");
    onBlur(e);
  };

  return (
    <div
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
        value={current.context.textValue}
        onChange={value => send({ type: "TYPE", value })}
        onFocus={_onFocus}
        onBlur={_onBlur}
        onKeyDown={_onKeyDown}
        aria-labelledby={ariaLabelledBy}
        aria-autocomplete="list"
        aria-activedescendant={`items-${id}-${current.context.selectedIndex}`}
      />
      <ul
        id={`items-${id}`}
        ref={listElement}
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
        {current.context.matchedItems.map(({ title }, i) => (
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
              backgroundColor:
                current.context.selectedIndex === i ? "#7fdcf1" : "inherit",
              cursor: "pointer"
            }}
            onMouseDown={() => {
              send({ type: "SELECT", index: i });
            }}
            aria-selected={current.context.selectedIndex === i}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeaheadInput;
