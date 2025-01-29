const baseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
// const f = "usd";
// const t = "inr";
// const url = `${baseURL}/${f}.json`;
// const msg = document.querySelector("#exm");
// const func = async () => {
//     try {
//         let response = await fetch(url);
    
//         let responseJSON = await response.json();
    
//        let rate = responseJSON[f][t];
//        msg.innerText = rate;
    
//         if (!response.ok) {
//             throw new Error(`Network response was not ok`);
//         }
//     } catch (error) {
//         msg.innerHTML = `Failed to fetch exchange rate. Try again later.`;
//         console.error("Fetch error:", error);
//         return;
//     }
// };

const dropdowns = document.querySelectorAll(".dropdowns select");
const fromFlag = document.querySelector("#fromFlag");
const toFlag = document.querySelector("#toFlag");
const btn = document.querySelector("#btn");
const amount = document.querySelector(".amount input");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector("#msg");

for(let select of dropdowns) {
    for(code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        changeFlag(evt.target.value,select);
    });
}

const changeFlag = (code, select) => {
    let countryCode = countryList[code];
    const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
    if(select.name === "from") {
        fromFlag.src = flagUrl;
    } else {
        toFlag.src = flagUrl;
    }
}

const calcExchange = async () => {
    let fromCurr = fromCurrency.value.toLowerCase();
    let toCurr = toCurrency.value.toLowerCase();
    const url = `${baseURL}/${fromCurr}.json`;
    let response = await fetch(url);
    let result = await response.json();
    let rate = result[fromCurr][toCurr];
    let finalAmount = rate * amount.value;
    msg.innerText = `${amount.value} ${fromCurr} = ${finalAmount} ${toCurr}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    calcExchange();
});

window.addEventListener("load", () => {
    calcExchange();
  });
