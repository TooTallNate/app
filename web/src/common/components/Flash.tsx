import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type FlashMessageLevel = "error" | "warn" | "success" | "info";

export interface FlashMessage {
  message: string;
  level: FlashMessageLevel;
  timeout?: number;
}

interface FlashProps {
  messages: FlashMessage[];
  onClose(): void;
}

interface MessageConfig {
  bg: string;
  icon: IconProp;
}

const msgConfig: { [level: string]: MessageConfig } = {
  error: {
    bg: "bg-red-400",
    icon: "times-circle"
  },
  warn: {
    bg: "bg-orange-300",
    icon: "exclamation-circle"
  },
  info: {
    bg: "bg-blue-300",
    icon: "info-circle"
  },
  success: {
    bg: "bg-green-400",
    icon: "check-circle"
  }
};

const Flash: React.FC<FlashProps> = ({ messages, onClose }) => {
  const [msg, setMsg] = useState<FlashMessage>();
  const [isOpen, setIsOpen] = useState(false);

  // Set the current message and visibility whenever the first message is new.
  useEffect(() => {
    if (msg !== messages[0]) {
      setMsg(messages[0]);
      setIsOpen(messages.length > 0);
    }
  }, [msg, messages]);

  // Enable the timeout if set.
  useEffect(() => {
    if (msg && typeof msg.timeout !== "undefined") {
      const id = setTimeout(() => setIsOpen(false), msg.timeout);
      return () => clearTimeout(id);
    }
  }, [msg]);

  return (
    <div className="z-10 fixed top-0 left-0 right-0 flex justify-center">
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={isOpen}
        classNames="flash"
        timeout={200}
        onExited={onClose}
      >
        {msg ? (
          <div
            data-testid="flash-message"
            className={`max-w-2xl w-full px-3 py-2 mt-4 shadow rounded flex ${msgConfig[msg.level].bg}`}
          >
            <FontAwesomeIcon
              className="mt-1"
              icon={msgConfig[msg.level].icon}
            />
            <div className="ml-2 mr-4 flex-1" role="alert">
              {msg && msg.message}
            </div>
            <button
              aria-label="Close Flash Message"
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon="times" />
            </button>
          </div>
        ) : (
          <div />
        )}
      </CSSTransition>
    </div>
  );
};

export default Flash;
