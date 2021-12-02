function initPage() {
  localStorage.setItem("mode", "light");
  getJson();
  updateSliders();
  renderElementsByUserinput();
}

function getJson() {
  $.getJSON("offers.json", function (data) {
    var items = new Map();
    $.each(data, function (key, val) {
      items.set(key, val);
    });
    localStorage.setItem("data", JSON.stringify(data));
  });
}

function getElementByIndex(index) {
  var data = JSON.parse(localStorage.getItem("data"));
  var items = new Map();
  $.each(data, function (key, val) {
    items.set(key, val);
  });
  var element = items.get(index);
  return element;
}

function renderElementsByUserinput() {
  emptyOffers();
  var userinput = getSliderData();
  var possibleElements = [, ,];
  var data = JSON.parse(localStorage.getItem("data"));
  var biggestMet = [0, 0, 0];

  data.forEach(function (value, key) {
    var criteriaMet = 0;
    for (var criteria in userinput) {
      if (elementFitsCriteria(value, criteria, userinput[criteria])) {
        criteriaMet++;
      }
    }

    const min = Math.min(...biggestMet);
    if (
      criteriaMet > min &&
      (String(getElementChild(value, "companyName")).toLowerCase() ==
        userinput.provider ||
        userinput.provider == "all")
    ) {
      index = biggestMet.indexOf(min);
      possibleElements[index] = value;
      biggestMet[index] = criteriaMet;
    }
  });

  possibleElements.sort(function (a, b) {
    return getElementChild(a, "price") - getElementChild(b, "price");
  });

  possibleElements.forEach(function (value, key) {
    $("#ankor").append(getCardBody(value, key));
  });
}

function renderElementsByCriteria(criteria, value) {
  emptyOffers();
  var data = JSON.parse(localStorage.getItem("data"));
  var possibleElements = new Map();
  $.each(data, function (key, val) {
    if (elementFitsCriteria(val, criteria, value)) {
      possibleElements.set(key, val);
    }
  });
  possibleElements.forEach(function (value, key) {
    getCardBody(value, key);
  });
}

function elementFitsCriteria(element, criteria, value) {
  if (criteria != "provider" && criteria != "price") {
    return getElementChild(element, criteria) > Number(value);
  } else if (criteria == "price") {
    return getElementChild(element, criteria) < Number(value);
  } else {
    return getElementChild(element, "companyName").toLowerCase() == value;
  }
}

function getElementChild(element, child) {
  if (
    child == "companyName" ||
    child == "companyLogo" ||
    child == "price" ||
    child == "age"
  ) {
    return element[child];
  } else {
    return element.offer[child];
  }
}

function getSliderData() {
  var detailedFilter = $("#detailed").val() ? true : false;
  var userInput;
  if (!detailedFilter) {
    userInput = {
      provider: $("#company").val(),
      price: $("#price").val(),
      calls: $("#calls").val(),
      data: $("#data").val(),
    };
  } else {
    userInput = {
      price: $("#price").val(),
      sms: $("#sms").val(),
      smsEu: $("#smsEu").val(),
      smsAbroad: $("#smsAbroad").val(),
      calls: $("#calls").val(),
      callsEu: $("#callsEu").val(),
      callsAbroad: $("#callsAbroad").val(),
      dataVolume: $("#dataVolume").val(),
      dataVolumeEu: $("#dataVolume").val(),
      dataVolumeAbroad: $("#data").val(),
    };
  }
  return userInput;
}

function getMinValue(criteria) {
  var data = JSON.parse(localStorage.getItem("data"));
  var min = Number(Infinity);

  $.each(data, function (key, object) {
    var offer = convertUnlimitedToInfinity(getElementChild(object, criteria));
    if (criteria == "dataVolume") {
    }
    if (offer < min) {
      min = offer;
    }
  });
  return min;
}

function getMaxValue(criteria) {
  var data = JSON.parse(localStorage.getItem("data"));
  var max = Number(0);

  $.each(data, function (key, object) {
    var offer = convertUnlimitedToInfinity(getElementChild(object, criteria));
    if (offer > max) {
      max = offer;
    }
  });
  return max;
}

function convertUnlimitedToInfinity(value) {
  if (value == "Unlimited") {
    return Number(Infinity);
  } else {
    return Number(value);
  }
}

function updateSliders() {
  document.getElementById("price").setAttribute("min", getMinValue("price"));
  document.getElementById("price").setAttribute("max", getMaxValue("price"));

  document
    .getElementById("data")
    .setAttribute("min", getMinValue("dataVolume"));
  document
    .getElementById("data")
    .setAttribute("max", getMaxValue("dataVolume"));

  document.getElementById("calls").setAttribute("min", getMinValue("calls"));
  document.getElementById("calls").setAttribute("max", getMaxValue("calls"));
}

function updateTextInput(val) {
  document.getElementById("priceLabel").innerHTML =
    Math.floor(val) + " CHF pro Monat";
  renderElementsByUserinput();
}
function updateTextInputData(val) {
  document.getElementById("dataLabel").innerHTML =
    Math.floor(val) + " GB pro Monat";
  renderElementsByUserinput();
}
function updateTextInputCalls(val) {
  document.getElementById("callsLabel").innerHTML = val + " Minuten pro Monat";
  renderElementsByUserinput();
}
function updateProvider(val) {
  renderElementsByUserinput();
}

function getProviders() {
  var data = JSON.parse(localStorage.getItem("data"));
  var providers = new Map();
  $.each(data, function (key, object) {
    var provider = getElementChild(object, "companyName");
    if (!providers.has(provider)) {
      providers.set(provider, true);
    }
  });
  return providers;
}

function getOffersByProvider(provider) {
  var data = JSON.parse(localStorage.getItem("data"));
  var offers = new Map();
  $.each(data, function (key, object) {
    var company = getElementChild(object, "companyName");
    if (company == provider) {
      offers.set(key, object);
    }
  });
  return offers;
}

function emptyOffers() {
  $("#ankor").empty();
}

function saveUserDataToLocalStorage(id) {
  localStorage.setItem(`userData-${id}`, JSON.stringify(getSliderData()));
}

function getUserDataFromLocalStorage(id) {
  return JSON.parse(localStorage.getItem(`userData-${id}`));
}
