import React from 'react';
import "./CoursesAdmin.css"
import UpdateCourse from './UpdateCourse';

const ViewCourse = (props) => {
    let selectedCourse = props.data.filter(course => course.courseTitle === props.title);

    if (!selectedCourse[0]){
        return (
            <div>
                <p>
                    {' '}
                    <i>Click on a course to view more information</i>
                </p>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <h2>{selectedCourse[0].courseTitle}</h2>
                <p>Description: {selectedCourse[0].courseDesc}</p>
                <UpdateCourse
                    selectedCourse={selectedCourse[0]}
                    coursesUpdate={props.coursesUpdate}
                />
            </div>
        );
    }
};
export default ViewCourse;