import React, {useState, useEffect} from 'react';
import Search from './Search';
import ViewUser from './ViewUser';
import UsersList from './UsersList';
import "../../Admin/Admin.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { populateUsers } from '../../../store/adminSlice';

const UsersMod = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedUser, setSelectedUser] = useState('');

    //todo refactor
    const users = useSelector(state => state.admin.users);
    const dispatch = useDispatch();
    const setUsers = (x) => dispatch(populateUsers(x));

    const [addError, setAddError] = useState(null);
    const [delError, setDelError] = useState(null);
    const [upError, setUpError] = useState(null);


    const usersUpdate = (newUsers) => {
        console.log(newUsers);
        setUsers(newUsers);
    };

    const filterUpdate = (value) => {
        setFilterText(value);
    };

    const selectedUpdate = (uname) => {
        setSelectedUser(uname);
    };

    return (
        <div className="bg">
            <div className="row">
                <h1 className="title">Manage Forum Users</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table is-striped is-hoverable">
                                <tr className='tr'>
                                    <td className='tr'>
                                        <b>Username</b>
                                    </td>
                                </tr>
                                <UsersList
                                    data={users}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    usersUpdate={usersUpdate}
                                    setDelError={setDelError}
                                />
                                {delError && <p className="is-danger">{delError}</p>}
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewUser
                            data={users}
                            uname={selectedUser}
                            usersUpdate={usersUpdate}
                            setUpError={setUpError}
                        />
                        {upError && <p className="is-danger">{delError}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};


export default UsersMod;
