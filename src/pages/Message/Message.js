// Message.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import { useParams } from 'react-router-dom';
import './Message.css'; // Import the CSS file

const Message = () => {
    const { accountId, otherAccountId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [account, setAccount] = useState(null);
    const [otherUserName, setOtherUserName] = useState('');

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, [accountId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/messages/${accountId}/${otherAccountId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    useEffect(() => {
        // Fetch initial messages using RESTful API
        fetchMessages();

        // Fetch the other user's name for the header
        const fetchOtherUserName = async () => {
            try {
                const response = await axios.get(`${API_URL}/account/get-user-name/${otherAccountId}`);
                setOtherUserName(response.data);
            } catch (error) {
                console.error('Error fetching other user name:', error.message);
            }
        };

        fetchOtherUserName();
    }, [accountId, otherAccountId]);

    const handleSendMessage = async () => {
        try {
            // Send the new message using RESTful API with path variables
            await axios.post(
                `${API_URL}/message/send/${accountId}/${otherAccountId}/${newMessage}`,
            );

            // Fetch updated messages after sending a new message
            await fetchMessages();
        } catch (error) {
            console.error('Error sending or fetching messages:', error.message);
        }

        // Clear the new message input
        setNewMessage('');
    };

    return (
        <div className="message-container">
            {/* Display other user's name as a header */}
            {otherUserName && (
                <h2 className="other-user-header">{otherUserName}</h2>
            )}

            {/* Render messages */}
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.messageId} className="message-item">
                        {message.sender.accountId === account.accountId ? (
                            // If the current user is the sender
                            <p className="sent-message">You: {message.content}</p>
                        ) : (
                            // If the current user is the receiver
                            <>
                                {message.sender.accountType === 'INDIVIDUAL' && (
                                    <p className="received-message">{message.sender.individual.firstName}: {message.content}</p>
                                    // Add more fields specific to INDIVIDUAL account type
                                )}
                                {message.sender.accountType === 'ORGANIZATION' && (
                                    <p className="received-message">{message.sender.organization.organizationName}: {message.content}</p>
                                    // Add more fields specific to ORGANIZATION account type
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Input for sending new messages */}
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input-field"
                />
                <button onClick={handleSendMessage} className="send-button">Send</button>
            </div>
        </div>
    );
};

export default Message;
