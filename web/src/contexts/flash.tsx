/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { createContext, useState, useContext, useCallback } from "react";
import Flash, { FlashMessage } from "../components/Flash";

export interface FlashContextValue {
  addMessage(message: FlashMessage): void;
  setMessage(message: FlashMessage): void;
  clearMessages(): void;
}

const FlashContext = createContext<FlashContextValue>({
  addMessage: () => {},
  setMessage: () => {},
  clearMessages: () => {}
});

const FlashProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<FlashMessage[]>([]);

  const addMessage = useCallback((message: FlashMessage) => {
    setMessages(messages => [...messages, message]);
  }, []);

  const setMessage = useCallback((message: FlashMessage) => {
    setMessages([message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages(messages => []);
  }, []);

  return (
    <FlashContext.Provider value={{ addMessage, setMessage, clearMessages }}>
      <Flash
        messages={messages}
        onClose={() => setMessages(messages => messages.slice(1))}
      />
      {children}
    </FlashContext.Provider>
  );
};

const useFlash = () => useContext(FlashContext);

export { FlashProvider, useFlash };
