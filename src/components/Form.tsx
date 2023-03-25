import React, { ChangeEvent, SyntheticEvent } from 'react';

interface FormErrors {
  [key: string]: string;
  nameError: string;
  surNameError: string;
  ageError: string;
  termsError: string;
  fileError: string;
}

export interface FormProps {
  inputName: string;
  inputLastName: string;
  inputBirthday: string;
  selectCountry: string;
  inputPersonal: boolean;
  inputSex: string;
  inputAvatar: string;
  curentTime: string;
  errors: FormErrors;
}

interface CardCreate {
  createCard: (cardData: FormProps) => void;
}

enum Size {
  Kilobyte = 1024,
  Megabyte = 1024 * 1024,
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

  private submitRef: React.RefObject<HTMLInputElement>;

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
    this.submitRef = React.createRef();
    this.state = {
      errors: {
        nameError: '',
        surNameError: '',
        ageError: '',
        termsError: '',
        fileError: '',
      },
      inputName: '',
      inputLastName: '',
      inputBirthday: '1998-08-27',
      selectCountry: 'Kazakhstan',
      inputPersonal: false,
      inputSex: 'male',
      inputAvatar: '',
      curentTime: '',
    };
  }

  isNameValid = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const name = target.value;
    if (name.length > 20 || name.length < 1) {
      return {
        result: false,
        message: `The length of the name and surname must be no more than 20 characters and no less than 1`,
      };
    }
    if (!(name[0] === name[0].toUpperCase())) {
      return {
        result: false,
        message: `The first letter should be a capital letter.`,
      };
    }
    return {
      result: true,
      message: `Name is valid`,
    };
  };

  isAgeValid = () => {
    const date = this.birthdayRef.current!.value;
    const currentDate = new Date();
    const userInputDate = new Date(date);
    const ageDifMs = currentDate.getTime() - userInputDate.getTime();
    const age = new Date(ageDifMs).getFullYear() - 1970;
    if (age < 4 || age > 100) {
      return {
        result: false,
        message: `Age cannot be less than 4 or more than 100 years`,
      };
    }
    return {
      result: true,
      message: `Age is valid`,
    };
  };

  // checkTermsAgreement = () => {
  //   if (!this.personalRef.current!.checked) {
  //     return {
  //       result: false,
  //       message: `You must agree with the terms`,
  //     };
  //   }
  //   return {
  //     result: true,
  //     message: `You agreed with the terms`,
  //   };
  // };

  checkFileSize = () => {
    const avatar = this?.avatarRef?.current?.files?.[0];
    if (avatar?.size !== undefined && avatar?.size > 5 * Size.Megabyte) {
      return {
        result: false,
        message: `Your image is not accepted it must be less than 5 MB`,
      };
    }
    return {
      result: true,
      message: `Your image is accepted`,
    };
  };

  checkValidity = () => {
    const { errors } = this.state;
    // eslint-disable-next-line no-restricted-syntax
    for (const item in errors) {
      if (errors[item]) {
        return false;
      }
    }
    return true;
  };

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.createCard(this.state);
    // После успешной отправки должен быть попап об успешной отправке
    this.nameRef.current!.value = '';
    this.lastNameRef.current!.value = '';
    this.birthdayRef.current!.value = '';
    this.countryRef.current!.value = '';
    this.personalRef.current!.checked = false;
    this.maleRef.current!.checked = true;
    this.avatarRef.current!.value = '';
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (this.nameRef.current === target) {
      const validation = this.isNameValid(event);
      if (!validation.result) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            nameError: validation.message,
          },
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            nameError: '',
          },
        }));
      }
    }
    if (this.lastNameRef.current === target) {
      const validation = this.isNameValid(event);
      if (!validation.result) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            surNameError: validation.message,
          },
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            surNameError: '',
          },
        }));
      }
    }
    if (this.birthdayRef.current === target) {
      const validation = this.isAgeValid();
      if (!validation.result) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            ageError: validation.message,
          },
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            ageError: '',
          },
        }));
      }
    }
    if (this.avatarRef.current === target) {
      const validation = this.checkFileSize();
      if (!validation.result) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            fileError: validation.message,
          },
        }));
      } else {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            fileError: '',
          },
        }));
      }
    }
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
    const { errors, inputName, inputLastName, inputBirthday, selectCountry, inputPersonal } =
      this.state;

    return (
      <form onSubmit={this.handleSubmit} className="addUserForm">
        <h2 className="form-title">Add person</h2>
        <label className="form-label" htmlFor="username">
          First Name:
          <input
            defaultValue={inputName}
            ref={this.nameRef}
            type="text"
            id="username"
            name="username"
            onChange={this.handleChange}
            required
          />
          {errors.nameError && <span className="error">{errors.nameError}</span>}
        </label>
        <label className="form-label" htmlFor="userlastname">
          Last Name:
          <input
            defaultValue={inputLastName}
            ref={this.lastNameRef}
            type="text"
            id="userlastname"
            name="userlastname"
            onChange={this.handleChange}
            required
          />
          {errors.surNameError && <span className="error">{errors.surNameError}</span>}
        </label>

        <label className="form-label" htmlFor="birthday">
          Birthday:
          <input
            defaultValue={inputBirthday}
            ref={this.birthdayRef}
            type="date"
            id="birthday"
            name="birthday"
            onChange={this.handleChange}
            required
          />
          {errors.ageError && <span className="error">{errors.ageError}</span>}
        </label>

        <label className="form-label" htmlFor="country">
          Country:
          <select
            required
            ref={this.countryRef}
            defaultValue={selectCountry}
            name="country"
            id="country"
          >
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Belorussia">Belorussia</option>
            <option value="Russia">Russia</option>
            <option value="Ukraine">Ukraine</option>
          </select>
        </label>
        <label className="form-label" htmlFor="personal">
          I consent to my personal data:
          <input
            ref={this.personalRef}
            defaultChecked={inputPersonal}
            id="personal"
            type="checkbox"
            required
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
          <input
            required
            ref={this.avatarRef}
            id="avatar"
            type="file"
            accept="image/png, image/jpeg"
            onChange={this.handleChange}
          />
          {errors.fileError && <span className="error">{errors.fileError}</span>}
        </label>

        <input
          disabled={!this.checkValidity()}
          ref={this.submitRef}
          type="submit"
          placeholder="Submit"
        />
      </form>
    );
  }
}
