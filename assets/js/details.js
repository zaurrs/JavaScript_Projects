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

        let quantity = document.createElement("div")
        quantity.classList.add("quantity")

        let plus = document.createElement("button")
        plus.classList.add("plus")
        plus.textContent = "+"
        let minus = document.createElement("button")
        minus.classList.add("minus")
        minus.textContent = "-"
        let count = document.createElement("p")
        count.classList.add("count")
        count.textContent="0"
        quantity.append(plus, count, minus)

        let addBtn = document.createElement("button")
        addBtn.classList.add("add-btn")

        title.textContent = product.title
        rate.textContent = product.rating

        rating.append(rate)
        stars.append(st1, st2, st3, st4, st5)
        if (!stars.contains(rating)&&!stars.contains(stars)) {
            star.append(stars, rating);
        }
        
        detailContainer.append(title, star, price,quantity, addBtn)
        details.append(img, detailContainer)




        let desDiv = document.querySelector(".description")

        let description = document.createElement("p")
        description.classList.add("description-text")
        description.textContent = product.description
        
         desDiv.append(description)
         let savedCount = localStorage.getItem("productCount");
         if (savedCount) {
             count.textContent = savedCount;
             if (parseInt(savedCount) > 0) {
                 minus.disabled = false;
             }
         }
 
         plus.addEventListener("click", () => {
             let currentCount = parseInt(count.textContent);
             count.textContent = currentCount + 1; // Say artır
         
             // - düyməsini aktivləşdir
             minus.disabled = false;
         });
         
         minus.addEventListener("click", () => {
             let currentCount = parseInt(count.textContent);
         
             // Say 0-dan az olarsa azalmaması üçün yoxla
             if (currentCount > 0) {
                 count.textContent = currentCount - 1; // Say azaldır
             }
         
             // Say sıfır olduqda - düyməsini deaktiv et
             if (parseInt(count.textContent) === 0) {
                 minus.disabled = true;
             }
         })
    }

    let relatedProducts = products.filter(item => item.category === product.category && item.id !== product.id);

    // Eyni kateqoriyadakı məhsulları "cards" hissəsinə əlavə etmək
    let cards = document.querySelector(".cards");
    relatedProducts.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("card");
        let button = document.createElement("button");
        button.classList.add("absolute-btn")
        button.textContent = "New";
        let heart = document.createElement("i")
        heart.classList.add("fa-regular", "fa-heart", "wish")

        let img = document.createElement("img");
        img.src = product.image

        let cardContainer = document.createElement("div")
        cardContainer.classList.add("card-container")
        let star = document.createElement("div")
        star.classList.add("star")
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

        let title = document.createElement("p")
        title.classList.add("title")
        let price = document.createElement("div")
        price.classList.add("price")

        let redPrice = document.createElement("p")
        let gray = document.createElement("p")
        gray.classList.add("gray")
        gray.textContent="From $340"

        let createElement = document.createElement("button")
        createElement.classList.add("add-btn")

        price.append(redPrice, gray)
        star.append(st1,st2,st3,st4,st5)
        cardContainer.append(star, title,price,button)
        card.append(button, heart,img,cardContainer)
        cards.append(card)


        cards.appendChild(card);
    });
    $('.cards').slick({
        // Burada xüsusi seçimlər təyin edə bilərsiniz
        dots: true,          // Nöqtələri göstər
        infinite: true,      // Sonsuz dövr
        speed: 500,          // Keçid sürəti (məsələn 500ms)
        autoplay: true,      // Avtomatik keçid
        autoplaySpeed: 1000, // Avtomatik keçid sürəti (1000ms = 1 saniyə)
        slidesToShow: 3,     // Hər dəfə bir şəkil göstər
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2, // 1024px-dən kiçik ekranlarda 2 kart göstər
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1, // 600px-dən kiçik ekranlarda tək kart göstər
                    slidesToScroll: 1,
                }
            }
        ]// Hər dəfə bir şəkil keçirmək
    })


getCard()
})