
export const Footer = () => {
  return (
    <footer id="footer" className='footer border-top d-flex align-items-center' style={{height: '80px'}}>
        <div className='container'>
        <div className='row'>
          <div className="col-12 col-md-8 text text-primary">
            Firebase Chat - Developed by @rafasanabria1
          </div>
          <div className="col-12 col-md-4 icons text-primary">
            <a className="" href="https://twitter.com/rafasanabria1"  target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter fa-2x"></i></a>
            <a className=" ms-3" href="https://github.com/rafasanabria1"  target="_blank" rel="noreferrer"><i className="fa-brands fa-github fa-2x"></i></a>
            <a className=" ms-3" href="https://www.linkedin.com/in/rafasanabria1/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in fa-2x"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
