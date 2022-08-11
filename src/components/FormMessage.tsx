import { child, getDatabase, push, ref, serverTimestamp } from 'firebase/database';
import { getDownloadURL, getStorage, ref as refStorage, uploadBytes } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react'
import FChatContext from '../context/FChatContext';

export const FormMessage = () => {

    const {userData}                          = useContext (FChatContext);
    const [errorUploading, setErrorUploading] = useState ('');
    const [file, setFile]                     = useState<any> (null);
    const [fileURL, setFileURL]               = useState ();

    useEffect ( () => {
      
        if (file) {

            const storage    = getStorage ();
            const storageRef = refStorage (storage, `/images/${file.name}`);

            uploadBytes (storageRef, file).then ( (result) => {

                getDownloadURL (storageRef).then ((downloadURL) => {
                    sendMessage ({msg: downloadURL, type: 'img'});
                });
            }).catch ( (err) => {

                switch (err.code) {
                    case 'storage/quota-exceeded':
                        showError ('Cuota de archivos excedida.');
                        break;
                    case 'storage/unauthenticated':
                        showError ('Debe estar autenticado para subir archivos.');    
                        break;
                    case 'storage/unauthorized':
                        showError ('No tiene permisos para subir archivos.');
                        break;
                    default:
                        showError ('Se ha producido un error subiendo el archivo.');
                        break;
                }
            });
        }
    }, [file]);

    
    const handleSubmitMessage = (e:any) => {

        e.preventDefault ();
        
        if (userData) {
            
            const mensaje = (document.getElementById ("form-mensaje") as HTMLFormElement).mensaje.value;
            (document.getElementById ("form-mensaje") as HTMLFormElement).mensaje.value = '';
            sendMessage ({msg: mensaje, type: 'text'});
        }

    };


    const sendMessage = ({msg, type}:{msg:string, type:string}) => {

        if (userData && msg.trim () !== '') {

            const database    = getDatabase ();
            const databaseRef = ref (database);

            push (child (databaseRef, 'messages'), {msg: msg.trim (), type: type, sendDate: serverTimestamp (), authorUid: userData.uid});
        }
        return;
    }


    const openSendImage = () => {

        if (document.getElementById ("adjunto")) document.getElementById ('adjunto')!.click ();
    }


    const handleSubmitFile = (e:any) => {

        const fileUploaded = e.target.files[0];
        if (! fileUploaded.name.match (/\.(jpg|jpeg|png|gif)$/)) {
        
            showError (`Los formatos de imagen permitidos son 'jpg', 'jpeg', 'png', 'gif'`);
        }
        if (fileUploaded.size <= 0) {
        
            showError (`La imagen que intenta subir está vacía`);
        }

        setFile (fileUploaded);
        
        e.target.value = '';
    }


    const showError = (text:string) => {

        setErrorUploading (text);
        setTimeout(() => {
            setErrorUploading ('');
        }, 3000);
    }
    
  
    return (
        <form className='form-mensaje' id="form-mensaje" onSubmit={(e) => handleSubmitMessage (e)}>
            {
                errorUploading != '' && (
                    <div className="row">
                        <div className="col px-2">
                            <div className="alert alert-danger mt-3" role="alert">
                                <i className='fa fa-circle-xmark fa-solid'></i> {errorUploading}
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="row">
                <div className="col px-2 d-flex align-items-center">
                    <input type="text" className='mensaje form-control me-2' name="mensaje" placeholder='Enviar mensaje...' />
                    <button className='btn btn-link' onClick={(e) => handleSubmitMessage (e)}>
                        <i className='fa fa-2x text-primary fa-send me-2'></i>
                    </button>
                    <input id="adjunto" type="file" className='adjunto' name="adjunto" onChange={(e) => handleSubmitFile (e)} style={{display: 'none'}} /> 
                    <button className='btn btn-link' onClick={openSendImage}>
                        <i className="fa fa-2x text-primary fa-image .hover-pointer"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}
