document.addEventListener("DOMContentLoaded", async ()=>{
    let getData = async () => {
        
            const response = await axios('http://localhost:3000/products');
            let products = response.data;
         return products
    }
    let products =await getData()
    let filteredProducts= [...products]
    console.log(filteredProducts);
    
    
    function updateProductCards(productsToDisplay) {
        document.querySelector(".cards").innerHTML = "";
        createCard(productsToDisplay);
    }
    
    let searchInp = document.querySelector(".search")
    let searchBtn = document.querySelector(".search-btn")
    
    searchBtn.addEventListener("click", ()=>{
       
       let searchValue= searchInp.value.trim()
  filteredProducts=products.filter((product)=>{
           return product.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        
        updateProductCards(filteredProducts)
    })

    searchInp.addEventListener("input",()=>{
             
       let searchValue= searchInp.value.trim()
       filteredProducts=products.filter((product)=>{
                return product.title.toLowerCase().includes(searchValue.toLowerCase())
             })
             
             updateProductCards(filteredProducts)
    })


    let settings = document.querySelector(".settings")
    settings.addEventListener("click",()=>{
        let params = document.querySelector(".params")
        params.classList.toggle("none")
    })
    let az= document.querySelector(".az")
    az.addEventListener("click", ()=>{
        filteredProducts.sort((a,b)=>{
            return a.title.localeCompare(b.title
                )
                })
                updateProductCards(filteredProducts)
    })
    let za= document.querySelector(".za")
    za.addEventListener("click", ()=>{
        filteredProducts.sort((a,b)=>{
            return b.title.localeCompare(a.title)
        })
        updateProductCards(filteredProducts)
    })
    let high = document.querySelector(".high")
    high.addEventListener("click", ()=>{
        filteredProducts.sort((a,b)=>{
            return b.price - a.price
            })
            updateProductCards(filteredProducts)
        })
    let low = document.querySelector(".low")
    low.addEventListener("click", ()=>{
        filteredProducts.sort((a,b)=>{
            return a.price - b.price
            })
            updateProductCards(filteredProducts)
            })



    function createCard(filteredProducts) {
        
        filteredProducts.forEach(product => {
            let card = document.createElement('div');
            card.classList.add('card');
        
            let button = document.createElement("button");
            button.classList.add('absolute-btn');
            button.textContent = "New"; // Yeni buton metni
        
            let heart = document.createElement("i");
            heart.classList.add("fa-regular", "fa-heart", "wish");
            heart.addEventListener("click", (e)=>{
                e.preventDefault()
                let productId = products.find(product=>product.id===filteredProducts.id)
                console.log(productId);
                
                
            })
        
            let img = document.createElement("img");
            img.setAttribute("src", `${product.image}`); // Ürün resmi
        
            let cardContainer = document.createElement("div");
            cardContainer.classList.add("card-container");
        
            let stars = document.createElement("div");
            stars.classList.add("star");
            for (let i = 0; i < 5; i++) {
                let star = document.createElement("i");
                star.classList.add("fa-solid", "fa-star");
                stars.appendChild(star);
            }
        
            let title = document.createElement("p");
            title.classList.add("title");
            title.textContent = product.title.slice(0,15); // Ürün başlığı
        
            let price = document.createElement("div");
            price.classList.add("price");
        
            let p = document.createElement("p");
            p.classList.add("red-price");
            p.textContent = `$${product.price}`; // Ürün fiyatı
        
            let from = document.createElement("p");
            from.classList.add("from");
            from.textContent = "From $340.00"; // Varsayılan fiyat
        
            let addBtn = document.createElement("button");
            addBtn.classList.add("add-btn");
            addBtn.textContent = "Add to card"; // Sepete ekleme buton metni
        
            price.append(p, from);
            cardContainer.append(stars, title, price, addBtn);
            card.append(button, heart, img, cardContainer);
        
            let cards = document.querySelector(".cards");
            cards.append(card); // Kartı sayfaya ekle
        });
    }



    createCard(filteredProducts)
})

    
    
    
// })
