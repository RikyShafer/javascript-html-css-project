const registerEl = document.querySelector(".register"); // כפתור ההרשמה
const signInEl = document.querySelector(".SignIn"); // כפתור ההתחברות
const jump = document.querySelector(".jump") // כפתור הקפיצה לסוף הדף
const reg = document.getElementById("reg"); // הדיב של ההרשמה

registerEl.addEventListener("click", (event) => { //אירוע של לחיצה על הכפתור ההרשמה
    event.preventDefault();
        window.location.href = "../Pages/Register.html"; // מעביר אותו לדף ההרשמה
});

signInEl.addEventListener("click", (event) => { //אירוע של לחיצה על הכפתור ההתחברות
    event.preventDefault();
    window.location.href = "../Pages/SignIn.html"; // מעביר אותו לדף ההתחברות
});


jump.addEventListener("click", () => { // אירוע של לחיצה על הקפיצה לסוף הדף
  reg.scrollIntoView({ behavior: "smooth" }); //גולל לסוף הדף
});
