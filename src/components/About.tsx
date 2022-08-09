import React, { useEffect } from 'react'

export const About = () => {

  useEffect (() => {

    const header_height = document.getElementById ('header')!.clientHeight;
    const footer_height = document.getElementById ('footer')!.clientHeight;
    const window_height = window.innerHeight;
  
    if (document.getElementById ('about')) {
        document.getElementById ('about')!.style.height = (window_height - header_height - footer_height).toString () + "px";
    }

}, []);

  return (
    <div id="about" className='about'>
      About
    </div>
  )
}
