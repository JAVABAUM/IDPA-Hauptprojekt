function getCardBody(offer, count) {
  if (true) {
    var element = `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 id="nextToEachOther" class="card-title bigger bold" id="companyName">${getElementChild(
              offer,
              "companyName"
            )}</h5>
            <img id="companyLogo" src="${
              offer.companyLogoUrl
            }" class="card-img-top" alt=""> 
            </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" id="sms">Sms: ${getElementChild(
              offer,
              "sms"
            )}</li>
            <li class="list-group-item" id="smsAbroad">Sms im Ausland: ${getElementChild(
              offer,
              "smsAbroad"
            )}</li>
            <li class="list-group-item" id="calls">Anrufe: ${getElementChild(
              offer,
              "calls"
            )}</li>
            <li class="list-group-item" id="callsAbroad">Anrufe im Ausland: ${getElementChild(
              offer,
              "callsAbroad"
            )}</li>
            <li class="list-group-item" id="data">Datenvolumen: ${getElementChild(
              offer,
              "dataVolume"
            )}</li>
            <li class="list-group-item" id="dataAbroad">Datenvolumen im Ausland: ${getElementChild(
              offer,
              "dataVolumeAbroad"
            )}</li>
            <li class="list-group-item bigger" id="price">Preis: ${getElementChild(
              offer,
              "price"
            )} / Monat</li>
        </ul>
        <div class="card-body center">
          <button onclick="onOfferLinkClick(${
            offer.offerURL
          })" id="button">Angebot auswählen</button>
        </div>
    </div>
  </div>
    `;
    return element;
  }
}

function onOfferLinkClick(url) {
  window.location.href = url;
}
