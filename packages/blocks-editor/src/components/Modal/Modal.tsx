import ReactModal from "react-modal";
import { ReactComponent as XMarkIcon } from "../../../assets/svg/xmark.svg";

import "./Modal.css";

const Modal = ({
  modalClassName = "Modal-TheliaBlocks",
  isOpen,
  setIsOpen,
  title,
  children,
}: {
  modalClassName?: string;
  isOpen: boolean;
  setIsOpen: Function;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      className={modalClassName}
      overlayClassName="Overlay"
    >
      <div className="Modal__Wrapper">
        <div className="Modal__Header">
          <button onClick={() => setIsOpen(false)} className="Modal__Header__Close">
            <XMarkIcon />
          </button>

          <div className="Modal__Header__Title">{title}</div>
        </div>

        <div className="Modal__Content">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
