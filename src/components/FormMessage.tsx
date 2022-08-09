import { child, getDatabase, push, ref, serverTimestamp } from 'firebase/database';
import { useContext } from 'react'
import FChatContext from '../context/FChatContext';

export const FormMessage = () => {

    const {userData} = useContext (FChatContext);

    const handleSubmit = (e:any) => {

        e.preventDefault ();
        
        
        if (userData) {
            
            const mensaje = (document.getElementById ("form-mensaje") as HTMLFormElement).mensaje.value;
            (document.getElementById ("form-mensaje") as HTMLFormElement).mensaje.value = '';
            sendMessage (mensaje);
        }

    };

    const sendMessage = (mensaje:any) => {

        if (userData && mensaje.trim () !== '') {

            const database    = getDatabase ();
            const databaseRef = ref (database);

            push (child (databaseRef, 'messages'), {msg: mensaje.trim (), sendDate: serverTimestamp (), authorUid: userData.uid});
        }
        return;
    }
  
    return (
        <form className='form-mensaje' id="form-mensaje" onSubmit={(e) => handleSubmit (e)}>
            <div className="row">
                <div className="col px-2 d-flex align-items-center">
                    <input type="text" className='mensaje form-control me-2' name="mensaje" placeholder='Enviar mensaje...' />
                    <button className='btn btn-link' onClick={(e) => handleSubmit (e)}>
                        <i className='fa fa-2x text-primary fa-send me-2'></i>
                    </button>
                    <i className="fa fa-2x text-primary fa-image"></i>
                </div>
            </div>
        </form>
    )
}
