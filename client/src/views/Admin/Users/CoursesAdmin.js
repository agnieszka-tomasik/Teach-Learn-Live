import React, {useState, useEffect} from 'react';
import Search from './Search';
import ViewCourse from './ViewCourse';
import CoursesList from './CoursesList';
import AddCourse from "./AddCourse";
import "./CoursesAdmin.css"
import axios from 'axios';

const CoursesAdmin = (props) => {
    const [filterText, setFilterText] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState(props.courses);


    const coursesUpdate = (newCourses) => {
        setCourses(newCourses);
    };

    const addCourse = (course) => {
        axios.post('/admin/courses/add', course)
            .then(response => {
                if (response.status === 200) {
                    setCourses(response.data);
                } else {
                    console.log(`Add Course fail ${response.data}`);
                }
            }).catch(e => {
                console.log(`Add Course fail ${e}`);
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
                <h1>Manage Site Courses</h1>
            </div>

            <Search
                filterUpdate={filterUpdate}
            />
            <main>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr>
                                    <td>
                                        <b>Title Description</b>
                                    </td>
                                </tr>
                                <CoursesList
                                    data={courses}
                                    selectedUpdate={selectedUpdate}
                                    filterText={filterText}
                                    coursesUpdate={coursesUpdate}
                                />
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewCourse
                            data={courses}
                            title={selectedCourse}
                        />
                    </div>
                    <div className="column2Under">
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
