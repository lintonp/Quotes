import { useRef } from 'react';

import classes from './NewCommentForm.module.css';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest} = useHttp(addComment);
  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredValue = commentTextRef.current.value;
    
    // optional: Could validate here
    if(enteredValue==='' || enteredValue===null){
      console.log("Enter valid comment")
      return;
    }

    // send comment to server
    sendRequest({commentData: enteredValue, quoteId: props.paramID})

  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef} required></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
