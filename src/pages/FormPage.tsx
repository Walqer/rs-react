/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Card } from '../components/FormCard';
import { FormProps, Form } from '../components/Form';
import Modal from '../components/Modal';

interface FormPageState {
  cardList: FormProps[];
  modalVisibility: boolean;
}

class FormPage extends React.Component<unknown, FormPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      cardList: [],
      modalVisibility: true,
    };
  }

  closeModal = () => {
    this.setState({
      modalVisibility: false,
    });
  };

  createCard = (card: FormProps) => {
    const { cardList } = this.state;
    this.setState({
      cardList: [...cardList, card],
      modalVisibility: true,
    });
  };

  render() {
    const { cardList, modalVisibility } = this.state;
    return (
      <>
        <h1>Form page</h1>
        <section className="form-section">
          <Form createCard={this.createCard} />
          <Modal
            modalVisibility={modalVisibility}
            closeModal={this.closeModal}
            modalText="Your form has been added"
          />
          <ul className="card-list">
            {cardList.map((card) => {
              return <Card key={card.curentTime} cardData={card} />;
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default FormPage;
