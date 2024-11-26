import { MdClose } from "react-icons/md";
import "@/styles/modal.css"
import { useModal } from "@/commons/context/ModalContext";
import { useEffect, useRef } from "react";

export const Modal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const {isOpen, content, close} = useModal()

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-container">
      <div className="modal-section" ref={modalRef}>
        <button className="modal-close-button" onClick={close}>
          <MdClose />
        </button>
        {content}
      </div>
    </div>
  );
};
