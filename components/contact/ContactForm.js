import { useEffect, useState } from 'react';
import classes from './ContactForm.module.css';

import Notification from '@/ui/Notification';

export default function ContactForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'success' or 'error'
    const [error, setError] = useState(null);

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendContactData(contactDetails) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactDetails),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
    }

    async function sendMessageHandler(event) {
        event.preventDefault();
        setRequestStatus('pending');
        try {
            await sendContactData({
                name,
                email,
                message,
            });
            setRequestStatus('success');
            setMessage('');
            setName('');
            setEmail('');
        } catch (e) {
            setError(e.message);
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    } else if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    } else if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!',
            message: error,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        id="message"
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification notification={notification} />}
        </section>
    );
}
