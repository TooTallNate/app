/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tw from "tailwind.macro";
import { CSSTransition } from "react-transition-group";

export interface FlashMessage {
  message: string;
  level: "error" | "warn" | "success" | "info";
  timeout?: number;
}

interface FlashProps {
  messages: FlashMessage[];
  onClose(): void;
}

const Flash: React.FC<FlashProps> = ({ messages, onClose }) => {
  const [currentMessage, setCurrentMessage] = useState<FlashMessage>();
  const [isOpen, setIsOpen] = useState(false);

  const { message: text, level, timeout } = currentMessage || {};

  // Set the current message and visibility whenever the first message is new.
  useEffect(() => {
    if (currentMessage !== messages[0]) {
      setCurrentMessage(messages[0]);
      setIsOpen(messages.length > 0);
    }
  }, [currentMessage, messages]);

  // Enable the timeout if set.
  useEffect(() => {
    if (typeof timeout !== "undefined") {
      const id = setTimeout(() => setIsOpen(false), timeout);
      return () => clearTimeout(id);
    }
  }, [timeout]);

  return (
    <div css={tw`fixed top-0 left-0 right-0 flex justify-center`}>
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        classNames="flash"
        timeout={200}
        onExited={onClose}
      >
        <div
          data-testid="flash-message"
          css={[
            tw`max-w-2xl w-full px-3 py-2 mt-4 shadow rounded flex`,
            level === "error" && tw`bg-red-400`,
            level === "warn" && tw`bg-orange-300`,
            level === "info" && tw`bg-blue-300`,
            level === "success" && tw`bg-green-400`
          ]}
        >
          <FontAwesomeIcon
            css={tw`mt-1`}
            icon={
              (level === "error" && "times-circle") ||
              (level === "warn" && "exclamation-circle") ||
              (level === "info" && "info-circle") ||
              (level === "success" && "check-circle") ||
              "info-circle"
            }
          />
          <div css={tw`ml-2 mr-4 flex-1`} role="alert">
            {text || ""}
          </div>
          <button
            aria-label="Close Flash Message"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Flash;
