import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import { useParams } from 'react-router-dom';

// ... (your imports)

const Message = () => {
    const { accountId, otherAccountId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Retrieve account information from local storage
        const storedAccount = JSON.parse(localStorage.getItem('account'));
        setAccount(storedAccount);
    }, [accountId]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/account/messages/${accountId}/${otherAccountId}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    };

    useEffect(() => {
        // Fetch initial messages using RESTful API
        fetchMessages();
    }, [accountId, otherAccountId]);

    const handleSendMessage = async () => {
        try {
            // Send the new message using RESTful API with path variables
            await axios.post(
                `${API_URL}/account/message/send/${accountId}/${otherAccountId}/${newMessage}`,
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
        <div>
            {/* Render messages */}
            <ul>
                {messages.map((message) => (
                    <li key={message.messageId}>
                        {message.sender.accountId === account.accountId ? (
                            // If the current user is the sender
                            <p>You: {message.content}</p>
                        ) : (
                            // If the current user is the receiver
                            <>
                                {message.sender.accountType === 'INDIVIDUAL' && (
                                    <p>{message.sender.individual.firstName}: {message.content}</p>
                                    // Add more fields specific to INDIVIDUAL account type
                                )}
                                {message.sender.accountType === 'ORGANIZATION' && (
                                    <p>{message.sender.organization.organizationName}: {message.content}</p>
                                    // Add more fields specific to ORGANIZATION account type
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Input for sending new messages */}
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Message;
