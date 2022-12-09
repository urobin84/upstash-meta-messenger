"use client"

import React, {FormEvent, useState} from 'react';
import { v4 as uuid } from 'uuid';
import {Message} from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
    const [input, setInput] = useState('');
    const {data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);
    const addMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!input) return;

        const messageToSend = input

        setInput('')

        const id = uuid()

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: 'Muhammad Muqorrobin',
            profilePic: 'https://media-exp1.licdn.com/dms/image/C5103AQE9uNGPYBaT1A/profile-displayphoto-shrink_800_800/0/1563799935075?e=1675900800&v=beta&t=stzuZMrFaWG0J0zbhVHIOSqKyk9tPU5VnfzVijOoc-I',
            email: 'urobin84@gmail.com'
        }

        const uploadMessageToUpstash = async () => {
            const data = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                },)
            }).then(res => res.json())

            return [data.message, ...messages!]
        }

        // uploadMessageToUpstash()
        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true
        })
    }

    return (
        <form onSubmit={addMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter message here..."
                className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
                type="submit"
                disabled={!input}
                className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded text-white text-center font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Send
            </button>
        </form>
    );
}

export default ChatInput;
