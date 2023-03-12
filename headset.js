/*
* Uses DOM and loads the products with Javascript instead of HTML
*/
fetch("./data.json")
.then(response => response.json())
.then(prod => loadProducts(prod));

function loadProducts(prod)
{
    for (var i = 0; i < prod.products.length; i++)
    {
        let name = prod.products[i].name;
        let url = prod.products[i].url;
        let desc = prod.products[i].description;

        let prodImg = document.querySelectorAll("img");
        // let prodImg = document.createElement("div");
        // prodImg.innerHTML = `<img src=${url} alt=${name}></img>`;
        let prodTxt = document.createElement("p");
        prodTxt.innerHTML = `<p class="card-text">${desc}</p>`;

        switch(prod.products[i].productId)
        {
            case "16":
                prodTxt16.appendChild(prodTxt);
                prodImg[0].src = url;
                prodImg[0].alt = name;
                break;
            case "17":
                prodTxt17.appendChild(prodTxt);
                prodImg[1].src = url;
                prodImg[1].alt = name;
                break;
            case "18":
                prodTxt18.appendChild(prodTxt);
                prodImg[2].src = url;
                prodImg[2].alt = name;
                break;
        }
    }
}