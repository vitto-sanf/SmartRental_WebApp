import React from "react"

function Footer() {
  return (
    <div className="footer">
      <div className="justify-content-center align-center text-white">
        <div className="row justify-content-center align-items-center " style={{ position: "relative", top: "15px" }}>
          {/* LINK */}
          <ul className="list-unstyled" style={{ display: "flex" }}>
            <li className="pr-2 ">
              <a className="text-white display-7 " href="chiSiamo">
                Chi siamo
              </a>
            </li>
            <li className="pl-2 ">
              <a className="text-white display-7" href="contatti">
                Contatti
              </a>
            </li>
          </ul>
        </div>

        <div className="row justify-content-center align-items-center ">
          <p className="text-white display-7">© Copyright 2021. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
