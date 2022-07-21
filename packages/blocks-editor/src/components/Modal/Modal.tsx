import ReactModal from "react-modal";

import "./Modal.css";

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
}: {
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
      className="Modal-TheliaBlocks"
      overlayClassName="Overlay"
    >
      <div className="Modal__Wrapper">
        <div className="Modal__Header">
          <button onClick={() => setIsOpen(false)} className="Modal__Header__Close">
            <i className="fa fa-xmark"></i>
          </button>

          <div className="Modal__Header__Title">{title}</div>
        </div>

        <div className="Modal__Content">{children}</div>
      </div>
    </ReactModal>
  );
};

export default Modal;
