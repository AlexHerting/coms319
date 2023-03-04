
//let inner = localStorage.getItem("cart");
// console.log(inner);
//let container = document.getElementById("contain");
// let cartItem = document.createElement("div");
// cartItem.innerHTML = inner.toString();
// console.log(cartItem.innerHTML);


const searchParams = new URLSearchParams(window.location.search);
const myData = searchParams.get("data");
let mycontainer =  document.getElementsByClassName("contain");
let myItem = document.createElement("div");
myItem.innerHTML = myData;

console.log(myItem.innerHTML); // Output: "Hello, world!"


if (mycontainer == null) {

    console.log('null cont');
}
mycontainer[1].appendChild(myItem); 


// cart.js


function getIdElement() {

    localStorage.set("contain", document.getElementById("contain"));
}
