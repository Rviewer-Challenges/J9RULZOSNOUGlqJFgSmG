import React from 'react'

interface PropsInterface {
    user: {
        username: string,
        avatar: string
    },
    message: string,
    inOut: string
}
export const Message: React.FC<PropsInterface> = ({user, message, inOut }) => {

    const class_message = inOut === 'in' ? "in-message bg-primary " : "out-message bg-success offset-md-2";
    const class_reverse = inOut === 'in' ? "" : "flex-row-reverse";
    const class_img = inOut === 'in' ? "me-2" : "ms-2";
    const class_txt = inOut === 'in' ? "text-start" : "text-end";

    return (
        <div className={"col-md-10 p-2 message text-white rounded-4 " + class_message }>
            <div className={"user px-2 py-1 d-flex border-bottom border-white align-items-center " + class_reverse }>
                <div className="avatar">
                    {user.avatar && (<img src={user.avatar} width="40" height="40" className={"rounded-circle d-flex align-self-center border-white " + class_img} />)}
                </div>
                <div className="username fw-bold">
                    {user.username}
                </div>
            </div>
            <div className={"text p-2 " + class_txt}>
                {message}
            </div>
        </div>
    )
}
