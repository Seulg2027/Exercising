import { useEffect, useState } from 'react';

export const useDarkMode = () => {
    const [ theme, setTheme ] = useState("dark");
    const [ mountedComponent, setMountedComponent ] = useState(false);

    const setMode = (mode) => {
        // 'set'item
        // 로컬스토리지에 theme으로 mode를 저장
        window.localStorage.setItem("theme", mode);
        setTheme(mode);
    };
    
    // 버튼 클릭시 모드 변경해주는 함수
    const themeToggler = () =>{
        theme === "light" ? setMode("dark") : setMode("light");
    };

    useEffect(() => {
        // 'get'item
        // 로컬스토리지에서 theme을 가져와 localTheme에 저장
        const localTheme = window.localStorage.getItem("theme");
        localTheme && setTheme(localTheme);

        setMountedComponent(true);
    }, []);

    return [theme, themeToggler, mountedComponent];
};

