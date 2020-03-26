import React from 'react';
import "./CoursesAdmin.css"

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
            </div>
        );
    }
};
export default ViewCourse;
