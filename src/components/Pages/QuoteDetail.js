import React, {useEffect} from 'react'
import { Route, useParams, Link } from 'react-router-dom';

import useHttp from '../../hooks/use-http';
import { getSingleQuote } from '../../lib/api';

import Comments from "../comments/Comments"
import HighlightedQuote from '../quotes/HighlightedQuote';
import LoadingSpinner from '../UI/LoadingSpinner';

const QuoteDetail = () => {
  const params = useParams();
  const {quoteID} = params;
  const {sendRequest, status, data, error} = useHttp(getSingleQuote, true);
  
  // const quote = DUMMY_DATA.find(quote => quote.id===params.quoteID);
  // if(!quote){
  //   return <p>No Page Found</p>
  // }

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  
  if(status==='pending'){
    return(
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    );
  }

  if(error){
    return(
      <p className='centered focused'>{error}</p>
    );
  }

  if(status==='complete' && !data.text){
    return(
      <p className='centered focused'>No Data Found</p>
    );
  }

  return (
    <React.Fragment>
      <HighlightedQuote text={data.text} author={data.author} />
      <div className='centered'>
        <Route path={`/quotes/${quoteID}`} exact>
          <Link className='btn--flat' to={`/quotes/${quoteID}/comments`} >Show Comments</Link>
        </Route>
        {/* <Route path={`/quotes/${quoteID}/comments`}> */}
        {/* Using the second option is better because this way we can access :quoteID inside <Comment /> */}
        <Route path="/quotes/:quoteID/comments">  
          <Comments />
        </Route>
      </div>

    </React.Fragment>
  )
}

export default QuoteDetail