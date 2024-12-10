  const nameEl=document.querySelector(".nameR"); // תיבת הטקסט של השם
  const psbordEl=document.querySelector(".psbord"); // תיבת הטקסט של הסיסמה
  const ApsbordEl=document.querySelector(".Apsbord"); // תיבת הטקסט של אימות הסיסמה
  const emailEl=document.querySelector(".email"); // תיבת הטקסט של האימייל
  const submitEl = document.querySelector(".register") // כפתור השליחה

  const usersList = JSON.parse(localStorage.getItem("users") || "[]"); // רשימת המשתמשים בלוקל סטורג
  const passmes = document.querySelector(".passmes") // הודעת שגיאה של הסיסמה
    const namemes = document.querySelector(".namemes") // הודעת שגיאה של השם משתמש
    const emailmes = document.querySelector(".emailmes") // הודעת שגיאה של האימייל
    const Apsbordmes = document.querySelector(".Apassmes") // הודעת שגיאה של אימות הסיסמה

const  handlButtunCliked=(e)=>
{

        //=========פוקציה 1=======
        //מקבלת את כל הפרטים ובדקת אם הכל מלא ותקין 
        ///אם מלאים שולחת לפנקציה 2
    
        //בודקת גם שאין בלוקאל סטורז משתמש בשם זה
        //בודקת שכל הפרטים מלאים אם מלאים שולחת לפונקצייה 2
        //לאחר כל הודעת שגיאה יוצא מהפונקצייה כדי לא להקשות עם המון הודעות רצופות - לדוגמא כששלחו ריק אם לא יהיה רטורן יישלחו 5 הודעות alert עם הודעת שגיאה זהה
        e.preventDefault();
        const password =  psbordEl.value; // הסיסמה
        const Apassword=ApsbordEl.value; // אימות הסיסמה
        valid = true; // משתנה שמסמל אם הכל תקין
        passmes.textContent = ""; // מנקה את ההודעה של הסיסמה
        namemes.textContent = ""; // מנקה את ההודעה של השם משתמש
        emailmes.textContent = ""; // מנקה את ההודעה של האימייל
        Apsbordmes.textContent = ""; // מנקה את ההודעה של אימות הסיסמה

        
        // בודק אם ה nameEl.value ריק או מלא רק בתווים ריקים
        //באמצעות פונקצייה שמסירה את התווים הריקים מהמחרוזת 

        for (let i = 0; i < password.length; i++) { //בודקת שהסיסמה מכילה רק אותיות באנגלית ומספרים
            if(!isEnglishLetterOrNumber(password[i])){
                passmes.textContent = "הסיסמה חייבת להכיל רק אותיות באנגלית ומספרים"; // אם הסיסמה מכילה תווים שאינם אותיות באנגלית ומספרים מדפיסה הודעה
                valid = false;
            }
        }
        if(usersList.find((el)=>{;return el.userName==nameEl.value})){ //בודקת שאין בלוקאל סטורז משתמש בשם זה
            namemes.textContent = "שם משתמש תפוס, נסה שם משתמש אחר"; // אם השם משתמש תפוס מדפיסה הודעה
            valid = false;
        }
        if(nameEl.value.trim()=="") //בודקת שהשם לא ריק
        {
            namemes.textContent = "חובה למלא שם משתמש"; // אם השם משתמש ריק מדפיסה הודעה
            valid = false; 

        }
        if(password.length!=Apassword.length) //בודקת שהסיסמה והאימות תואמים
        {
            Apsbordmes.textContent = "סיסמת אימות לא תואמת"; // אם הסיסמה והאימות אינם תואמים מדפיסה הודעה
            valid = false;
        }
        if (!emailEl.value.endsWith("@gmail.com")) { //בודקת שהאימייל מסתיים ב gmail.com - כלומר שהוא תקין 
            emailmes.textContent = "אימייל לא תקין"; // אם האימייל לא תקין מדפיסה הודעה
            valid = false;
          }

        if(emailEl.value.trim() ==""){ //בודקת שהאימייל לא ריק
            emailmes.textContent = "חובה למלא אימייל"; // אם האימייל ריק מדפיסה הודעה
            valid = false;
        }
        if(password.length<8){ //בודקת שהסיסמה ארוכה מ8 תווים
            passmes.textContent = "הסיסמה צריכה להכיל לפחות 8 תווים"; // אם הסיסמה קצרה מ8 תווים מדפיסה הודעה
            valid = false;
        }
        if(password.trim() ===""|| password==="" ){ //בודקת שהסיסמה לא ריקה
            passmes.textContent = "חובה למלא סיסמה"; // אם הסיסמה ריקה מדפיסה הודעה
            valid = false;
        }
        if(valid)
            addToUsers();


}

function isEnglishLetterOrNumber(char) { // פונקציה שבודקת אם התו הוא אות או מספר באנגלית
    // הפונקציה פשוט מאתחלת רשימה של כל האותיות והמספרים באנגלית ובודקת אם התו שהתקבל נמצא ברשימה
    const validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return validCharacters.includes(char);
  }
  

const addToUsers=()=>
{
    //=========2=======
    ///יוצרת את האובייקט 
    //שלוחת אותו לפקציה 3 שמעבריה לגף משחקים 

    let obg={userName: nameEl.value, password: psbordEl.value,email:emailEl.value, games:[
        {wins:0 /*כמה נצחונות יש לו*/ 
        ,loses:0 /*כמה כשלונות יש לו*/ 
        ,chooseLevel:1 /*רמה שהוא רוצה לשחק*/ 
        ,level:1/*רמה שהוא יכול לשחק*/
        ,playSound:true/*האם להשמיע מוזיקה*/}
     ]}

    addToLocalStorege(obg);
}

const addToLocalStorege=(user)=>
{    //=========פוקציה 3=======
    //מקבלת אובייקט משתמש ומוסיפה אותו בלוקאל סטורז בסוף המערך
    // מעבירה לדף משחקים 
    usersList.push(user) // מוסיף את המשתמש לרשימה של המשתמשים
    localStorage.setItem("users", JSON.stringify(usersList)); // מעדכן את הרשימה של המשתמשים בלוקל סטורג
    sessionStorage.setItem("currentUser",JSON.stringify(user)) // מעדכן את המשתמש הנוכחי בסשן סטורג
    window.location.href = "../Pages/games.html"; // מעביר לדף משחקים
}



submitEl.addEventListener("click", handlButtunCliked) // מוסיף אירוע לחיצה לכפתור השליחה

  /*המערך משתמשיםלוקאל סטורז יראה כך::
    [
        {"userName":"chaya","password":"123456789","email":"c@gmail.com","games":[
            {
                "wins":1,
                "loses":0,
                "chooseLevel":1,
                "level":1,
                "playSound":true
            }
        ]},

        {"userName":"riky","password":"123456789","email":"r@gmail.com","games":[
            {
                "wins":1,
                "loses":0,
                "chooseLevel":1,
                "level":1,
                "playSound":true
            }
    ]
        */

