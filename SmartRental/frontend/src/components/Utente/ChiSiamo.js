import React from "react"
import Page from "../Page"

function ChiSiamo() {
  return (
    <Page title="Chi siamo">
      <div className=" pt-5 text-font" style={{ background: "#f8f9fa" }}>
        <div className="container pb-4 mt-5 ">
          {/* TESTO SUPERIORE + IMG */}
          <div className="row align-items-center pb-4 ">
            <div className="col-md-12 col-sm-12 col-lg-6 col-xl-6">
              <h1 className="card-title mb-3">
                <strong>Chi siamo </strong>
              </h1>
              <h6 className=" display-7 mb-4 ">SmartRental è una delle aziende emergenti più promettenti in città per il noleggio di mezzi online. Dal 2021 il nostro team di specialisti del settore è al tuo fianco per assicurarti un noleggio facile, veloce ed efficiente in città. Ti offriamo una vasta gamma di mezzi tra auto e moto che potrai comodamente scegliere sul nostro sito e trovare in parcheggi o stalli dislocati per tutta la città. Se invece preferisci una passeggiata più tranquilla per muoverti più agevolmente nel traffico della città, ti consigliamo le nostre biciclette a pedalata assistita e monopattini elettrici, per goderti le bellezze della città in completa libertà, senza stancarti troppo e soprattutto nel pieno rispetto dell’ambiente.</h6>
            </div>
            <div className="col-md-12 col-sm-12 col-lg-6 col-xl-6">
              <div className=" img-shadow img-contatti ">
                <img className="img-contatti mb-5" src="/img/pexels-fauxels-3182763.jpg" alt="Foto working process" />
              </div>
            </div>
          </div>
          {/* TESTO INFERIORE + IMG NOSTRE */}
          <div className="container px-5 pb-5 ">
            <div className="text-center ">
              <h1 className=" ">
                <strong>Il nostro Team</strong>
              </h1>
              <p className=" display-7 text-muted mb-5">Ecco chi ha progettato e realizzato questo servizio di sharing</p>
            </div>
            <div className="row  justify-content-center">
              <div className="col-lg-3 col-md-5 col-sm-12 pb-4">
                <div className="text-center">
                  <img className=" mb-4 px-4" style={{ borderRadius: "50%" }} src="/img/user3.jpg" alt="Foto Giuseppe Gullo" />
                  <h5 className="">Giuseppe Gullo</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-12 pb-4">
                <div className="text-center">
                  <img className="  mb-4 px-4" style={{ borderRadius: "50%" }} src="/img/user1.jpg" alt="Foto Michele Albanese" />
                  <h5 className="">Michele Albanese</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-12 pb-4 ">
                <div className="text-center">
                  <img className=" mb-4 px-4" style={{ borderRadius: "50%" }} src="/img/user2.jpg" alt="Foto Marianna Francesca Amalfi" />
                  <h5 className="">Marianna Francesca Amalfi</h5>
                </div>
              </div>
              <div className="col-lg-3 col-md-5 col-sm-12 pb-4">
                <div className="text-center">
                  <img className=" mb-4 px-4" style={{ borderRadius: "50%" }} src="/img/user4.jpg" alt="Foto Vittorio Sanfilippo" />
                  <h5 className="">Vittorio Sanfilippo</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default ChiSiamo
