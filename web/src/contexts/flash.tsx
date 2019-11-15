/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tw from "tailwind.macro";

export interface FlashMessage {
  message: string;
  level: "error" | "warn" | "success" | "info";
  timeout?: number;
}

export interface FlashContextValue {
  addMessage(message: FlashMessage): void;
  clearMessages(): void;
}

const FlashContext = createContext<FlashContextValue>({
  addMessage: () => {},
  clearMessages: () => {}
});

interface FlashProps {
  message: FlashMessage;
  onClose(): void;
}

const Flash: React.FC<FlashProps> = ({ message, onClose }) => {
  const { message: text, level, timeout } = message;

  useEffect(() => {
    if (typeof timeout !== "undefined") {
      const id = setTimeout(onClose, timeout);
      return () => clearTimeout(id);
    }
  }, [message, onClose, timeout]);

  return (
    <div css={tw`fixed top-0 left-0 right-0 flex justify-center`}>
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
            "info"
          }
        />
        <div css={tw`ml-2 mr-4 flex-1`}>{text}</div>
        <button aria-label="Close Flash Message" onClick={onClose}>
          <FontAwesomeIcon icon="times" />
        </button>
      </div>
    </div>
  );
};

const FlashProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<FlashMessage[]>([]);

  const addMessage = useCallback((message: FlashMessage) => {
    setMessages(messages => [...messages, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(messages => []);
  }, []);

  return (
    <FlashContext.Provider value={{ addMessage, clearMessages }}>
      {messages.length > 0 && (
        <Flash
          message={messages[0]}
          onClose={() => setMessages(messages => messages.slice(1))}
        />
      )}
      {children}
    </FlashContext.Provider>
  );
};

const useFlash = () => useContext(FlashContext);

export { FlashProvider, useFlash };
