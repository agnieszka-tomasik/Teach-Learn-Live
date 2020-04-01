import React, {useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Search from './Search';
import ViewCourse from './ViewCourse';
import CoursesList from './CoursesList';
import AddCourse from "./AddCourse";
import "../Admin.css"
import axios from 'axios';
import { populateCourses } from '../../../store/courseSlice';

const CoursesAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const courses = useSelector(state => state.course.availableCourses);
    const dispatch = useDispatch();
    const [addError, setAddError] = useState(null);
    const [delError, setDelError] = useState(null);
    const [upError, setUpError] = useState(null);


    const coursesUpdate = (newCourses) => {
        dispatch(populateCourses(newCourses));
    };

    const addCourse = (course) => {
        axios.post('/admin/courses/add', course)
            .then(response => {
                if (response.status === 200) {
                    dispatch(populateCourses(response.data));
                    setAddError(null);
                } else {
                    console.log(`Add Course fail ${response.data}`);
                    setAddError(response.data);
                }
            }).catch(e => {
                console.log(`Add Course fail ${e}`);
                setAddError("Add Course fail");
            });
    };

    const filterUpdate = (value) => {
        setFilterText(value);
    };

    const selectedUpdate = (title) => {
        setSelectedCourse(title);
    };

    return (
        <div className="bg">
            <div className="row">
                <h1 className="title">Manage Site Courses</h1>
            </div>

            <Search filterUpdate={filterUpdate}/>
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr className='tr'>
                                    <td className='td'>
                                        <b>Title Description</b>
                                    </td>
                                </tr>
                                <CoursesList
                                    data={courses}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    coursesUpdate={coursesUpdate}
                                    setDelError={setDelError}
                                />
                                {delError && <p className="is-danger">{delError}</p>}
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewCourse
                            data={courses}
                            title={selectedCourse}
                            coursesUpdate={coursesUpdate}
                            setUpError={setUpError}
                        />
                        {upError && <p className="is-danger">{delError}</p>}
                    </div>
                    <div className="column2">
                        <AddCourse 
                            className='AddCourse' 
                            addCourse={addCourse} 
                            data={courses}
                        />
                        {addError && <p className="is-danger">{addError}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
};


export default CoursesAdmin;
