import { getDatabase, onValue, orderByChild, query, ref } from 'firebase/database';
import { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import FChatContext from '../context/FChatContext';
import { FormMessage } from './FormMessage';
import { Message } from './Message'

export const Chat = () => {

    const {userData}              = useContext (FChatContext);
    const [loading, setLoading]   = useState<boolean> (true);
    const [messages, setMessages] = useState<any[]> ([]);

    useEffect (() => {
        
        const database       = getDatabase ();
        const messageListRef = ref (database, 'messages');
        const messageList = query (messageListRef, orderByChild ('sendDate'));
    
    
        onValue (messageList, (snapshot) => {
            
            if (snapshot.size > 0) setMessages (Object.values (snapshot.val ()));
            else setMessages ([]);
            setLoading (false);
        });
    
    }, []);
    
    if (! userData) return <Navigate to="/login" replace />;   

    return (
        <section className="chat my-3 fs-6">
            <div className="container-xl ">
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
                                ¡Comienza a enviar mensajes!
                            </div>
                        </div>
                    )
                }
                {
                    ! loading && messages.length > 0 && (
                        messages.map ( (msg, index) => {
                            return (<Message msg={msg} key={index}/>)
                        })
                    )
                }
                {
                    ! loading && (<FormMessage />)
                }
            </div>
        </section>
    )
}
