import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Message {
  text: string;
  isUser: boolean;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [generated, isGenerated] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>({
    text: "",
    isUser: false,
  });

  // This useEffect checks for the click outside of the modal

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !event.composedPath().includes(modalRef.current) &&
        !(event.target as HTMLElement).closest("input")
      ) {
        onClose();
      }
    };

    if (isOpen) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // This is to generate the system message that i am statically calling from constants and storing into messages array

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isGenerated(true);
    if (inputValue.trim()) {
      // Calling the background script to get the system message MOCKING IT NOT ACTUALLY WORKING

      chrome.runtime.sendMessage(
        { type: "getSystemMessage", text: inputValue },
        async (msg) => {
          if (msg) {
            setMessages([
              ...messages,
              { text: inputValue, isUser: true },
              { text: msg, isUser: false },
            ]);
            setLastMessage({ text: msg, isUser: false });
            setInputValue("");
          }
        },
      );
    }
  };

  // This is created specifically for input change event to make sure that input event is not propogated to the dom or the parent component

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setInputValue(e.target.value);
  };

  // This inserts the system message into the message box and focuses on the input box

  const handleInput = () => {
    const contentEditableDiv = document.querySelector(
      "div.msg-form__contenteditable",
    ) as HTMLDivElement;

    if (contentEditableDiv) {
      contentEditableDiv.focus();
      document.execCommand("insertHTML", false, lastMessage.text);
    }

    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 w-[500px]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-row gap-2 items-center ${
              msg.isUser ? "justify-end" : "justify-start"
            } `}
          >
            {msg.isUser ? (
              <UserMessage message={msg.text} />
            ) : (
              <SystemMessage message={msg.text} />
            )}
          </div>
        ))}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            value={inputValue}
            onchange={(e) => {
              inputChange(e);
            }}
          />
          <div className="flex flex-row gap-4 items-center justify-end w-full">
            {messages.length > 0 && <InsertButton onClick={handleInput} />}
            <GenerateButton disabled={!inputValue || generated} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
