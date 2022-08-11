import moment from 'moment';
import React, { useContext } from 'react'
import FChatContext from '../context/FChatContext';
import { MessageInterface } from '../types/MessageInterface';


export const Message: React.FC<MessageInterface> = ({msg, author}) => {
    
    const {loadingUser, userData} = useContext (FChatContext);

    if (loadingUser || ! userData || !author) return <></>;
    
    let inOut = (userData.uid !== author.uid) ? 'in' : 'out';

    const class_message = inOut === 'in' ? "in-message bg-light p-2 " : "out-message bg-dark offset-xl-2";
    const class_reverse = inOut === 'in' ? "" : "flex-row-reverse";
    const class_img = inOut === 'in' ? "me-2" : "ms-2";
    const class_align_txt = inOut === 'in' ? "text-start" : "text-end";

    
    const formatFecha = (fecha_raw:number) => {

        const fecha = moment (fecha_raw);
        if (fecha.isSame (moment(), "day")) return fecha.format ('HH:mm')
        return fecha.format ('HH:mm DD/MM')
    }

    return (
        <div className="row py-2 mx-2">
            <div className={"col-xl-10 message text-muted rounded-4 " + class_message } style={{position: 'relative'}}>
                {
                    inOut !== 'out' && (
                        <div className={"user px-2 py-1 d-flex border-bottom border-muted align-items-center " + class_reverse }>
                            <div className="avatar">
                                {author.avatar && (<img src={author.avatar} width="25" height="25" className={"rounded-circle d-flex align-self-center border-white " + class_img} alt={author.username} />)}
                            </div>
                            <div className="username fw-bold">
                                {author.username}
                            </div>
                        </div>
                    )
                }
                <div className={"text py-3 ps-2 pe-5 " + class_align_txt}>
                    {msg.msg}
                </div>
                <div className="fecha small fw-light fst-italic text-end" style={{position: 'absolute', bottom: '0px', right: '10px'}}>
                    { formatFecha (msg.sendDate) }
                </div>
            </div>
        </div>
    )
}
