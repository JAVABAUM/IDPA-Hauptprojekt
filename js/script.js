function initPage() {
  console.log("initPage");
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
}

function elementFitsCriteria(element, criteria) {
  var fitsCriteria = true;
  $.each(criteria, function (key, value) {});
  return fitsCriteria;
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
