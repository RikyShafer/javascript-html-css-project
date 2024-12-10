
const buttonG = document.querySelector(".buttonG"); //כפתור המעבר למשחק מתוך הכרטיס
const boolPgiahBack = document.querySelector(".boolPgiahBack"); // דיב של הכרטיס של המשחק - צד אחורי
const backgroundMusic = document.getElementById("backgroundMusic"); // קובץ המוזיקת רקע
const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // המשתמש הנוכחי בסשן סטורג
let usersList = JSON.parse(localStorage.getItem("users")) || []; // רשימת המשתמשים בלוקל סטורג
const toname = document.querySelector(".toname"); // הכותרת בה נכתוב ברכת שלום אישית לשם המשתמש
const sound = document.querySelector(".sound");  // כפתור השמע/השתקת המוזיקה בתוך הכרטיס
const textInputs = document.querySelector(".text") // דיב שלתוכו ייכנסו הבחירות של הרמה בה ישחק המשתמש
const mes = "שלום,  " + currentUser.userName; // הטקסט של הכותרת בה נכתוב ברכת שלום אישית לשם המשתמש
toname.textContent = mes; // הכנסת הטקסט לתוך הכותרת

if (currentUser.games[0].playSound) { //מכניס את הסמל המתאים לכפתור השמע/השתקת המוזיקה בכרטיס
   sound.src = "../images/sound.png";
}else{
   sound.src = "../images/notSound.png";
}

sound.addEventListener("click", () => { // פונקציה שמטפלת בלחיצה על כפתור השמע/השתקת המוזיקה בכרטיס
   currentUser.games[0].playSound = !currentUser.games[0].playSound; // Toggle - הפוך את הבחירה של המשתמש מוזיקה מופעלת/מוזיקה כבויה

   if (currentUser.games[0].playSound) { //מכניס את הסמל המתאים לכפתור השמע/השתקת המוזיקה בכרטיס
      sound.src = "../images/sound.png";
   }
   else {
      sound.src = "../images/notSound.png";
   }

   usersList = usersList.map((el) => { // מעדכן את הרשימה של המשתמשים
      if (currentUser.userName === el.userName) { //עובר על כל המשתמשים ואם מצא את המשתמש הנוכחי מעדכן אותו
         return currentUser;
      }
      return el;
   });
   localStorage.setItem("users", JSON.stringify(usersList)); // מעדכן את הרשימה של המשתמשים בלוקל סטורג
   sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // מעדכן את המשתמש הנוכחי בסשן סטורג
});



function addScoreToBackBoolPgiha() { // פונקציה שמוסיפה לכרטיס את הניקוד של המשתמש מהסשן סטורג
   //מכניס לתוך div שהוכן מראש כדי לשמור על הסדר - שהכפתור נמצא יותר למטה
   const scoreText = `${currentUser.games[0].wins} ניצחונות \n ${currentUser.games[0].loses} כישלונות`; // מייצר טקסט עם הניקוד של המשתמש
   const scorePEl = document.createElement("p"); //יוצר תגית p בשביל הניקוד
   scorePEl.innerText = scoreText; // מכניס את הטקסט של הניקוד לתוך התגית
   textInputs.appendChild(scorePEl); // בdiv המיועד לו מכניס את התגית לתוך הכרטיס
}

function addInputToBackBoolPgiah() { // פונקציה שמוסיפה לכרטיס את הבחירה של הרמה בה ישחק המשתמש
   const divInputs = document.createElement("div"); // יוצר div שיכיל את כל האפשרויות
   divInputs.classList.add("divInputs"); // מוסיף לdiv קלאס
   const levels = ["קל", "בינוני", "קשה"]; // מערך של שמות של הרמות

   for (let i = 0; i < 3; i++) { // עובר על המערך ויוצר אפשרות לכל אחת מהרמות
      const divInput = document.createElement("div"); // יוצר div שיכיל את הבחירה והתווית לכל אפשרות
      divInput.classList.add("divInput"); //  מוסיף ל div קלאס

      const inputEl = document.createElement("input"); // יוצר תגית input שיכיל את הבחירה
      inputEl.type = "radio"; // סוג התגית הוא רדיו
      inputEl.name = "level"; 
      inputEl.value = i + 1; // הערך של התגית הוא המספר של הרמה - רמה 1,2,3

      const labelEl = document.createElement("label"); // יוצר תגית label שיכיל את שם הרמה
      labelEl.textContent = levels[i]; // הכנסת שם הרמה לתוך התגית
      if (i >= currentUser.games[0].level) { // אם הרמה היא גבוהה מהרמה של המשתמש מסמן אותה כלא פעילה
         inputEl.disabled = true; // מסמן את הרדיו כלא פעיל - אי אפשר לבחור אותה
         labelEl.style.textDecoration = "line-through"; // מסמן קו חוצה על השם של הרמה
      }

      inputEl.addEventListener("change", function () { // פונקציה שמטפלת בשינוי בבחירה של הרמה
         const selectedLevel = this.value; // הערך של הרמה שנבחרה
         currentUser.games[0].chooseLevel = selectedLevel; // מעדכן את הרמה שנבחרה במשתנה של המשתמש

         const updatedUsersList = usersList.map((el) => { // עובר על כל המשתמשים
            if (currentUser.userName === el.userName) { //מצא את המשתמש הנוכחי ומעדכן אותו
               return currentUser;
            }
            return el;
         });

         localStorage.setItem("users", JSON.stringify(updatedUsersList)); // מעדכן את הרשימה של המשתמשים בלוקל סטורג
         sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // מעדכן את המשתמש הנוכחי בסשן סטורג
      });

      divInput.appendChild(inputEl); // מכניס את התגית של הבחירה לתוך הdiv
      divInput.appendChild(labelEl);// מכניס את התגית של השם של הרמה לתוך הdiv
      divInputs.appendChild(divInput); // מכניס את הdiv של הבחירה והתווית לתוך הdiv של כל האפשרויות
   }

   textInputs.appendChild(divInputs);// מכניס את הdiv של כל האפשרויות לתוך הכרטיס
}

buttonG.addEventListener("click", (event) => { // פונקציה שמטפלת בלחיצה על כפתור המעבר למשחק
   event.preventDefault();
   window.location.href = "../Pages/game.html";
});


addScoreToBackBoolPgiha(); // קריאה לפונקציה שמוסיפה לכרטיס את הניקוד של המשתמש מהסשן סטורג
addInputToBackBoolPgiah(); // קריאה לפונקציה שמוסיפה לכרטיס את הבחירה של הרמה בה ישחק המשתמש

const imgLogo=document.querySelector(".imgLogo");



buttonG.addEventListener("click", (event) => { // פונקציה שמטפלת בלחיצה על כפתור המעבר למשחק
   event.preventDefault();
   window.location.href = "../Pages/game.html";
});
