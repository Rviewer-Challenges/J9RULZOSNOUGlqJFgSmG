import React from 'react'
import { Message } from './Message'

export const Chat = () => {

    const user1 = {
        username: "@rafasanabria",
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
    };

    const user2 = {
        username: "@vicky",
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
    };

    const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, vero impedit ab iusto blanditiis officia dicta, facilis libero laboriosam assumenda voluptatibus, repellendus possimus officiis esse repellat tenetur aut quia inventore?";

    return (
        <div className="chat my-3 fs-6">
            <div className="container-fluid">
                <div className="row py-2 px-2">
                    <Message user={user2} message={lorem} inOut="in" />
                </div>
                <div className="row py-2 px-2">
                    <Message user={user2} message={lorem} inOut="in" />
                </div>
                <div className="row py-2 px-2">
                    <Message user={user1} message={lorem} inOut="out" />
                </div>
                <div className="row py-2 px-2">
                    <Message user={user2} message={lorem} inOut="in" />
                </div>
                <div className="row py-2 px-2">
                    <Message user={user1} message={lorem} inOut="out" />
                </div>
                <div className="row py-2 px-2">
                    <Message user={user1} message={lorem} inOut="out" />
                </div>
            </div>
        </div>
    )
}
