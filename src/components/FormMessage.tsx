import { child, getDatabase, push, ref, serverTimestamp } from 'firebase/database';
import { useContext } from 'react'
import FChatContext from '../context/FChatContext';

export const FormMessage = () => {

    const {userData} = useContext (FChatContext);

    const handleSubmit = (e:any) => {

        e.preventDefault ();
        
        if (e.target.mensaje.value !== '' && userData) {
            
            sendMessage (e.target.mensaje.value);

            e.target.mensaje.value = '';
        }
        
    };

    const sendMessage = (msg:any) => {

        if (userData) {

            const database    = getDatabase ();
            const databaseRef = ref (database);

            push (child (databaseRef, 'messages'), {msg: msg, sendDate: serverTimestamp (), authorUid: userData.uid});
        }
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
