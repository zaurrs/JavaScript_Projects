import { getDatas } from "./request.js";

let getProducts = async () => {
    let response = await axios("http://localhost:3000/products");
    let products = response.data;
    return products;
};

let getUsers = async () => {
    let response = await axios("http://localhost:3000/users");
    let users = response.data;
    return users;
};

document.addEventListener("DOMContentLoaded", async () => {
    let products = await getProducts();
    let users = await getUsers();
    let basket = users.find((user) => user.basket);
    console.log(users);



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


    updateLogin


    function getCard() {
        products.forEach(product => { // Burada users yerine products kullanılmalı
            let card = document.createElement("div");
            card.classList.add("card");

            let img = document.createElement("img");
            img.src = product.image;

            let cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            let description = document.createElement("p");
            description.classList.add("description");

            let price = document.createElement("p");
            price.classList.add("price");

            let quantity = document.createElement("div");
            quantity.classList.add("quantity");
            let minus = document.createElement("button");
            minus.classList.add("minus");
            minus.textContent = "-";
            let count = document.createElement("p");
            count.textContent = "0";

            let plus = document.createElement("button");
            plus.classList.add("plus");
            plus.textContent = "+";

            let deleteBtn = document.createElement("button");
            let deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-trash", "remove");

            description.textContent = product.description;
            price.textContent = product.price;

            // Butonlara olay dinleyicileri ekleyin
            minus.addEventListener("click", () => {
                let currentCount = parseInt(count.textContent);
                if (currentCount > 0) {
                    count.textContent = currentCount - 1;
                }
            });

            plus.addEventListener("click", () => {
                let currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
            });

            deleteBtn.appendChild(deleteIcon);
            deleteBtn.addEventListener("click", () => {
                card.remove(); // Kartı sil
            });

            quantity.append(minus, count, plus);
            cardContent.append(description, price, quantity, deleteBtn);
            card.append(img, cardContent);

            let container = document.querySelector(".container");
            container.appendChild(card); // head öğesini burada eklemeye gerek yok
        });
    }
    getCard();
});



