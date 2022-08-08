import { getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom';
import FChatContext from '../context/FChatContext';
import { FormMessage } from './FormMessage';
import { Message } from './Message'

export const Chat = () => {

    const {userData} = useContext (FChatContext);  
    const [messages, setMessages] = useState<[]> ([]);

    if (! userData) return <Navigate to="/login" replace />;


    const user1 = {
        username: "@rafasanabria",
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
    };

    const user2 = {
        username: "@vicky",
        avatar: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
    };

    const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, vero impedit ab iusto blanditiis officia dicta, facilis libero laboriosam assumenda voluptatibus, repellendus possimus officiis esse repellat tenetur aut quia inventore?";

    const database       = getDatabase ();
    const messageListRef = ref (database, 'messages');
    //const messageList = query (messageListRef, orderByChild ('sendDate'));

    onValue (messageListRef, (snapshot) => {
        const newmessages = snapshot.val ();
        console.log (newmessages);
        setMessages (newmessages);
      });

    return (
        <section className="chat my-3 fs-6">
            <div className="container-xl ">
                {
                    messages.length > 0 && (
                        messages.map (message => {
                            console.log (message);
                            return <></>
                            //return (<Message user={message.user} message={message.message} inOut="out" />)
                        })
                    )
                }
                <Message user={user2} message={lorem} inOut="in" />
            
                <Message user={user2} message={lorem} inOut="in" />
            
                <Message user={user1} message={lorem} inOut="out" />
            
                <Message user={user2} message={lorem} inOut="in" />
            
                <Message user={user1} message={lorem} inOut="out" />
            
                <Message user={user1} message={lorem} inOut="out" />

                <FormMessage />
            </div>
        </section>
    )
}
