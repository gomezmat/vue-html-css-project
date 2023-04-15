var miVueApp = new Vue({
  el: "#app",
  data: {
    cars: [],
    brands: [],
    years: [],
    models: [],
    selectedYear: "",
    selectedBrand: "",
    selectedModel: "",
    selectedStatus: "",
    currency: "USD",
  },
});

for (i = 1900; i <= 2023; i++) {
  miVueApp.years.push(i);
}

// Carga de Tipo de Cambio:
fetch("https://ha-front-api-proyecto-final.vercel.app/rates")
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    document.querySelector("#rate span").textContent = data.uyu;
  });

// Carga de Marcas
fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    miVueApp.brands = data;
  });

// Carga de Autos
fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (data) {
    return data.json();
  })
  .then(function (data) {
    miVueApp.cars = data;
  });

//Carga de Modelo
document
  .querySelector("#selected-Brand")
  .addEventListener("change", function () {
    var url =
      "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
      miVueApp.selectedBrand;
    fetch(url)
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        miVueApp.models = data;
        miVueApp.selectedModel = "";
      });
  });

document.querySelector("#btn-currency").addEventListener("click", function () {
  if (miVueApp.currency === "USD") {
    miVueApp.currency = "UYU";
  } else {
    miVueApp.currency = "USD";
  }
});

document.querySelector("#buttonFilter").addEventListener("click", function () {
  var year = miVueApp.selectedYear;
  var brand = miVueApp.selectedBrand;
  var model = miVueApp.selectedModel;
  var status = miVueApp.selectedStatus;

  var url = `https://ha-front-api-proyecto-final.vercel.app/cars?year=${year}&brand=${brand}&model=${model}&status=${status}`;
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      miVueApp.cars = data;
    });
});
