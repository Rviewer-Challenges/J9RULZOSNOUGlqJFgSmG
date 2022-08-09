import moment from 'moment';
import React, { useContext } from 'react'
import FChatContext from '../context/FChatContext';

interface PropsInterface {
    msg: any
}
export const Message: React.FC<PropsInterface> = ({msg}) => {
    
    const {loadingUser, userData} = useContext (FChatContext);

    if (loadingUser || ! userData) return <></>;
    
    let inOut = (userData.uid !== msg.author.uid) ? 'in' : 'out';

    const class_message = inOut === 'in' ? "in-message bg-primary " : "out-message bg-success offset-xl-2";
    const class_reverse = inOut === 'in' ? "" : "flex-row-reverse";
    const class_img = inOut === 'in' ? "me-2" : "ms-2";
    const class_txt = inOut === 'in' ? "text-start" : "text-end";

    
    const formatFecha = (fecha_raw:number) => {

        const fecha = moment (fecha_raw);
        if (fecha.isSame (moment(), "day")) return fecha.format ('HH:mm')
        return fecha.format ('HH:mm DD/MM')
    }

    return (
        <div className="row py-2 px-2">
            <div className={"col-xl-10 p-2 message text-white rounded-4 " + class_message }>
                <div className={"user px-2 py-1 d-flex border-bottom border-white align-items-center " + class_reverse }>
                    <div className="avatar">
                        {msg.author.avatar && (<img src={msg.author.avatar} width="40" height="40" className={"rounded-circle d-flex align-self-center border-white " + class_img} alt={msg.author.username} />)}
                    </div>
                    <div className="username fw-bold">
                        {msg.author.username}
                    </div>
                </div>
                <div className={"text p-2 " + class_txt}>
                    {msg.message}
                </div>
                <div className="fecha small fw-light fst-italic ">
                    { formatFecha (msg.sendDate) }
                </div>
            </div>
        </div>
    )
}
