import React, { SyntheticEvent } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export interface FormProps {
  inputName: string;
  inputLastName: string;
  inputBirthday: string;
  selectCountry: string;
  inputPersonal: boolean;
  inputSex: string;
  inputAvatar: string;
  curentTime: string;
}

interface CardCreate {
  createCard: (cardData: FormProps) => void;
}

export class Form extends React.Component<CardCreate, FormProps> {
  private nameRef: React.RefObject<HTMLInputElement>;

  private lastNameRef: React.RefObject<HTMLInputElement>;

  private birthdayRef: React.RefObject<HTMLInputElement>;

  private countryRef: React.RefObject<HTMLSelectElement>;

  private personalRef: React.RefObject<HTMLInputElement>;

  private maleRef: React.RefObject<HTMLInputElement>;

  private femaleRef: React.RefObject<HTMLInputElement>;

  private avatarRef: React.RefObject<HTMLInputElement>;

  constructor(props: CardCreate) {
    super(props);
    this.nameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.birthdayRef = React.createRef();
    this.countryRef = React.createRef();
    this.personalRef = React.createRef();
    this.maleRef = React.createRef();
    this.femaleRef = React.createRef();
    this.avatarRef = React.createRef();
    this.state = {
      inputName: '',
      inputLastName: '',
      inputBirthday: '1998-08-27',
      selectCountry: 'kaz2',
      inputPersonal: false,
      inputSex: 'male',
      inputAvatar: '',
      curentTime: '',
    };
  }

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.createCard(this.state);
    alert('data has been saved');
    if (this.nameRef?.current?.value) this.nameRef.current.value = '';
    if (this.lastNameRef?.current?.value) this.lastNameRef.current.value = '';
    if (this.birthdayRef?.current?.value) this.birthdayRef.current.value = '';
    if (this.countryRef?.current?.value) this.countryRef.current.value = '';
    if (this.personalRef?.current?.checked) this.personalRef.current.checked = false;
    if (this.maleRef?.current?.checked === false) this.maleRef.current.checked = true;
    if (this.avatarRef?.current?.value) this.avatarRef.current.value = '';
  };

  handleChange = () => {
    this.setState({
      inputName: this.nameRef.current?.value ?? '',
      inputLastName: this.lastNameRef.current?.value ?? '',
      inputBirthday: this.birthdayRef.current?.value ?? '',
      selectCountry: this.countryRef.current?.value ?? '',
      inputPersonal: this.personalRef.current?.checked ?? false,
      inputSex: this.maleRef.current?.checked ? 'male' : 'female',
      inputAvatar: this.avatarRef.current?.files?.length
        ? URL.createObjectURL(this.avatarRef.current.files[0])
        : '',
      curentTime: new Date().toString(),
    });
  };

  render() {
    const { inputName, inputLastName, inputBirthday, selectCountry, inputPersonal } = this.state;
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="addUserForm">
        <h2>Add person</h2>
        <label className="form-label" htmlFor="username">
          First Name:
          <input
            required
            defaultValue={inputName}
            ref={this.nameRef}
            type="text"
            id="username"
            name="username"
            maxLength={20}
          />
        </label>
        <label className="form-label" htmlFor="userlastname">
          Last Name:
          <input
            defaultValue={inputLastName}
            ref={this.lastNameRef}
            type="text"
            id="userlastname"
            name="userlastname"
            required
            maxLength={20}
          />
        </label>
        <label className="form-label" htmlFor="birthday">
          Birthday:
          <input
            required
            defaultValue={inputBirthday}
            ref={this.birthdayRef}
            type="date"
            id="birthday"
            name="birthday"
          />
        </label>
        <label className="form-label" htmlFor="country">
          Country:
          <select ref={this.countryRef} defaultValue={selectCountry} name="country" id="country">
            <option value="kaz1">Kazakhstan1</option>
            <option value="kaz2">Kazakhstan2</option>
            <option value="kaz3">Kazakhstan3</option>
          </select>
        </label>
        <label className="form-label" htmlFor="personal">
          I consent to my personal data:
          <input
            ref={this.personalRef}
            defaultChecked={inputPersonal}
            id="personal"
            type="checkbox"
          />
        </label>
        <label className="form-label" htmlFor="male">
          <input ref={this.maleRef} type="radio" defaultChecked id="male" name="sex" value="male" />
          Male
        </label>
        <label className="form-label" htmlFor="female">
          <input ref={this.femaleRef} type="radio" id="female" name="sex" value="female" />
          Female
        </label>
        <label className="form-label" htmlFor="avatar">
          Add avatar
          <input ref={this.avatarRef} id="avatar" type="file" accept="image/png, image/jpeg" />
        </label>
        <input type="submit" placeholder="Submit" />
      </form>
    );
  }
}
