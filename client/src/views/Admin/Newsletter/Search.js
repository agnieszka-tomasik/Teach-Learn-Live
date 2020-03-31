import React from 'react';
import "../Admin.css"

const Search = (props) => {
    const filterUpdate = (text) => {
        props.filterUpdate(text.target.value);
    };

    return (
        <form>
            <input type="text" className='inputtext' placeholder="Type to Filter" onChange={filterUpdate} />
        </form>
    );

};

export default Search;
