import { useEffect, useState } from 'react';

export const useDisplayName = (propsMessage: string | undefined, displayName: string | undefined) => {
    const [name, setName] = useState(displayName);

    useEffect(() => {
        console.log(`${propsMessage} ${displayName}`);
    }, [displayName]);
};