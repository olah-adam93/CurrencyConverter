
const dropList = document.querySelectorAll(".drop-list select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
const Btn = document.querySelector("form button");
let exchangeRateText = document.querySelector(".exchange-rate");
const exchangeIcon = document.querySelector(".drop-list .icon");


for (let i = 0; i < dropList.length; i++) {
    for (currency_id in country_list) {
        let default_selected;
        if (i == 0) {
            default_selected = currency_id == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            default_selected = currency_id == "JPY" ? "selected" : "";
        }
        let optionElement = `<option value="${currency_id}" ${default_selected}>${currency_id}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionElement);
    }
    dropList[i].addEventListener("change", event => {
        loadFlag(event.target)
    })

};

function loadFlag(element) {
    for (code in country_list) {
        if (code == element.value) {
            let imgElement = element.parentElement.querySelector("img");
            imgElement.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
})

Btn.addEventListener("click", (event) => {
    event.preventDefault();
    getExchangeRate();
})

exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector("form input");
    let amountValue = amount.value;
    if (amountValue == "" || amountValue == "0") {
        amount.value = 1;
        amountValue = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/99b3191ff2145b76535fa091/latest/${fromCurrency.value}`;
    fetch(url).
        then(response => response.json()).
        then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
            exchangeRateText.innerHTML = `${amountValue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        }).catch(() => {
            exchangeRateText.innerHTML = "Sorry,something went wrong..."
        })
}