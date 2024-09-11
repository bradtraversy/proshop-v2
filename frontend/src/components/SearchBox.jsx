import React, { useState } from 'react';
import { Button, Form, InputGroup, } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} >


      <InputGroup >

        <input
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder='Search Products...'
          className='border-none bg-transparent search-input'

        />
        <Button className='search-button' type="submit">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
