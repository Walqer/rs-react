/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';

interface ModalProps {
  modalVisibility: boolean;
  closeModal: () => void;
  modalText: string;
}

// eslint-disable-next-line react/prefer-stateless-function
class Modal extends React.Component<ModalProps> {
  render() {
    const { closeModal, modalVisibility, modalText } = this.props;
    const ModalClass = modalVisibility ? 'modal open' : 'modal';
    return (
      <div className={ModalClass} onClick={closeModal} onKeyDown={closeModal} role="dialog">
        <div
          role="contentinfo"
          className="modal__content"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <p>{modalText}</p>
          <button className="button" onClick={closeModal} type="button">
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
