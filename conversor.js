const buttonConvert = document.querySelector("#btn");
const currencySelect = document.querySelector(".currency-select");


function convertValues() {
  const inputCurrencyValue = document.querySelector(".input-currency").value;


  const currencyValueToConvert = document.querySelector(".currency-value-to-converter");

  const currencyValueConverted = document.querySelector(".currency-value");

  const dolarToDay = 5.44;
  const euroToDay = 6.07;
  const libraToDay = 7.39;
  const bitCoinToDay = 416.168;

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);

  if (currencySelect.value == "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue / dolarToDay);
  }

  if (currencySelect.value == "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue / euroToDay);
  }

  if (currencySelect.value == "libra") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    }).format(inputCurrencyValue / libraToDay);
  }

  if (currencySelect.value == "bitcoin") {

  currencyValueConverted.innerHTML = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(inputCurrencyValue / bitCoinToDay);
  }

}


function changeCurrency() {

const currencyName = document.getElementById("currency-names")
const currencyImg = document.querySelector(".currency-img")

   if (currencySelect.value == "dolar") {


    currencyName.innerHTML = "Dólar Américano"
    currencyImg.src = "./assets/usa.png"
  }

  if (currencySelect.value == "euro") {


    currencyName.innerHTML = "Euro"
    currencyImg.src = "./assets/euro.png"


  }

  if (currencySelect.value == "libra") {


    currencyName.innerHTML = "Libra"
    currencyImg.src = "./assets/libra1.png"


  }

  if (currencySelect.value == "bitcoin") {


    currencyName.innerHTML = "Bitcoin"
    currencyImg.src = "./assets/bitcoin1.png"


  }



  convertValues()
}


currencySelect.addEventListener("change", changeCurrency)

buttonConvert.addEventListener("click", convertValues)