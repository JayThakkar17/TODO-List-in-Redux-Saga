import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, updatePost } from '../../Sagas/userSagas';
import ReactTooltip from 'react-tooltip';

function AddPost({ selectedUser }) {
  const [text, setText] = useState('');
  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    if (selectedUser && Object.keys(selectedUser).length > 0) {
      setText(selectedUser.name);
      setIsEdited(true);
    }
  }, [selectedUser]);

  const dispatch = useDispatch();
  const addPostSelector = useSelector((state) => state.users);
  const { loading, users, error } = addPostSelector;

  const changeHandler = (e) => {
    setText(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEdited) {
      dispatch(updatePost({ id: selectedUser.id, item: text }));
      console.log(users);
      //   dispatch(sortArray());
    } else {
      const obj = { id: users.length + 1, name: text };
      dispatch(addPost(obj));
      setText('');
    }
  };

  return (
    <div style={{ marginLeft: '32%' }}>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          onChange={changeHandler}
          value={text || ''}
          required
        />
        <input
          data-tip={isEdited ? 'Update' : 'Add'}
          type='submit'
          value={isEdited ? 'UPDATE' : 'ADD'}
          className='btn btn-primary'
        />
        <ReactTooltip place='top' type='dark' effect='solid' />
        <button className="btn btn-primary">CANCEL</button>
      </form>
    </div>
  );
}

export default AddPost;
