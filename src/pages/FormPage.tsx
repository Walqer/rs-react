/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Card } from '../components/Card';
import { FormProps, Form } from '../components/Form';

interface FormPageState {
  cardList: FormProps[];
}

class FormPage extends React.Component<unknown, FormPageState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      cardList: [],
    };
  }

  createCard = (card: FormProps) => {
    const { cardList } = this.state;
    this.setState({
      cardList: [...cardList, card],
    });
  };

  render() {
    const { cardList } = this.state;
    return (
      <>
        <h1>Form page</h1>
        <Form createCard={this.createCard} />
        {cardList.map((card) => {
          return <Card key={card.curentTime} cardData={card} />;
        })}
      </>
    );
  }
}

export default FormPage;
