import React from 'react';
import { useToasts } from 'react-toast-notifications'
const useErrorToast = () => {
    const { addToast } = useToasts();

    return {addError: (contents) => {
        addToast(<div>
            {contents}
        </div>, {appearance:'error'});
    }};
}

export default useErrorToast