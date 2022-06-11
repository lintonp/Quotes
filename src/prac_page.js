import React, { useState, useEffect} from 'react'
import QuoteForm from '../quotes/QuoteForm';

import useHttp from '../../hooks/use-http'
import { addQuote } from '../../lib/api'
import { useHistory } from 'react-router-dom';

const NewQuote = () => {
  const [sendRequest, status] = useHttp(addQuote);
  // const history = useHistory();

  // useEffect(() => {
  //   if(status === 'completed' ){
  //     history.push('/quotes')
  //   }
  // });

  const onAddQuote = (data) =>{
    console.log("Adding Quote via: onAddQuote()");
    sendRequest(data);
  }
  return <QuoteForm onAddQuote={onAddQuote} />;
}

export default NewQuote