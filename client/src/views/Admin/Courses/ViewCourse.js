import React from 'react';
import "../Admin.css"
import UpdateCourse from './UpdateCourse';

const ViewCourse = (props) => {
    let selectedCourse = props.data.filter(course => course.title === props.title);

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
                <h2>{selectedCourse[0].title}</h2>
                <p>Description: {selectedCourse[0].description}</p>
                <UpdateCourse
                    selectedCourse={selectedCourse[0]}
                    coursesUpdate={props.coursesUpdate}
                    setUpError={props.setUpError}
                />
            </div>
        );
    }
};
export default ViewCourse;
