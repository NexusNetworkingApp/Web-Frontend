import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_URL } from '../../util/URL';
import { useParams, useNavigate } from 'react-router-dom';
import './Message.css';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Message = () => {
    const { accountId, otherAccountId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [account, setAccount] = useState(null);
    const [otherUserName, setOtherUserName] = useState('');
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleBackClick = () => {
        navigate('/chat');
    };

    useEffect(() => {
        fetchMessages();
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

    useEffect(() => {
        const socket = new SockJS(`${API_URL}/ws`);
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            console.log('Connected to WebSocket');
            stompClient.subscribe(`/user/${accountId}/queue/messages`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, [accountId, otherAccountId]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message = {
            sender: { accountId },
            receiver: { accountId: otherAccountId },
            content: newMessage,
        };

        stompClientRef.current.send('/app/sendMessage', {}, JSON.stringify(message));

        setMessages((prevMessages) => [
            ...prevMessages,
            {
                ...message,
                messageId: Date.now(),
                sender: { accountId, accountType: account.accountType, individual: account.individual, organization: account.organization }
            },
        ]);

        setNewMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="message-container">
            <div className="message-header">
                <button onClick={handleBackClick} className="back-button">Back to Chat</button>
                <h2>{otherUserName}</h2>
            </div>
            <ul className="message-list">
                {messages.map((message) => (
                    <li key={message.messageId} className={`message-item ${message.sender.accountId === account.accountId ? 'sent' : 'received'}`}>
                        <div className="message-bubble">
                            {message.sender.accountId !== account.accountId && (
                                <div className="message-sender">
                                    {message.sender.accountType === 'INDIVIDUAL' ? message.sender.individual.firstName : message.sender.organization.organizationName}
                                </div>
                            )}
                            <p>{message.content}</p>
                        </div>
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Message;