import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import io from 'socket.io-client';

const Chat = ({ projectId, currentUser, otherUser }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('join_project', projectId);
    });

    newSocket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // Load existing messages
    fetchMessages();

    return () => newSocket.close();
  }, [projectId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/chat/${projectId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        projectId,
        sender: currentUser._id,
        receiver: otherUser._id,
        message: newMessage,
        timestamp: new Date()
      };

      socket.emit('send_message', messageData);
      
      // Also save to database
      saveMessage(messageData);
      
      setNewMessage('');
    }
  };

  const saveMessage = async (messageData) => {
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData)
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          Chat with {otherUser?.name}
          <Badge bg={isConnected ? 'success' : 'danger'} className="ms-2">
            {isConnected ? 'Online' : 'Offline'}
          </Badge>
        </div>
      </Card.Header>
      <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {messages.map((message, index) => (
            <ListGroup.Item
              key={index}
              className={`d-flex ${message.sender === currentUser._id ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-3 rounded ${message.sender === currentUser._id ? 'bg-primary text-white' : 'bg-light'}`}
                style={{ maxWidth: '70%' }}
              >
                <div>{message.message}</div>
                <small className={`${message.sender === currentUser._id ? 'text-white-50' : 'text-muted'}`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </div>
            </ListGroup.Item>
          ))}
          <div ref={messagesEndRef} />
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Form onSubmit={sendMessage}>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button type="submit" variant="primary" className="ms-2">
              Send
            </Button>
          </div>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default Chat;