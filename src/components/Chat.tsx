import { DataSnapshot, getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import FChatContext from '../context/FChatContext';
import registerFixHeight from '../utils/Utils';
import { FormMessage } from './FormMessage';
import { Message } from './Message'

export const Chat = () => {

    const {userData}              = useContext (FChatContext);
    const [loading, setLoading]   = useState<boolean> (true);
    const [messages, setMessages] = useState<any[]> ([]);
    const [users, setUsers]       = useState<any> ({});

    useEffect (() => {

        registerFixHeight ('chat');

        const database   = getDatabase ();
        const usersRef   = ref (database, 'users');
        const usersQuery = query (usersRef);

        onValue (usersQuery, (snapshot) => {

            setUsers (snapshot.val());
        });
    }, []);

    useEffect (() => {

        const database     = getDatabase ();
        const messagesRef  = ref (database, 'messages');
        const messageQuery = query (messagesRef, orderByChild ('sendDate'));
    
        onValue (messageQuery, (snapshot) => {
    
            const newMessages:any[] = [];

            snapshot.forEach ((snap:DataSnapshot) => {
                
                const key    = snap.key;
                const msg    = snap.val ();
                const author = users[msg.authorUid];
                newMessages.push ({key, msg, author});
            });

            if (newMessages.length > 0) setMessages (newMessages);
            else setMessages ([]);

            setLoading (false);
        });

    }, [users]);

    useEffect ( () => {

        if (document.getElementById ('scroll')) {
            document.getElementById ('scroll')!.scrollTo (0, document.getElementById ('scroll')!.scrollHeight);
        }
    }, [messages]);
    
    if (! userData) return <Navigate to="/login" replace />;   

    return (
        <section id="chat" className="chat">
            <div className="container-xl py-3 d-flex flex-column justify-content-end contenedor" style={{height: '100%'}}>
                {
                    loading && (
                        <div className="row">
                            <div className="col text-center h3 d-flex align-items-center justify-content-center text-primary py-5">
                                <i className='fa fa-spinner fa-spin fa-2x ms-3' />
                            </div>
                        </div>
                    )
                }
                {
                    ! loading && messages.length <= 0 && (
                        <div className="row">
                            <div className="col text-center h3 d-flex align-items-center justify-content-center text-primary py-5">
                                ??Comienza a enviar mensajes!
                            </div>
                        </div>
                    )
                }
                {
                    ! loading && messages.length > 0 && (
                        <div id="scroll" className='scroll' style={{overflowY: 'scroll'}}>
                            { 
                                messages.map ( (elem) => {
                                    return (<Message msg={elem.msg} author={elem.author} key={elem.key} idmsg={elem.key}/>)
                                })
                            }
                        </div>
                    )
                }
                {
                    ! loading && (<FormMessage />)
                }
            </div>
        </section>
    )
}
