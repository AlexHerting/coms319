/*
* Uses DOM and loads the products with Javascript instead of HTML
*/
fetch("./data.json")
.then(response => response.json())
.then(prod => loadProducts(prod));

function loadProducts(prod)
{
    var prodTxt10 = document.getElementById("prodTxt10");

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
            case "1":
                prodTxt1.appendChild(prodTxt);
                prodImg[0].src = url;
                prodImg[0].alt = name;
                break;
            case "2":
                prodTxt2.appendChild(prodTxt);
                prodImg[1].src = url;
                prodImg[1].alt = name;
                break;
            case "3":
                prodTxt3.appendChild(prodTxt);
                prodImg[2].src = url;
                prodImg[2].alt = name;
                break;
            case "4":
                prodTxt4.appendChild(prodTxt);
                prodImg[3].src = url;
                prodImg[3].alt = name;
                break;
            case "5":
                prodTxt5.appendChild(prodTxt);
                prodImg[4].src = url;
                prodImg[4].alt = name;
                break;
            case "6":
                prodTxt6.appendChild(prodTxt);
                prodImg[5].src = url;
                prodImg[5].alt = name;
                break;
            case "7":
                prodTxt7.appendChild(prodTxt);
                prodImg[6].src = url;
                prodImg[6].alt = name;
                break;
            case "8":
                prodTxt8.appendChild(prodTxt);
                prodImg[7].src = url;
                prodImg[7].alt = name;
                break;
            case "9":
                prodTxt9.appendChild(prodTxt);
                prodImg[8].src = url;
                prodImg[8].alt = name;
                break;
        }
    }
}