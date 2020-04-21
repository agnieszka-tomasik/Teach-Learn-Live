import React, { useState, useEffect } from 'react';
import Search from './Search';
import ViewUser from './ViewUser';
import UsersList from './UsersList';
import AddUser from "./AddUser";
import "../Admin.css"
import axios from 'axios';
import Table from '../AdminTable';
import { useSelector, useDispatch } from 'react-redux';
import { populateUsers } from '../../../store/adminSlice';
import useToasts from '../../../components/Toasts';

const UsersAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const {addError} = useToasts();

    //todo refactor
    const users = useSelector(state => state.admin.users);
    const dispatch = useDispatch();
    const setUsers = (x) => dispatch(populateUsers(x));

    const usersUpdate = (newUsers) => {
        console.log(newUsers);
        setUsers(newUsers);
    };

    const addUser = (user) => {
        axios.post('/admin/users/add', user)
            .then(response => {
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.log(`Add User fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Add User fail ${e}`);
                addError("Add User fail");
            });
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
                <h1 className="title">Manage Site Users</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <Table head={["Username", "Email"]}
                            body={
                                <UsersList
                                    data={users}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    usersUpdate={usersUpdate}
                                />
                            }
                        />
                    </div>
                    <div className="column2">
                        <ViewUser
                            data={users}
                            uname={selectedUser}
                            usersUpdate={usersUpdate}
                        />
                    </div>
                    <div className="column2">
                        <AddUser
                            className='AddCourse'
                            addUser={addUser}
                            data={users}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};


export default UsersAdmin;
