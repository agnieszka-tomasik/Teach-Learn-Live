import React, { useState, useEffect } from 'react';
import DeleteCourse from './DeleteCourse';
import "../Admin.css"

const CoursesList = (props) => {

    const updateSelectedCourse = (title) => {
        props.selectedUpdate(title);
    };

    const rendList = props.data.filter((course) => {
        return (course.title && course.title.includes(props.filterText) || props.filterText === "")
    })
        .map(course => {
            return (
                <tr className='tr' key={course.id}>
                    <td className='td' onClick={() => updateSelectedCourse(course.title)}>{course.title} </td>
                    <td className='td' onClick={() => updateSelectedCourse(course.title)}>{course.description} </td>
                    <td>
                        <DeleteCourse
                            title={course.title}
                            courseListUpdate={props.coursesUpdate}
                            setDelError={props.setDelError}
                        />
                    </td>
                </tr>
            );
        });
    return rendList;
};
export default CoursesList;
