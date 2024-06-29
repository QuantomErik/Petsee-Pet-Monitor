/* 

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useBodyClass = (className) => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') {
            document.body.classList.add(className);
        } else {
            document.body.classList.remove(className);
        }

        return () => {
            document.body.classList.remove(className);
        };
    }, [className, location.pathname]);
};
 */

// src/hooks/useBodyClass.js

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const useBodyClass = (className, condition) => {
    const location = useLocation();

    useEffect(() => {
        if (condition(location)) {
            document.body.classList.add(className);
        } else {
            document.body.classList.remove(className);
        }

        return () => {
            document.body.classList.remove(className);
        };
    }, [className, location]);
};
