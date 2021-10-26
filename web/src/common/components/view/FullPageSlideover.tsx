import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment, ReactElement } from "react";
import FullPageSpinner from "../FullPageSpinner";
import Button from "../input/Button";

type FullPageSlideoverProps = {
  open: boolean;
  toggle: Function;
  title?: String;
  onclick?: Function;
  children?: ReactElement;
  loading?: boolean;
};

const FullPageSlideover = React.forwardRef<HTMLElement, FullPageSlideoverProps>(
  function FullPageSlideover(
    { open, toggle, onclick, children, title, loading, ...props },
    ref
  ) {
    const SlideoverHeader = () => (
      <div className="px-4 sm:px-6">
        <div className="flex items-start justify-between">
          {title && (
            <Dialog.Title className="flex-grow font-bold text-xl">
              {title}
            </Dialog.Title>
          )}
          <div className="ml-3 h-7 flex items-center">
            <button
              type="button"
              className="bg-white rounded-md text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => toggle(false)}
            >
              <span className="sr-only">Close panel</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
    const CloseButton = () => (
      <Button
        type="button"
        className="w-10/12 shadow-sm"
        onClick={() => toggle(false)}
      >
        Close
      </Button>
    );

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden bg-white"
          open={open}
          onClose={() => ""}
        >
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <div className="h-full flex flex-col pt-6 divide-y divide-gray-500">
              <SlideoverHeader />
              <div
                className="bg-blue mt-3 py-3 px-6 relative flex-1 overflow-y-scroll"
                children={loading ? <FullPageSpinner /> : children}
              />
              <div className="w-full bg-transparent shadow-xl p-4 flex justify-center">
                <CloseButton />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    );
  }
);

export default FullPageSlideover;
