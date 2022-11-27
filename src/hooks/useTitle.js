import { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - LapStore`;
    }, [title]);
};

export default useTitle;
