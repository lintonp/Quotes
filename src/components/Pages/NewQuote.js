import React, { useEffect} from 'react'
import QuoteForm from '../quotes/QuoteForm';

import useHttp from '../../hooks/use-http';
import { addQuote } from '../../lib/api'
import { useHistory } from 'react-router-dom';

const NewQuote = () => {
  const history = useHistory();
  const {sendRequest, status} = useHttp(addQuote);

  useEffect(() => {
    if(status === 'completed'){
      history.push('/quotes');      
    }
  }, [status, history]);

  const onAddQuote = (data) =>{
    sendRequest(data);
  }
  return (
    <QuoteForm onAddQuote={onAddQuote} />
  )
}

export default NewQuote