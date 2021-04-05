import { useEffect, useState } from 'react';

export const useDarkMode = () => {
    const [ theme, setTheme ] = useState("dark");
    const [ mountedComponent, setMountedComponent ] = useState(false);

    const setMode = (mode) => {
        window.localStorage.setItem("theme", mode);
        setTheme(mode);
    };
    
}