import React from 'react';
import { useToasts } from 'react-toast-notifications'
const _useToasts = () => {
    const { addToast } = useToasts();

    return {
        addError: (contents) => {
            addToast(<div>
                {contents}
            </div>, { appearance: 'error' });
        },
        addSuccess: (contents) => {
            addToast(<div>
                {contents}
            </div>, {appearance: 'success'});
        }
    };
}

export default _useToasts;