import { child, getDatabase, push, ref, serverTimestamp, set } from 'firebase/database';
import { useContext } from 'react'
import FChatContext from '../context/FChatContext';

export const FormMessage = () => {

    const {userData, app} = useContext (FChatContext);

    const handleSubmit = (e:any) => {

        const database = getDatabase (app);
        e.preventDefault ();
        
        if (e.target.mensaje.value !== '') {
            
            const mensaje = {
                author: userData,
                message: e.target.mensaje.value,
                sendDate: serverTimestamp ()
            };
            
            const messageId = push (child (ref (database), 'messages'), userData).key;
            set (ref (database, 'messages/' + messageId), mensaje);

            e.target.mensaje.value = '';
            
        }
        
    };
  
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
