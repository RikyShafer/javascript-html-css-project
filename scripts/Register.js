const register = document.querySelector(".register") // כפתור הכניסה
const nameEl = document.querySelector(".user-name"); // אינפוט של השם משתמש
const psbordEl = document.querySelector(".psbord") // אינפוט של הסיסמה
const usersList = JSON.parse(localStorage.getItem("users") || "[]"); // רשימת המשתמשים בלוקל סטורג
const passmes = document.querySelector(".passmes") // הודעת שגיאה של הסיסמה
const namemes = document.querySelector(".namemes") // הודעת שגיאה של השם משתמש

const add = (e) => { // אם משתמש לוחץ על כפתור השליחה
    passmes.textContent = ""; // מנקה את ההודעה של הסיסמה
    namemes.textContent = ""; // מנקה את ההודעה של השם משתמש
    e.preventDefault()
    const user = usersList.find((el) => el.userName === nameEl.value);  // מחפשת אם יש משתמש עם שם זהה ברשימת המשתמשים
    if (user) { // אם יש משתמש עם שם זהה
        if(user.password === psbordEl.value)  //אם הסיסמה נכונה
            addToSessionStorage(user);  // מוסיפה את המשתמש לסשן סטורג ומעבירה אותו לדף משחקים
        else
            passmes.textContent = "הסיסמה שגויה"; // אם הסיסמה שגויה מדפיסה הודעה
    } 
    else {
        namemes.textContent = "שם משתמש לא קיים"; // אם השם משתמש לא קיים מדפיסה הודעה
    }
};

const addToSessionStorage = (user) => {

    //מקבלת אובייקט משתמש ומוסיפה אותו בלוקאל סטורז בסוף המערך
    // מעבירה לדף משחקים 
    sessionStorage.setItem("currentUser", JSON.stringify(user)) // מעדכנת את המשתמש הנוכחי בסשן סטורג
    window.location.href = "games.html"; // מעבירה אותו לדף משחקים

}


register.addEventListener("click", add) // אירוע של לחיצה על הכפתור ההרשמה


