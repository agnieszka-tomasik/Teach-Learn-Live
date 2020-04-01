import React, {useState, useEffect} from 'react';
import DeleteCourse from './DeleteCourse';
import "../Admin.css"

const CoursesList = (props) => {

    const updateSelectedCourse = (title) => {
        props.selectedUpdate(title);
    };

    const rendList = props.data.filter((course) => {
        return (course.title === props.filterText || props.filterText === "")
    })
    .map(course => {
        return (
            <tr className='tr' key={course.id}>
                <td className='td' onClick={() => updateSelectedCourse(course.title)}>{course.title} </td>
                <td className='td' onClick={() => updateSelectedCourse(course.title)}>{course.description} </td>
                <DeleteCourse
                    title={course.title}
                    courseListUpdate={props.coursesUpdate}
                    setDelError={props.setDelError}
                />
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default CoursesList;
