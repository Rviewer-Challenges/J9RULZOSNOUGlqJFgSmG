import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import registerFixHeight from '../utils/Utils';

export const About = () => {

  useEffect (() => {

    registerFixHeight ('about');
}, []);

  return (
    <div id="about" className='about text-center'>
      <div className='container-md pt-5'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='mb-0'>
                Bienvenidos al <strong>Chat</strong> en tiempo real <strong>Firebase</strong>. 
              </h1>
              <h4>
                Aquí podrás enviar y recibir mensajes de texto o fotografías en tiempo real.
              </h4>
              <hr />
              <p className='mb-0 mt-5 '>
                <Link to="/chat" className='fw-bold'>Chat</Link> <span>Aquí encontrarás el chat en tiempo real y podrás enviar y recibir mensajes.</span>
              </p>
              <p className='mb-0'>
                <Link to="/profile" className='fw-bold'>Profile</Link> <span>Aquí encontrarás la manera de cambiar tu nombre de usuario visible en el chat.</span>
              </p>
              <p className='mb-5'>
                <Link to="/about" className='fw-bold'>About</Link> <span>Aquí encontrarás algo de información sobre esta APP.</span>
              </p>
              <hr />
              <p className='mt-2'>
                Esta APP ha sido desarrollada por <a href="https://github.com/rafasanabria1" target="_blank" rel="noreferrer">@rafasanabria1</a> utilizando ReactJS & Bootstrap para completar el reto mensual de <a href="https://www.twitch.tv/mouredev" target="_blank" rel="noreferrer">@mourdev</a>.
                <br />
                Puedes encontrar el código de esta APP en <a href="https://github.com/rafasanabria1/firebase-chat-mouredev-challenge" target="_blank" rel="noreferrer">GitHub</a>.
              </p>
              <p>
                
              </p>
              <p>
                Puedes encontrar más información sobre <a href="https://www.twitch.tv/mouredev"  target="_blank" rel="noreferrer">@mourdev</a> y sus retos mensuales en <a href="https://retosdeprogramacion.com/" target="_blank" rel="noreferrer">retosdeprogramacion.com</a>, en su <a href="https://github.com/mouredev/Monthly-App-Challenge-2022" rel="noreferrer">GitHub</a> y en la web de <a href="https://go.rviewer.io/dev-firebase-chat-es/?utm_source=mouredev&utm_medium=github_repo&utm_campaign=firebase_chat_mouredev" target="_blank" rel="noreferrer">rviewer</a>.
              </p>
              <p>
                Happy Coding!
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}
