/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Card } from '../components/FormCard';
import { FormProps, Form } from '../components/Form';
import Modal from '../components/Modal';

function FormPage() {
  const [cardList, setCardList] = useState<FormProps[]>([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  const closeModal = () => {
    setModalVisibility(false);
  };

  const createCard = (card: FormProps) => {
    setModalVisibility(true);
    setCardList((prev) => [...prev, card]);
  };

  return (
    <>
      <h1>Form page</h1>
      <section className="form-section">
        <Form createCard={createCard} />
        <Modal
          modalVisibility={modalVisibility}
          closeModal={closeModal}
          modalText="Your form has been added"
        />
        <ul className="card-list">
          {cardList.map((card) => {
            return <Card key={card.createdTime} cardData={card} />;
          })}
        </ul>
      </section>
    </>
  );
}

export default FormPage;
