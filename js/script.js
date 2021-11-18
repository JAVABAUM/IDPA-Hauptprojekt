function initPage() {
  getJson();
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

function renderElementsByCriteria(criteria) {
  var data = JSON.parse(localStorage.getItem("data"));
  var possibleElements = new Map();
  $.each(data, function (key, val) {
    if (elementFitsCriteria(val, criteria)) {
      possibleElements.set(key, val);
    }
  });
  console.log(possibleElements);
}

function elementFitsCriteria(element, criteria) {
  return getElementChild(element, criteria) ? true : false;
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
      price: $("#price").val(),
      sms: $("#sms").val(),
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
}
