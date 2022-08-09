import { child, getDatabase, push, ref, serverTimestamp, set } from 'firebase/database';
import { useContext } from 'react'
import FChatContext from '../context/FChatContext';
import { userDataInterface } from '../types/userDataInterface';

export const FormMessage = () => {

    const {userData, app} = useContext (FChatContext);

    const handleSubmit = (e:any) => {

        e.preventDefault ();
        
        if (e.target.mensaje.value !== '' && userData) {
            
            const msg = {
                author: userData,
                message: e.target.mensaje.value,
                sendDate: serverTimestamp ()
            };
            
            sendMessage (msg);

            e.target.mensaje.value = '';
        }
        
    };

    const sendMessage = (msg:{author: userDataInterface, message: any, sendDate: object}) => {

        const database = getDatabase (app);

        const messageUid = push (child (ref (database), 'messages'), userData).key;
        set (ref (database, 'messages/' + messageUid), {...msg, uid: messageUid});
        return;
    }
  
    return (
        <form onSubmit={(e) => handleSubmit (e)}>
            <div className="row">
                <div className="col px-2">
                    <input type="text" className='form-control' name="mensaje" placeholder='Enviar mensaje...' />
                </div>
            </div>
        </form>
    )
}
