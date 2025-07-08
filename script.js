const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-02-16/v1"; 

const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
  for(currCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;

    if(select.name==="from" && currCode==="USD"){
      newOption.selected="selected";
    }
    else if(select.name==="to" && currCode==="PKR"){
      newOption.selected="selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag=(element)=>{
  let currCode=element.value;
  let countryCode=countryList[currCode];
  let newlink=`https://flagsapi.com/${countryCode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newlink;
};


const updateExchangeRate= async()=>{
  let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  if(amtVal===""|| amtVal<0){
    amtVal=0;
    amount.value=0;
  }

  const URL=`${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data= await response.json();
  let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  let final_ans=rate*amtVal;
  final_res=`${amtVal} ${fromCurr.value} = ${final_ans} ${toCurr.value}`;
  msg.innerText= final_res;

};

btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load", () => {
  updateExchangeRate();
});
