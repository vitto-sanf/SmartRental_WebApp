import React from "react"

import { Link } from "react-router-dom"
import Page from "../Page"

function Ricerca() {
  const mezzi = JSON.parse(localStorage.getItem("mezzi_trovati"))

  return (
    <Page title="Ricerca">
      <div className="text-font pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        {/* PARTE CENTRALE  */}
        <div className="container mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="card col-xl-10 col-lg-10 col-md-12 col-sm-12">
              {/* TESTO IN ALTO  */}
              <div className="container ">
                <div className=" mb-5 col-12">
                  <h3 className="align-center display-2">
                    <strong>Cerca il mezzo adatto a te!</strong>
                  </h3>
                  <h4 className=" align-center mt-2 display-7">Scegli tra tutte le nostre offerte</h4>
                </div>
              </div>
            </div>
          </div>

          {/* MEZZI RISULTANTI CON IMMAGINI  */}
          <div className="img-contatti img-shadow mt-5 pb-5" style={{ backgroundColor: "#ffffff" }}>
            <div className=" pt-5">
              <h3 className=" align-center pb-4">
                <strong>Risultati della ricerca</strong>
              </h3>
            </div>

            <div className="card col-12">
              <div className="row align-center pl-5 pr-5">
                {/* LE CARD INIZIANO QUI */}
                {mezzi.length > 0 ? (
                  mezzi.map(mezzo => (
                    <div key={mezzo._id} className="сol-xl-3 col-md-6 col-sm-12 col-lg-4 mb-4">
                      <div className="card img-shadow ">
                        <img src={`/uploads/${mezzo.imgName}`} className="card-img-top img-shadow img-border" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title text-center">{mezzo.modello}</h5>
                          <p className="card-text">Categoria {mezzo.categoria}</p>
                          <p className="card-text">{mezzo.tariffaGiornaliera + "€"}/giorno</p>
                          <p className="card-text">{mezzo.parcheggio}</p>
                        </div>
                        <div className="row justify-content-center mb-3">
                          <Link className="btn btn-primary col-6 mt-1" to={"/dettagliOfferta/" + mezzo.modello}>
                            Seleziona
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="сol-12 col-md-12 col-lg-12 ">
                    <h3 className="align-center pt-3 pb-3" style={{ backgroundColor: "#e44444" }}>
                      Mezzo non Trovato
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Ricerca
