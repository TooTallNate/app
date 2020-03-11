import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import { useCombobox } from "downshift";
import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface TypeaheadItem {
  title: string;
  value: any;
}

interface TypeaheadInputProps {
  items: TypeaheadItem[];
  value?: any;
  onChange?: (value: any) => void;
  sort?: "asc" | "desc";
  className?: string;
  "aria-labelledby"?: string;
}

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  items: itemsProp,
  value,
  onChange = () => {},
  className,
  sort = "asc",
  "aria-labelledby": ariaLabelledBy
}) => {
  const [items, setItems] = useState(itemsProp);
  const [inputValue, setInputValue] = useState<string | undefined>("");
  const [selectedItem, setSelectedItem] = useState<TypeaheadItem | null>(null);

  useEffect(() => {
    const selectedItem = itemsProp.find(item => item.value === value) || null;
    setSelectedItem(selectedItem);
    setInputValue(selectedItem ? selectedItem.title : "");
  }, [itemsProp, value]);

  useEffect(() => {
    if (inputValue) {
      setItems(
        itemsProp.filter(item =>
          item.title.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    } else {
      setItems(itemsProp);
    }
  }, [inputValue, itemsProp]);

  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps
  } = useCombobox<TypeaheadItem>({
    items,
    selectedItem: selectedItem as any,
    inputValue,
    labelId: ariaLabelledBy,
    onStateChange: state => {
      if (state.selectedItem !== selectedItem) {
        onChange(state.selectedItem ? state.selectedItem.value : undefined);
      }
      if (state.inputValue !== inputValue) {
        setInputValue(state.inputValue);
      }
    },
    itemToString: item => (item ? item.title : "")
  });

  return (
    <div className="relative">
      <div
        {...getComboboxProps()}
        className={`
          flex rounded-lg focus-within:shadow-outline
          ${isOpen ? "rounded-bl-none" : ""}
        `}
      >
        <TextInput
          {...getInputProps()}
          onChange={setInputValue}
          className={`
            rounded-r-none border-r-0 focus:shadow-none
            ${isOpen ? "rounded-bl-none" : ""}
          `}
        />
        <button
          type="button"
          className="px-4 border-t border-b border-gray-500 focus:outline-none"
          tabIndex={-1}
          onClick={() => {
            onChange(undefined);
          }}
        >
          <FontAwesomeIcon icon="times" />
        </button>
        <Button
          {...getToggleButtonProps()}
          type="button"
          className="rounded-l-none text-center focus:shadow-none"
          aria-label={"toggle menu"}
        >
          <FontAwesomeIcon className="text-white" icon="chevron-down" />
        </Button>
      </div>
      {isOpen && (
        <ul
          {...getMenuProps()}
          className={`
          absolute bg-white z-10 overflow-x-auto
          max-h-44 left-0 right-0 mr-12 mt-px
          border border-gray-500 rounded-b-lg
          shadow
        `}
        >
          {items.map((item, index) => (
            <li
              className={`
                h-11 px-4 flex items-center block
                ${highlightedIndex === index ? "bg-blue-300" : ""}
              `}
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeaheadInput;
