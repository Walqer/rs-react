import React from 'react';

interface ModalProps {
  modalVisibility: boolean;
  closeModal: () => void;
  modalText?: string;
  modalComponent?: React.ReactElement;
}

export default function Modal(props: ModalProps) {
  const { closeModal, modalVisibility, modalText, modalComponent } = props;
  const ModalClass = modalVisibility ? 'modal open' : 'modal';
  return (
    <div className={ModalClass} onClick={closeModal} onKeyDown={closeModal} role="presentation">
      <div
        role="presentation"
        className="modal__content"
        onKeyDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {modalText && <p>{modalText}</p>}
        {modalComponent || ''}
        <button className="button" onClick={closeModal} type="button">
          Close
        </button>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  modalComponent: null, // или любое другое значение по умолчанию
  modalText: null,
};
