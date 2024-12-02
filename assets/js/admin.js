
import productURL from "./baseURL.js"
import { getDatas, postDatas } from "./request.js"
import { deleteById, patchById } from "./request.js"

let products = await getDatas(productURL)
const creatTable= async()=>{

    products.forEach(product => {
        
let tableRow = document.createElement("tr")

let tdId = document.createElement("td")
tdId.classList.add("product-id")

let tdImage = document.createElement("td")
let img = document.createElement("img")
img.classList.add("product-image")
tdImage.append(img)

let tdTitle = document.createElement("td")
tdTitle.classList.add("product-title")

let tdCategory = document.createElement("td")
tdCategory.classList.add("product-category")

let tdPrice = document.createElement("td")
tdPrice.classList.add("product-price")



let actions = document.createElement("td")

let editButton = document.createElement("button")
editButton.classList.add("edit-btn")
editButton.textContent="Edit"
editButton.addEventListener("click",()=>{
    editProduct(product.id)
   
})

let deleteButton = document.createElement("button")
deleteButton.classList.add("delete-btn")
deleteButton.textContent="Delete"
deleteButton.addEventListener("click", (e)=>{
    e.preventDefault()
    deleteProduct(product.id)
   
})

tdId.textContent=product.id
img.src = product.image
tdTitle.textContent=product.title
tdCategory.textContent=product.category
tdPrice.textContent=product.price

actions.append(editButton,deleteButton)

tableRow.append (tdId, tdImage, tdTitle, tdCategory, tdPrice, actions)
let tbody = document.querySelector("tbody")
tbody.append(tableRow)
    });

}
creatTable()

const addProduct = async(e)=>{
    e.preventDefault()
    let image = document.querySelector("#image").value
    let title = document.querySelector("#title").value
    let category = document.querySelector("#category").value
    let price = document.querySelector("#price").value

let newProduct = {
    id:uuidv4,
    image,
    title,
    category,
    price,

}
setTimeout(() => {
    toast("edit olundu")
}, 300);
await postDatas(productURL, newProduct)
creatTable()
closeModal()
}
let form = document.querySelector(".form")
form.addEventListener("submit", addProduct)

const deleteProduct= async (productId)=>{    
await deleteById(productURL, productId)
}
const editProduct = async (productId) => {
    // Məhsul məlumatlarını serverdən alırıq
    let product = products.find(p => p.id === productId);  // `products` array-ından düzgün məhsulu tapırıq

    // Formda məhsul məlumatlarını göstəririk
    document.querySelector("#image").value = product.image;
    document.querySelector("#title").value = product.title;
    document.querySelector("#category").value = product.category;
    document.querySelector("#price").value = product.price;

    // Modalı açırıq ki, istifadəçi məlumatları dəyişdirə bilsin
    openModal();

    // Submit əməliyyatı üçün yeni funksiyanı əlavə edirik
    let form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let updatedProduct = {
            image: document.querySelector("#image").value,
            title: document.querySelector("#title").value,
            category: document.querySelector("#category").value,
            price: document.querySelector("#price").value,
        };

        try {
            // PATCH sorğusu ilə məhsulu yeniləyirik
            await patchById(productURL, updatedProduct, productId);
            
            // Yenilənmiş məhsul məlumatlarını göstəririk
            creatTable();
            
            // Success toast mesajı göstəririk
            showToast("Product updated successfully!", true);

            // Modalı bağlayırıq
            closeModal();
        } catch (error) {
            console.error("Error updating product:", error);
            showToast("Failed to update product. Try again.", false); // Error toast mesajı
        }
    });
};

const openModal = ()=>{
    let modal = document.querySelector(".row")
    modal.style.display="flex"
    let qara= document.querySelector(".qara")
    qara.style.display="flex"
}
let addBtn = document.querySelector(".add-btn")
addBtn.addEventListener("click", openModal)

const closeModal = (e)=>{
    let modal = document.querySelector(".row")
    modal.style.display="none"
     let qara= document.querySelector(".qara")
    qara.style.display="none"
 

}
let closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", closeModal)


function toast(message) {
    Toastify({
        text: message,
        duration: 2000,
        gravity: "top",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        },
    }).showToast();
}