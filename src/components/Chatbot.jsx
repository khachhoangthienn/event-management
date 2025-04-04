import React, { useState, useEffect, useRef } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageCircle, Send, X, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { axiosPublic } from '@/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 'welcome', text: 'Hello! I am the virtual assistant for Event Management. How can I assist you?', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isTyped: true }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const chatbotPositionRef = useRef({ x: 0, y: 0 });

    const [bottyEmotion, setBottyEmotion] = useState('happy');

    useEffect(() => {
        if (!isOpen) {
            const button = document.getElementById('chatButton');
            if (button) {
                const rect = button.getBoundingClientRect();
                chatbotPositionRef.current = {
                    x: rect.right,
                    y: rect.bottom
                };
            }
        }
    }, [isOpen]);

    const toggleChatbot = () => {
        if (isOpen) {
            resetChat()
            const chatCard = document.getElementById('chatCard');
            if (chatCard) {
                chatCard.style.transition = 'all 0.3s ease-in-out';
                chatCard.style.transform = 'scale(0.5)';
                chatCard.style.opacity = '0';
                chatCard.style.transformOrigin = 'bottom right';

                setTimeout(() => setIsOpen(false), 500);
            } else {
                setIsOpen(false);
            }
        } else {
            setIsOpen(true);
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Reset chat history
    const resetChat = () => {
        setMessages([
            { id: 'welcome-' + Date.now(), text: 'Hello! I am the virtual assistant for Event Management. How can I assist you?', sender: 'bot', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isTyped: true }
        ]);
    };

    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const msgId = 'user-' + Date.now();

        // Add user message to chat
        const userMessage = { id: msgId, text: inputText, sender: 'user', time: currentTime, isTyped: true };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);
        setBottyEmotion('thinking');

        try {
            // Send message to backend
            const response = await axiosPublic.post('/api/chatbot/send', {
                message: inputText
            });

            // Bot response
            const botResponse = response.data.message;
            const botMsgId = 'bot-' + Date.now();

            setTimeout(() => {
                setIsTyping(false);
                setBottyEmotion('happy');
                setMessages(prev => [...prev, {
                    id: botMsgId,
                    text: botResponse,
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isTyped: false // Will be animated
                }]);

                // Mark as typed after animation completes
                setTimeout(() => {
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === botMsgId ? { ...msg, isTyped: true } : msg
                        )
                    );
                }, botResponse.length * 15 + 300);
            }, 1500);
        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            setTimeout(() => {
                const errorMsgId = 'error-' + Date.now();
                setIsTyping(false);
                setBottyEmotion('happy');
                setMessages(prev => [...prev, {
                    id: errorMsgId,
                    text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isTyped: false
                }]);

                setTimeout(() => {
                    setMessages(prev =>
                        prev.map(msg =>
                            msg.id === errorMsgId ? { ...msg, isTyped: true } : msg
                        )
                    );
                }, 1000);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // Botty Animation Component
    const BottyAvatar = ({ emotion }) => {
        // Different SVG expressions based on emotion
        const expressions = {
            happy: (
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="45" fill="#0c4a6e" />
                    <circle cx="35" cy="40" r="5" fill="white" />
                    <circle cx="65" cy="40" r="5" fill="white" />
                    <path d="M 30 60 Q 50 75 70 60" stroke="white" strokeWidth="3" fill="none" />
                </svg>
            ),
            thinking: (
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="45" fill="#0c4a6e" />
                    <circle cx="35" cy="40" r="5" fill="white" />
                    <circle cx="65" cy="40" r="5" fill="white" />
                    <path d="M 30 65 Q 50 65 70 65" stroke="white" strokeWidth="3" fill="none" />
                    <circle cx="75" cy="30" r="8" fill="white" opacity="0.6" />
                    <circle cx="85" cy="20" r="5" fill="white" opacity="0.4" />
                </svg>
            ),
            excited: (
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="45" fill="#0c4a6e" />
                    <path d="M 30 35 Q 35 30 40 35" stroke="white" strokeWidth="3" fill="none" />
                    <path d="M 60 35 Q 65 30 70 35" stroke="white" strokeWidth="3" fill="none" />
                    <path d="M 30 60 Q 50 80 70 60" stroke="white" strokeWidth="3" fill="none" />
                </svg>
            )
        };

        return (
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-cyan-100 animate-pulse">
                <img src="/chatbotgif.webp" alt="Chatbot" />
            </div>
        );
    };

    // Typing animation component for message reveal
    const TypingMessage = ({ message, isTyped }) => {
        const [displayedText, setDisplayedText] = useState('');
        const [isComplete, setIsComplete] = useState(isTyped);

        useEffect(() => {
            if (!message || isTyped) {
                setDisplayedText(message);
                setIsComplete(true);
                return;
            }

            let index = 0;
            const typeInterval = setInterval(() => {
                if (index <= message.length) {
                    setDisplayedText(message.substring(0, index));
                    index++;
                } else {
                    clearInterval(typeInterval);
                    setIsComplete(true);
                }
            }, 15); // Speed of typing

            return () => clearInterval(typeInterval);
        }, [message, isTyped]);

        if (isTyped) {
            return <div>{message}</div>;
        }

        return (
            <div>
                {displayedText}
                {!isComplete && <span className="animate-pulse">|</span>}
            </div>
        );
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        id="chatButton"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={toggleChatbot}
                                        className="h-16 w-16 rounded-full hover:scale-125 bg-cyan-900 hover:bg-cyan-800 transition-all duration-300 shadow-lg flex items-center justify-center"
                                        aria-label="Open chat assistant"
                                    >
                                        <div className="relative scale-125">
                                            <BottyAvatar />
                                        </div>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Open chatbot assistant</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <div
                        id="chatCard"
                        initial={{
                            scale: 0.5,
                            opacity: 0,
                            x: window.innerWidth - chatbotPositionRef.current.x,
                            y: window.innerHeight - chatbotPositionRef.current.y
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            x: 0,
                            y: 0
                        }}
                        exit={{
                            scale: 0.5,
                            opacity: 0,
                            x: window.innerWidth - chatbotPositionRef.current.x,
                            y: window.innerHeight - chatbotPositionRef.current.y
                        }}
                        transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        className="origin-bottom-right"
                    >
                        <Card className="w-80 md:w-96 h-[520px] shadow-2xl flex flex-col overflow-hidden bg-gradient-to-b from-cyan-50 to-white">
                            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-cyan-900 to-cyan-800 text-white">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <BottyAvatar emotion={bottyEmotion} />
                                    </div>
                                    <CardTitle className="text-base font-medium">Event Management Assistant</CardTitle>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={resetChat}
                                        className="h-8 w-8 text-white hover:bg-cyan-800 rounded-full"
                                        aria-label="New conversation"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={toggleChatbot}
                                        className="h-8 w-8 text-white hover:bg-cyan-800 rounded-full"
                                        aria-label="Close chat"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('/chat-bg.png')] bg-opacity-5">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                            x: message.sender === 'bot' ? -10 : 10
                                        }}
                                        animate={{ opacity: 1, y: 0, x: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="h-10 w-10 mr-2 flex-shrink-0">
                                                <BottyAvatar emotion="happy" />
                                            </div>
                                        )}

                                        <div
                                            className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm ${message.sender === 'bot'
                                                ? 'bg-white text-gray-800 rounded-bl-sm'
                                                : 'bg-cyan-900 text-white rounded-br-sm'
                                                }`}
                                        >
                                            <TypingMessage
                                                message={message.text}
                                                isTyped={message.isTyped}
                                            />
                                            <div className={`text-xs mt-1 ${message.sender === 'bot' ? 'text-gray-500' : 'text-cyan-100'}`}>
                                                {message.time}
                                            </div>
                                        </div>

                                        {message.sender === 'user' && (
                                            <Avatar className="h-10 w-10 ml-2 flex-shrink-0">
                                                <AvatarFallback className="bg-cyan-800 text-white">U</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="h-10 w-10 mr-2 flex-shrink-0">
                                            <BottyAvatar emotion="thinking" />
                                        </div>
                                        <div className="rounded-2xl px-4 py-3 bg-white text-gray-800 shadow-sm">
                                            <div className="flex space-x-1 items-center">
                                                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="h-2 w-2 bg-cyan-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </CardContent>

                            <CardFooter className="p-3 border-t bg-white">
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Enter message..."
                                        value={inputText}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="flex-1 border-cyan-200 focus-visible:ring-cyan-500"
                                    />
                                    <Button
                                        onClick={sendMessage}
                                        size="icon"
                                        className="bg-cyan-900 hover:bg-cyan-800 transition-all duration-300"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;