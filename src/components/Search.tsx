/* eslint-disable react/prefer-stateless-function */
import React, { ChangeEvent } from 'react';

interface SearchState {
  data: string;
}

class Search extends React.Component<object, SearchState> {
  constructor(props: SearchState) {
    super(props);
    this.state = {
      data: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.searchData) this.setState({ data: localStorage.searchData });
  }

  componentWillUnmount() {
    const { data } = this.state;
    localStorage.searchData = data;
  }

  onChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    this.setState({ data: target.value });
  }

  render() {
    const { data } = this.state;
    return (
      <form className="search-form">
        <input onInput={this.onChange} name="search" type="search" defaultValue={data} />
      </form>
    );
  }
}

export default Search;
