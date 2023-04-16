import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/FormCard';
import { FormCardProps, Form } from '../components/Form';
import Modal from '../components/Modal';
import IState from '../interfaces/IsearchState';
import { addCard } from '../store/searchSlice';

function FormPage() {
  const dispatch = useDispatch();
  const cardList = useSelector((state: IState) => state.search.cardList);
  const [modalVisibility, setModalVisibility] = useState(false);

  const closeModal = () => {
    setModalVisibility(false);
  };

  const createCard = (card: FormCardProps) => {
    setModalVisibility(true);
    dispatch(addCard({ ...card, inputFile: '' }));
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
