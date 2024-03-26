import React from "react"

function Errore404() {
  return (
    <div className="row justify-content-center align-center pb-5 pt-5">
      <div className=" container justify-content-center text-font mt-5">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-10">
          {/* TITOLO */}
          <div className=" align-center">
            <h1 className="display-2 pb-2">Oops! La pagina non è stata trovata.</h1>
            <h5>Errore 404 </h5>
          </div>
          <p className="align-center pt-3">
            <p> Scusa ma la pagina che stai cercando non esiste o è stata rimossa. </p>
            <p>Il nome della pagina è cambiato o è temporaneamente non disponibile.</p>
          </p>
          <div className="error-container mb-5 mt-5 pt-5">
            <span>
              <span>4</span>
            </span>
            <span>0</span>
            <span>
              <span>4</span>
            </span>
          </div>
          <div className="row"></div>
          <div className="container mb-5 mt-5">
            {/* LINK PER TORNARE INDIETRO */}
            <div>
              <a href="javascript:history.back()">Vai indietro</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Errore404
