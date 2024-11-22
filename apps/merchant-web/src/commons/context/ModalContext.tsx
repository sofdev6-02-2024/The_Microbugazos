import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface Types {
  isOpen: boolean;
  content: ReactNode;
  open: (newContent: ReactNode) => void;
  close: () => void;
}

interface Props {
  children: ReactNode;
}

const ModalContext = createContext<Types | undefined>(undefined);

export const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = (newContent: ReactNode) => {
    setIsOpen(true);
    setContent(newContent);
    document.querySelector('.body')?.classList.add('no-scrolling')
  };

  const close = () => {
    setIsOpen(false);
    setContent(null);
    document.querySelector('.body')?.classList.remove('no-scrolling')
  };

  const value = useMemo(() => {
    return { isOpen, content, open, close };
  }, [isOpen, content]);

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = (): Types => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};
