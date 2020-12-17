import { useEffect, useState } from 'react';

export const useDisplayName = (propsMessage: string | undefined, displayName: string | undefined) => {

    useEffect(() => {
        console.log(`${propsMessage} ${displayName}`);
    }, [displayName]);
};