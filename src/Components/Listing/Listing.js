import { useEffect, useState } from 'react';
import { fetchUsers } from '../../Sagas/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { deletePost } from '../../Sagas/userSagas';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Listing.css';
import AddPost from '../AddPost/AddPost';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState('');

  const dispatch = useDispatch();
  const usersStore = useSelector((state) => state.users);
  const { loading, users, error } = usersStore;

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const userList =
    users &&
    users.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>
            <button
              onClick={() => {
                if (window.confirm('Are You Sure, You Want To Delete It ?')) {
                  dispatch(deletePost(user.id));
                }
              }}
              className='btn btn-danger'
            >
              DELETE
            </button>
            <button
              className='btn btn-primary'
              onClick={() => setSelectedUser(user)}
            >
              UPDATE
            </button>
          </td>
        </tr>
      );
    });

  return (
    <div className='container'>
      <AddPost selectedUser={selectedUser} />
      {loading && <h1>'Loading...'</h1>}
      {error && <h1>'Something Went Wrong'</h1>}
      {users && users.length > 0 && (
        <div>
          <h1>Users</h1>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{userList}</tbody>
          </Table>
        </div>
      )}{' '}
    </div>
  );
};

export default Home;
