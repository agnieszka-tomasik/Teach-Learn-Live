import React from 'react';

function Field({ label, children }) {
    return (
        <div className="field">
            <label className="label">
                {label}
                <div className="control">
                    {children}
                </div>
            </label>
        </div>
    );
}

export default Field;
