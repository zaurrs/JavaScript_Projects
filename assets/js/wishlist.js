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
})