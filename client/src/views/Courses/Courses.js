import React from 'react';
import Card from '../../components/Card/Card';
import './Courses.css';

function Courses() {
    return <div class="container">
        <h1 class="title is-2">Courses</h1>
            <div class="course-list">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
    </div>
}

const dummyData = [
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis, ex vel convallis pulvinar, nunc ex porttitor nunc, et tincidunt ante nulla non justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ut suscipit ante. Suspendisse id mattis ex. Donec ut faucibus risus. Praesent.",
        course_id: 1,
    },
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis, ex vel convallis pulvinar, nunc ex porttitor nunc, et tincidunt ante nulla non justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ut suscipit ante. Suspendisse id mattis ex. Donec ut faucibus risus. Praesent.",
        course_id: 2,
    },
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis, ex vel convallis pulvinar, nunc ex porttitor nunc, et tincidunt ante nulla non justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ut suscipit ante. Suspendisse id mattis ex. Donec ut faucibus risus. Praesent.",
        course_id: 3,
    },
    {
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis, ex vel convallis pulvinar, nunc ex porttitor nunc, et tincidunt ante nulla non justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec ut suscipit ante. Suspendisse id mattis ex. Donec ut faucibus risus. Praesent.",
        course_id: 4,
    },
];


export default Courses;