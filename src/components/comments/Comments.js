import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList'

import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const LoadAddCommentHandler = () => {
    setIsAddingComment(false);
  }
  
  useEffect(() => {
    sendRequest(params.quoteID)    
  },[sendRequest, params.quoteID]);

  let comment;
  if(status==='pending'){
    comment = <p>Fetching Comments...</p>
  }
  if(status==='completed' && (loadedComments.length<0)){
    comment = <div className='centered'>No Comments Found</div>
  }
  if(status==='completed' && (loadedComments.length>0)){
    comment = <CommentsList comments={loadedComments} />
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm paramID={params.quoteID} startAddCommentHandler={LoadAddCommentHandler} />}
      {comment}
    </section>
  );
};

export default Comments;
