import React, {useState, useEffect} from 'react';
import DeleteCourse from './DeleteCourse';
import "./CoursesAdmin.css"

const CoursesList = (props) => {

    const updateSelectedCourse = (title) => {
        props.selectedUpdate(title);
    };

    const rendList = props.data.filter((course) => {
        return (course.courseTitle === props.filterText || props.filterText === "")
    })
    .map(course => {
        return (
            <tr key={course.id}>
                <td onClick={() => updateSelectedCourse(course.courseTitle)}>{course.courseTitle} </td>
                <td onClick={() => updateSelectedCourse(course.courseTitle)}>{course.courseDesc} </td>
                <DeleteCourse
                    title={course.courseTitle}
                    courseListUpdate={props.coursesUpdate}
                />
            </tr>
        );
    });

    return <div>{rendList}</div>;
};
export default CoursesList;
