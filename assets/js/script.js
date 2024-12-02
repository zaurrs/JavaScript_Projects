import { getDatas } from "./request.js";

let getUsers = async () => {
    let response = await axios("http://localhost:3000/users");
    let users = response.data;
    return users;
};

document.addEventListener("DOMContentLoaded", async () => {
    let users = await getUsers();

    // Konsola istifadəçi məlumatlarını yazaraq nə gəlirə baxaq
    console.log(users);

    // İstifadəçi daxil oldumu yoxlayırıq
    let findUser = users.find((user) => user.isLogined === true);
    console.log(findUser); // Konsolda istifadəçi tapılmadığı halda undefined olacaq

    let user = document.querySelector(".user");
    let logout = document.querySelector(".logout");
    let login = document.querySelector(".login");
    let register = document.querySelector(".register");
    let admin = document.querySelector(".admin");
    let profil = document.querySelector(".profile");

    function updateLogin() {
        if (findUser) {
            user.style.display = "none"
            logout.style.display = "block"
            login.style.display = "none"
            register.style.display = "none"
            profil.textContent = findUser.username
            admin.style.display = "block"


        } else {

            user.style.display = "block"
            logout.style.display = "none"
            login.style.display = "block"
            register.style.display = "block"
            admin.style.display = "none"
            profil.style.display = "none"
        }
    }

    logout.addEventListener("click", async () => {
        if (findUser) {
            findUser.isLogined = false;
            await axios.put(`http://localhost:3000/users/${findUser.id}`, findUser);

            toast("Çıxış edildi!");
        }
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    });
    updateLogin();
});



let qeydiyyat = document.querySelector(".qeydiyyat")
let user = document.querySelector(".user").addEventListener("click", (e) => {
    e.preventDefault()
    qeydiyyat.classList.toggle("none");
})

let admin = document.querySelector(".admin").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "admin.html"
})




let getProducts = async () => {
    try {
        const responss = await axios('http://localhost:3000/users');
        let users = responss.data
        const response = await axios('http://localhost:3000/products');
        let products = response.data;
        let filteredProducts = [...products];
        console.log(filteredProducts);
        let currentUser = users ? users.find((user) => user.isLogined === true) : null;
        console.log(currentUser);

        products.forEach(product => {
            let updatedWishlist = [...currentUser.wishlist, product];
            let updatedBasket = [...currentUser.basket, product]

            let card = document.createElement('div');
            card.classList.add('card');
            card.addEventListener("click", () => {
                if (currentUser.isLogined) {
                    window.location.href =(`details.html?id=${product.id}`)
                }

            })




            let button = document.createElement("button");
            button.classList.add('absolute-btn');
            button.textContent = "New";



            let heart = document.createElement("i");
            heart.classList.add("fa-regular", "fa-heart", "wish");
            heart.style.cursor = "pointer"
            heart.addEventListener("click", async (e) => {
                e.stopPropagation(); // Prevent the click event from propagating
                e.preventDefault(); // Prevent default action (page refresh)

                // Check if the user is logged in
                if (currentUser) {
                    // Check if the product is already in the wishlist
                    const productInWishlist = currentUser.wishlist.some(item => item.id === product.id);

                    if (!productInWishlist) {
                        // Add the product to the wishlist if it's not already in
                        heart.classList.remove("fa-regular");
                        heart.classList.add("fa-solid");

                        const updatedWishlist = [...currentUser.wishlist, product]; // Add product to the wishlist

                        try {
                            // Update the wishlist in the backend
                            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { wishlist: updatedWishlist });
                            toast("Product added to wishlist!");
                        } catch (error) {
                            console.error("Error updating wishlist:", error);
                            toast("Error adding product to wishlist.");
                        }
                    } else {
                        // Remove the product from the wishlist if it's already in
                        heart.classList.remove("fa-solid");
                        heart.classList.add("fa-regular");

                        const updatedWishlist = currentUser.wishlist.filter(item => item.id !== product.id); // Remove product from wishlist

                        try {
                            // Update the wishlist in the backend
                            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { wishlist: updatedWishlist });
                            toast("Product removed from wishlist!");
                        } catch (error) {
                            console.error("Error updating wishlist:", error);
                            toast("Error removing product from wishlist.");
                        }
                    }
                } else {
                    // If the user is not logged in, redirect to login page
                    toast("Please log in to add/remove products from your wishlist.");
                    setTimeout(() => {
                        window.location.href = "login.html"; // Redirect to login page after 2 seconds
                    }, 2000);
                }
            });

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
            title.textContent = product.title.slice(0, 15); // Ürün başlığı

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
            addBtn.textContent = "Add to cart"; // Button text to add to cart
            addBtn.style.cursor = "pointer";

            addBtn.addEventListener("click", async (e) => {
                e.stopPropagation(); // Prevent the click event from propagating
                e.preventDefault(); // Prevent default action (page refresh)

                // Check if the user is logged in
                if (currentUser) {
                    // Check if the product is already in the basket
                    const productInBasket = currentUser.basket.some(item => item.id === product.id);

                    if (!productInBasket) {
                        // Add the product to the basket if it's not already there
                        const updatedBasket = [...currentUser.basket, product]; // Add product to the basket

                        try {
                            // Update the basket in the backend
                            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { basket: updatedBasket });
                            toast("Product added to basket!");
                        } catch (error) {
                            console.error("Error updating basket:", error);
                            toast("Error adding product to basket.");
                        }
                    } else {
                        // Remove the product from the basket if it's already there
                        const updatedBasket = currentUser.basket.filter(item => item.id !== product.id); // Remove product from basket

                        try {
                            // Update the basket in the backend
                            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, { basket: updatedBasket });
                            toast("Product removed from basket!");
                        } catch (error) {
                            console.error("Error updating basket:", error);
                            toast("Error removing product from basket.");
                        }
                    }
                } else {
                    // If the user is not logged in, redirect to login page
                    toast("Please log in to add/remove products from your basket.");
                    setTimeout(() => {
                        window.location.href = "login.html"; // Redirect to login page after 2 seconds
                    }, 2000);
                }
            });


            price.append(p, from);
            cardContainer.append(stars, title, price, addBtn);
            card.append(button, heart, img, cardContainer);

            let cards = document.querySelector(".cards");
            cards.append(card); // Kartı sayfaya ekle
        });

    } catch (error) {
        console.error('Bir hata oluştu:', error);
    }
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
}

getProducts();





$(document).ready(function () {
    $('#reklam').slick({
        // Burada xüsusi seçimlər təyin edə bilərsiniz
        dots: true,          // Nöqtələri göstər
        infinite: true,      // Sonsuz dövr
        speed: 500,          // Keçid sürəti (məsələn 500ms)
        autoplay: true,      // Avtomatik keçid
        autoplaySpeed: 1000, // Avtomatik keçid sürəti (1000ms = 1 saniyə)
        slidesToShow: 1,     // Hər dəfə bir şəkil göstər
        slidesToScroll: 1  // Hər dəfə bir şəkil keçirmək
    })
});


// function toast(text) {
//     Toastify({
//         text: `${text}`,
//         duration: 2000,
//         gravity: "top",
//         position: "right",
//         style: {
//             background: "linear-gradient(to right, #00b09b, #96c93d)",
//         },
//     }).showToast();
// }

