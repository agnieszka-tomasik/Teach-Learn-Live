import React, { useState, useEffect } from 'react';
import Search from './Search';
import EmailList from './EmailList';
import AddEmail from "./AddEmail";
import "../Admin.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { populateEmails } from '../../../store/adminSlice';
import Table from '../AdminTable';
import useErrorToast from '../../../components/ErrorToast';

const NewsletterAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const { addError } = useErrorToast();

    const emails = useSelector(state => state.admin.emails);
    const dispatch = useDispatch();
    const setEmails = (x) => dispatch(populateEmails(x));

    const emailsUpdate = (newEmails) => {
        setEmails(newEmails);
    };

    const addEmail = (email) => {
        axios.post('/admin/newsletter/add', email)
            .then(response => {
                if (response.status === 200) {
                    setEmails(response.data);

                } else {
                    console.log(`Add Email fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Add Email fail ${e}`);
                addError("Add Email fail");
            });
    };

    const filterUpdate = (value) => {
        setFilterText(value);
    };

    return (
        <div className="bg">
            <div className="row">
                <h1 className="title">Manage Newsletter Signups</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <Table
                            head={["Email"]}
                            body={
                                <EmailList
                                    data={emails}
                                    filterText={filterText}
                                    emailsUpdate={emailsUpdate}
                                />
                            }
                        />
                    </div>
                    <div className="column2">
                        <AddEmail
                            className='AddCourse'
                            addEmail={addEmail}
                            data={emails}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};


export default NewsletterAdmin;
