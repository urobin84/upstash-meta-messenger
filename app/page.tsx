import React from 'react';
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import {Message} from "../typings";

async function HomePage() {
    const data = await fetch('http://localhost:3000/api/getMessages')
        .then(
            res => res.json()
        )

    const messages: Message[] = data.messages

    return (
        <main>
            {/*MessageList*/}
            <MessageList initialMessages={messages} />

            {/*ChatInput*/}
            <ChatInput />
        </main>
    );
}

export default HomePage;
