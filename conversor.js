const buttonConvert = document.querySelector("#btn");
const currencySelect = document.querySelector(".currency-select");
const rateInfo = document.querySelector(".rate-info");

// Valores de reserva, usados só se a API estiver fora do ar
let rates = {
  dolar: 5.44,
  euro: 6.07,
  libra: 7.39,
  bitcoin: 416168,
};

const API_URL =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL";

async function loadRates() {
  rateInfo.innerHTML = "Buscando cotação em tempo real...";
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Falha na API");
    const data = await response.json();

    rates = {
      dolar: Number(data.USDBRL.bid),
      euro: Number(data.EURBRL.bid),
      libra: Number(data.GBPBRL.bid),
      bitcoin: Number(data.BTCBRL.bid),
    };

    const updatedAt = new Date(Number(data.USDBRL.timestamp) * 1000);
    rateInfo.innerHTML =
      "Cotação atualizada em " + updatedAt.toLocaleString("pt-BR");
  } catch (error) {
    rateInfo.innerHTML = "Não foi possível buscar a cotação. Usando valores de referência.";
  }
  convertValues();
}

function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;
  const currencyValueToConvert = document.querySelector(".currency-value-to-converter");
  const currencyValueConverted = document.querySelector(".currency-value");

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);

  if (currencySelect.value == "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue / rates.dolar);
  }

  if (currencySelect.value == "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue / rates.euro);
  }

  if (currencySelect.value == "libra") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(inputCurrencyValue / rates.libra);
  }

  if (currencySelect.value == "bitcoin") {
    currencyValueConverted.innerHTML =
      "₿ " +
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(inputCurrencyValue / rates.bitcoin);
  }
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-names");
  const currencyImg = document.querySelector(".currency-img");

  if (currencySelect.value == "dolar") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImg.src = "./assets/usa.png";
  }

  if (currencySelect.value == "euro") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/euro.png";
  }

  if (currencySelect.value == "libra") {
    currencyName.innerHTML = "Libra";
    currencyImg.src = "./assets/libra1.png";
  }

  if (currencySelect.value == "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImg.src = "./assets/bitcoin1.png";
  }

  convertValues();
}

currencySelect.addEventListener("change", changeCurrency);
buttonConvert.addEventListener("click", convertValues);

loadRates();
