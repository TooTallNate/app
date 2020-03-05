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
  console.log(ariaLabelledBy, value);
  const [items, setItems] = useState(itemsProp);
  const {
    isOpen,
    selectedItem,
    highlightedIndex,
    setInputValue,
    selectItem,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps
  } = useCombobox<TypeaheadItem>({
    items: items,
    labelId: ariaLabelledBy,
    onInputValueChange: ({ inputValue }) => {
      // Filter
      if (inputValue) {
        setItems(
          itemsProp.filter(item =>
            item.title.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      } else {
        setItems(itemsProp);
      }
      if (selectedItem && selectedItem.title !== inputValue) {
        onChange(null);
      }
    },
    itemToString: item => (item ? item.title : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (
        (selectedItem && selectedItem.value !== value) ||
        (!selectedItem && !!value)
      ) {
        onChange(selectedItem ? selectedItem.value : null);
      }
    }
  });

  useEffect(() => {
    if (
      (selectedItem && selectedItem.value !== value) ||
      (!selectedItem && !!value)
    ) {
      const newItem = itemsProp.find(item => item.value === value);
      selectItem(newItem as any);
      setInputValue(newItem ? newItem.title : "");
    }
  }, [selectItem, itemsProp, value, selectedItem, setInputValue]);

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
            onChange(null);
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
