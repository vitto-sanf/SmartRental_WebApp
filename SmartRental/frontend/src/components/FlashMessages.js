import React from "react"

function FlashMessages(props) {
  return (
    <div className="floating-alerts text-font">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            {msg}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
