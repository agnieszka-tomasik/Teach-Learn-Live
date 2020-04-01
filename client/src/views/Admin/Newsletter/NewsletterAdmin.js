import React, {useState, useEffect} from 'react';
import Search from './Search';
import EmailList from './EmailList';
import AddEmail from "./AddEmail";
import "../Admin.css"
import axios from 'axios';

const NewsletterAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [emails, setEmails] = useState(props.emails);
    const [addError, setAddError] = useState(null);
    const [delError, setDelError] = useState(null);


    const emailsUpdate = (newEmails) => {
        setEmails(newEmails);
    };

    const addEmail = (email) => {
        axios.post('/admin/newsletter/add', email)
            .then(response => {
                if (response.status === 200) {
                    setEmails(response.data);
                    setAddError(null);
                } else {
                    console.log(`Add Email fail ${response.data}`);
                    setAddError(response.data);
                }
            }).catch(e => {
                console.log(`Add Email fail ${e}`);
                setAddError("Add Email fail");
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
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr className='tr'>
                                    <td className='td'>
                                        <b>Email</b>
                                    </td>
                                </tr>
                                <EmailList
                                    data={emails}
                                    filterText={filterText}
                                    emailsUpdate={emailsUpdate}
                                    setDelError={setDelError}
                                />
                                {delError && <p className="is-danger">{delError}</p>}
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <AddEmail 
                            className='AddCourse' 
                            addEmail={addEmail} 
                            data={emails}
                        />
                        {addError && <p className="is-danger">{addError}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};


export default NewsletterAdmin;
