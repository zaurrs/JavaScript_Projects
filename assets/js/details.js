let id = new URLSearchParams(window.location.search).get("id")

console.log(id);

let getProducts = async () => {
    let response = await axios("http://localhost:3000/products");
    let users = response.data;
    return users;
};
document.addEventListener("DOMContentLoaded", async () => {
    let products = await getProducts();
    let product = products.find(item=>item.id===id)
    console.log(product);
    

    function getCard() {
        let details = document.querySelector(".details")

        let img = document.createElement("img")
        img.classList.add("detaimg")
        img.src = product.image
        let detailContainer = document.createElement("div")
        detailContainer.classList.add("details-container")

        let title = document.createElement("h4")
        title.classList.add("title")

        let star = document.querySelector("div")
        star.classList.add("star")

        let stars = document.querySelector("div")
        stars.classList.add("stars")

        let st1 = document.createElement("i")
        st1.classList.add("fa-solid", "fa-star")
        let st2 = document.createElement("i")
        st2.classList.add("fa-solid", "fa-star")
        let st3 = document.createElement("i")
        st3.classList.add("fa-solid", "fa-star")
        let st4 = document.createElement("i")
        st4.classList.add("fa-solid", "fa-star")
        let st5 = document.createElement("i")
        st5.classList.add("fa-solid", "fa-star")

        let rating = document.querySelector("div")
        rating.classList.add("rating")

        let rate = document.createElement("p")
        rate.classList.add("rate")

        let price = document.createElement("p")
        price.classList.add("price")

        let addBtn = document.createElement("button")
        addBtn.classList.add("add-btn")

        title.textContent = product.title
        rate.textContent = product.rating

        rating.append(rate)
        stars.append(st1, st2, st3, st4, st5)
        if (!stars.contains(rating)&&!stars.contains(stars)) {
            star.append(stars, rating);
        }
        
        detailContainer.append(title, star, price, addBtn)
        details.append(img, detailContainer)




        let desDiv = document.querySelector("description")

        let description = document.createElement("p")
        description.classList.add("description-text")
        description.textContent = product.description
        
         desDiv.append(description)
    }

  

getCard()
})