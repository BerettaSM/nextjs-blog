import { createPortal } from 'react-dom';

import classes from './Notification.module.css';

function Notification({ notification }) {
    const { title, message, status } = notification;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    const cssClasses = `${classes.notification} ${statusClasses}`;

    return createPortal(
        <div className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>,
        document.getElementById('notifications')
    );
}

export default Notification;
