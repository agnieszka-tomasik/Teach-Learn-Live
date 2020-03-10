import React from 'react';
export function Field(props) {
    return <div className="field">
        <label class="label">{props.label}</label>
        <div class="control">
            {props.children}
        </div>
    </div>;
}
