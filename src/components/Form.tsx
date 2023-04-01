/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';

export interface FormProps {
  inputName: string;
  inputLastName: string;
  inputBirthday: string;
  selectCountry: string;
  inputPersonal: boolean;
  inputSex: string;
  inputFile: FileList;
  createdTime: number;
  avatarLink: string;
}

interface CardCreate {
  createCard: (cardData: FormProps) => void;
}

enum Size {
  Kilobyte = 1024,
  Megabyte = 1024 * 1024,
}

const checkFileSize = (fileList: FileList) => {
  const avatar = fileList[0];
  if (!avatar) {
    return 'Avatar is required';
  }
  if (avatar.size > 5 * Size.Megabyte) {
    return `Avatar size should be less than 5MB`;
  }
  return true;
};

export function Form(props: CardCreate) {
  const { createCard } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormProps>();

  const onSubmit = (data: FormProps) => {
    const formData = {
      ...data,
      avatarLink: URL.createObjectURL(data.inputFile[0]),
      createdTime: new Date().getTime(),
    };
    createCard(formData);
    reset();
  };
  const today = new Date();
  const minAge = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
  const maxAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="addUserForm">
      <h2 className="form-title">Add person</h2>
      <label className="form-label" htmlFor="username">
        First Name:
        <input
          {...register('inputName', {
            required: 'Name is required',
            maxLength: {
              value: 20,
              message: 'The length of the name and surname must be no more than 20 characters',
            },
            pattern: {
              value: /^[А-ЯЁA-Z]/,
              message: 'The first letter should be a capital letter.',
            },
          })}
        />
        {errors.inputName && <span className="error">{errors.inputName.message}</span>}
      </label>
      <label className="form-label" htmlFor="userlastname">
        Last Name:
        <input
          {...register('inputLastName', {
            required: 'Name is required',
            maxLength: {
              value: 20,
              message: 'The length of the name and surname must be no more than 20 characters',
            },
            pattern: {
              value: /^[А-ЯЁA-Z]/,
              message: 'The first letter should be a capital letter.',
            },
          })}
        />
        {errors.inputLastName && <span className="error">{errors.inputLastName.message}</span>}
      </label>
      <label className="form-label" htmlFor="birthday">
        Birthday:
        <input
          type="date"
          {...register('inputBirthday', {
            required: 'Age is required',
            max: {
              value: `${minAge}`,
              message: 'Age cannot be less than 4 years',
            },
            min: {
              value: `${maxAge}`,
              message: 'Age cannot be more than 100 years',
            },
          })}
        />
        {errors.inputBirthday && <span className="error">{errors.inputBirthday.message}</span>}
      </label>
      <label className="form-label" htmlFor="country">
        Country:
        <select
          {...register('selectCountry', {
            required: 'You must select country',
          })}
        >
          <option value="">Select country</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Belorussia">Belorussia</option>
          <option value="Russia">Russia</option>
          <option value="Ukraine">Ukraine</option>
        </select>
        {errors.selectCountry && <span className="error">{errors.selectCountry.message}</span>}
      </label>
      <label className="form-label" htmlFor="personal">
        I consent to my personal data:
        <input
          type="checkbox"
          {...register('inputPersonal', { required: 'You must agree with the terms' })}
        />
        {errors.inputPersonal && <span className="error">{errors.inputPersonal.message}</span>}
      </label>
      <label className="form-label" htmlFor="male">
        <input
          id="male"
          {...register('inputSex', { required: 'You must select gender' })}
          type="radio"
          value="male"
        />
        Male
      </label>
      <label className="form-label" htmlFor="female">
        <input
          id="female"
          {...register('inputSex', { required: 'You must select gender' })}
          type="radio"
          value="female"
        />
        Female
      </label>
      {errors.inputSex && <span className="error">{errors.inputSex.message}</span>}
      <label className="form-label" htmlFor="avatar">
        Add avatar
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register('inputFile', {
            required: 'You must add image',
            validate: (value) => checkFileSize(value),
          })}
        />
        {errors.inputFile && <span className="error">{errors.inputFile.message}</span>}
      </label>
      <input type="submit" placeholder="Submit" />
    </form>
  );
}
