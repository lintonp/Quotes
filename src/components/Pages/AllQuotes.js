import React, {useEffect} from 'react'
import QuoteList from '../quotes/QuoteList';

import useHttp from '../../hooks/use-http';
import { getAllQuotes } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound'

const AllQuotes = () => {
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(getAllQuotes, true);
  // const [allQuotesData, setAllQuotesData] = useState([]);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
    
  if(status==='pending'){
    return(
      <div className='centered'>
        <LoadingSpinner />        
      </div>
    ); 
  }
  if(error){
    return(
      <p className='centered focused'>{error}</p>
    );
  }
  if(!loadedQuotes){
    return(
      <NoQuotesFound />
    );
  }

  return (
    <React.Fragment>
      <QuoteList quotes={loadedQuotes} />
    </React.Fragment>
  )
}

export default AllQuotes