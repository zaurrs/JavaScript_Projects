import { getDatas, postDatas } from "./request.js";

let getUsers= async ()=> {
    let response = await axios("http://localhost:3000/users")
    let users = response.data
    
    return users
}
document.addEventListener("DOMContentLoaded", async ()=>{


  let users =  await getUsers()

  let form = document.querySelector(".form")
  let username = document.querySelector("#username")
  let password = document.querySelector("#password")


  async function login  (e){
    e.preventDefault()
    if(!users){
      toast("istifadeci tapilmadi")
    }

    let findUser = users.find((user)=>{
     return user.username===username.value && user.password===password.value
    })

    
    console.log(findUser);
    
    if(findUser){
      findUser.isLogined= true; 
      await axios.put(`http://localhost:3000/users/${findUser.id}`, findUser);



    
    window.location.href="index.html"
    }
    else{
      toast("sifre ve ya username yalnisdir")
    }
    
    console.log(findUser);
  }
  form.addEventListener("submit", login)
})
    


   

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



  
  // 
    
  //   let loginBtn = document.querySelector(".login-btn")
  //   loginBtn.addEventListener("click",login)
  //       function login(){
  //           let username = document.getElementById("username").value
  //           let password = document.getElementById("password").value
  //           let user = users.find(user => user.username === username && user.password === password)
  //           if(user){
  //               toast("login success")
  //               window.location.href = "index.html"
                
  //               } else{
  //               toast("user tapilmadi")
  //           }
  //       }
        