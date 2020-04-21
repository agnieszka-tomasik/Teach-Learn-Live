import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Search from './Search';
import ViewCourse from './ViewCourse';
import CoursesList from './CoursesList';
import AddCourse from "./AddCourse";
import "../Admin.css"
import axios from 'axios';
import Table from "../AdminTable";
import { populateCourses } from '../../../store/courseSlice';
import useToasts from '../../../components/Toasts';

const CoursesAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const {addError, addSuccess} = useToasts();
    const courses = useSelector(state => state.course.availableCourses);
    const dispatch = useDispatch();

    const coursesUpdate = (newCourses) => {
        dispatch(populateCourses(newCourses));
    };

    const addCourse = (course) => {
        axios.post('/admin/courses/add', course)
            .then(response => {
                if (response.status === 200) {
                    addSuccess("Successfully added course!");
                    dispatch(populateCourses(response.data));
                    
                } else {
                    console.log(`Add Course fail ${response.data}`);
                    addError(response.data);
                }
            }).catch(e => {
                console.log(`Add Course fail ${e}`);
                addError("Add Course fail");
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

            <Search filterUpdate={filterUpdate} />
            <main className='main'>
                <div className="row">
                    <div className="column1">
                        <Table head={["Title", "Description", "Price"]}
                            body={
                                <CoursesList
                                    data={courses}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    coursesUpdate={coursesUpdate}
                                />}
                        />
                    </div>
                    <div className="column2">
                        <ViewCourse
                            data={courses}
                            title={selectedCourse}
                            coursesUpdate={coursesUpdate}
                        />
                    </div>
                    <div className="column2">
                        <AddCourse
                            className='AddCourse'
                            addCourse={addCourse}
                            data={courses}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};


export default CoursesAdmin;
