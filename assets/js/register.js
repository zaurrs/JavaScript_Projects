import { getDatas, postDatas } from "./request.js";

async function getUsers() {
    let response = await axios("http://localhost:3000/users")
    let users = response.data
    return users
}
document.addEventListener("DOMContentLoaded", async () => {
    let users = await getUsers();
    console.log("Alınan istifadəçilər:", users); // Konsola istifadəçiləri yazdır

    let form = document.querySelector(".form");
    let name = document.querySelector("#name");
    let surname = document.querySelector("#surname");
    let username = document.querySelector("#username");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let rpassword = document.querySelector("#rpassword");
    let isLogined = false


    

   
   async function register(e) {
        e.preventDefault()
        if (password.value !== rpassword.value) {
            toast("Şifrələr uyğun gəlmir");
            return;
        }

        let userUnique = users.some((user) => user.username === username.value || user.email === email.value)
        if (!userUnique) {
            let newUser = {
                name: name.value,
                surname: surname.value,
                email: email.value,
                username: username.value,
                password: password.value,
                rpassword: rpassword.value,
                id: uuidv4(),
                isLogined: isLogined,
                wishlist:[],
                basket:[]
            }
           await postDatas("http://localhost:3000/users", newUser)
            toast("Qeydiyyat uğurla başa çatdi!")
                window.location.href = "login.html"
           
        } else {
            toast("already exsits")
            return
        }


    }
    form.addEventListener("submit", register) // Qeydiyyat funksiyasını çağır
});
function toast(text) {
    Toastify({
        text: `${text}`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}