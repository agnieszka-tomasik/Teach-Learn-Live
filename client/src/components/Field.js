import React from 'react';
export function Field(props) {
    return <div className="field">
        <label className="label">{props.label}</label>
        <div className="control">
            {props.children}
        </div>
    </div>;
}
