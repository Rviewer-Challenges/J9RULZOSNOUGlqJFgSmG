import { getDatabase, ref, set } from 'firebase/database';
import { useContext, useEffect } from 'react'
import FChatContext from '../context/FChatContext';

export const Perfil = () => {

    const {userData}  = useContext (FChatContext);

    useEffect (() => {

        const header_height = document.getElementById ('header')!.clientHeight;
        const footer_height = document.getElementById ('footer')!.clientHeight;
        const window_height = window.innerHeight;
    
        if (document.getElementById ('profile')) {
            document.getElementById ('profile')!.style.height = (window_height - header_height - footer_height).toString () + "px";
        }

    }, []);

    const handleSubmit = (e:any) => {

        e.preventDefault ();
        
        
        if (userData) {
            
            const username = (document.getElementById ("form-mensaje") as HTMLFormElement).username.value;
            const newUser  = {
                ...userData,
                username
            };
            saveUser (newUser);
        }

    };


    const saveUser = (user:any) => {

        const database = getDatabase ();
        
        set (ref (database, 'users/' + user.uid), user);
        return;
    };

    return (
        <div id="profile" className='profile'>
            <form onSubmit={handleSubmit} className="text-center d-flex flex-column justify-content-center" style={{height: '100%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input type="text" id="username" name="username" className='form-control text-center' value={userData?.username} /> 
                            <button type='submit' className='btn btn-lg btn-primary text-white mt-3'>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
