document.getElementById("loginForm").addEventListener("submit",async e=>{

e.preventDefault()

const student_id=document.getElementById("student_id").value
const password=document.getElementById("password").value

const res=await fetch("/api/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({student_id,password})
})

const data=await res.json()

if(res.ok){

localStorage.setItem("token",data.token)
location="dashboard.html"

}else{

alert(data.message)

}

})