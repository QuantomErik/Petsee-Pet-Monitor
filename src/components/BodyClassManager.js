/* 

import { useBodyClass } from '../hooks/useBodyClass';

const BodyClassManager = () => {
    useBodyClass('no-padding-bottom');
    return null;
};

export default BodyClassManager */

// src/components/BodyClassManager.js

import { useBodyClass } from '../hooks/useBodyClass';

const BodyClassManager = () => {
    useBodyClass('login-page', location => location.pathname === '/login');
    return null
};

export default BodyClassManager;
