import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { TypeaheadItem } from "../../common/components/input/TypeaheadInput";
import Divider from "../../common/components/layout/Divider";

interface DropdownOptions {
  options: TypeaheadItem[];
  value: TypeaheadItem;
  setValue: React.Dispatch<React.SetStateAction<TypeaheadItem>>;
}

export const Dropdown: React.FC<DropdownOptions> = ({
  options,
  value,
  setValue
}) => (
  <div className="flex justify-end mb-6">
    <Listbox value={value} onChange={setValue}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button
              className={`relative inline-flex items-center p-2 border border-gray-300 focus:outline-none focus:ring-none focus:border-gray-900 ${
                open ? "rounded-t-lg" : "rounded-lg"
              }`}
            >
              <span className="ml-3 block truncate mr-10">
                Filter: {value && value.title}
              </span>
              <SelectorIcon
                className="h-6 w-6 text-gray-900"
                aria-hidden="true"
              />
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="w-full absolute z-10 bg-white border border-gray-300 rounded-b-lg focus:outline-none">
                {options.map((type, i) => (
                  <>
                    {i > 0 && <Divider />}
                    <Listbox.Option
                      key={type.value}
                      value={type}
                      className="p-2"
                    >
                      <span>{type.title}</span>
                    </Listbox.Option>
                  </>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  </div>
);
