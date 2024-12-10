
const openMenue = document.querySelector(".openMenue") //כפתור פתיחת תפריט - השלוש פסים האדומים
const revBtn = document.querySelector(".reveal") //כפתור גלה צבעים
const colors = ["aqua", "yellow", "orange", "purple", "gray", "red", "blue", "green"]; // מערך של כל הצבעים האפשריים
const bodyElement = document.querySelector("body"); // קבל את האלמנט של הדף
const gameBoardElement = document.querySelector(".gameBoard"); // קבל את האלמנט של לוח המשחק
const submitRowElement = document.querySelector(".submit"); // קבל את האלמנט של הכפתור של "שלח שורה"
let usersList = JSON.parse(localStorage.getItem("users")) // קבל את כל המשתמשים מהלוקל סטורג'
const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // קבל את המשתמש הנוכחי מהסשן סטורג'
const clickSoundColors = document.getElementById("clickSoundColors"); // קבל את האלמנט של הצליל של לחיצה על צבע
const clickSoundCircls = document.getElementById("clickSoundCircls"); // קבל את האלמנט של הצליל של לחיצה על עיגול
const clikeToValidateRow = document.getElementById("clikeToValidateRow"); // קבל את האלמנט של הצליל של לחיצה על כפתור "שלח שורה"
const sound = document.querySelector(".sound");
const winSound = document.getElementById("win"); // קבל את האלמנט של הצליל של ניצחון
const loseSound = document.getElementById("lose"); // קבל את האלמנט של הצליל של הפסד

let choseUser = [-1, -1, -1, -1]; // מערך של הצבעים שנבחרו - מאותחל ל -1
let currentRow = 1; // משתנה של השורה הנוכחית
let circles; // משתנה של כל העיגולים בשורה הנוכחית
//נתמונה של הסאונד בתפריט צד


//=====מחוקים את זה שלא היה מוזקת שמע כל המחשק על רק באת לחיצה על התופרתים צליל קטן ====
// // פונקצייה להפעלת הנוזיקת רקע ולהפעלתה מחדש כשהיא נגמרת




if (currentUser.games[0].playSound) { //מכניס את הסמל המתאים לכפתור השמע/השתקת המוזיקה בכרטיס
    sound.src = "../images/sound.png";
} else {
    sound.src = "../images/notSound.png";
}

const chooseRandomColors = () => { // פונקצייה לבחירת צבעים רנדומליים
    // מאתחל מערך לשמור את הצבעים שנבחרו
    const choosenColors = []; // מערך לשמור את הצבעים שנבחרו

    for (let i = 0; i < 4; i++) { // לולאה שרצה 4 פעמים
        let num;
        let exists;

        do {
            num = Math.floor(Math.random() * 8); //יוצר מספר רנדוצלי בין 0 ל 8
            if (currentUser.games[0].chooseLevel != 3)//אם זה רמה 3 אז בעצם אין בעיה שהיה צבעים כפולים אום זה לא רמה 3 אז יש בעיה וצריך להגריל שוב
                exists = choosenColors.includes(colors[num]); // בודק אם המספר כבר קיים במערך
        } while (exists);

        choosenColors.push(colors[num]); // מוסיף את במספר הייחודי למערך
    }
    console.log(choosenColors); // מדפיס את המערך
    return choosenColors; // מחזיר את המערך
}

const choosenColors = chooseRandomColors();//זימון אתחול מערך צבעים רנדומליים של פונקציה 1 





const addEventListenerToCircles = () => {
    //========פונקציה 2======== 
    //אירוע לחיצה שיקרא לפנקציה 4 ואז לפנקציה 3 אם פרמטר העיגול
    // היא עושה להוסיף EVENT
    //לכל עיגול בשורה הנוכחית

    // Remove red border from the previously highlighted row
    const prevRow = document.querySelector(".circle" + (currentRow - 1)); // קבל את השורה המודגשת הקודמת
    if (prevRow) { // אם יש שורה קודמת
        prevRow.style.border = "none"; // הסר את הגבול האדום מהשורה הקודמת
    }


    const name = ".circleRow" + currentRow;//  currentRow מקבל כל פעם איזה שורה אוח ז כרגע לפי המשתנה החצוני שיש לו של  nameה 
    //למעשה יצר את שם הקלאס הרלוונטי//כן הוא בעצם שומר לי אותו במשתנה את שורה הנוכחית  
    const Row = ".circle" + currentRow; //  קבל את ה class השורה הנוכחית
    const row = document.querySelector(Row); // קבל את השורה הנוכחית
    row.style.border = "2px solid red"; // הוסף מסגרת אדומה לשורה הנוכחית
    row.style.borderRadius = "13px"; // הגדר רדיוס מסגרת עגולה
    row.style.borderWidth = "1px"; // הגדר רוחב מסגרת


}

addEventListenerToCircles(); // קרא לפונקציה 2





const poolColorosAll = document.querySelectorAll(".poolColor") //מכיל מערך של כל הצבעים במאגר הצבעים


const removeEventListenerFromFullColors = () => {
    //==========פונקציה 4=========
    //מוחקת את האירועים הקודמים ממאגר הצבעים
    poolColorosAll.forEach(e => { //עובר על המערך ב foreach
        e.removeEventListener("click", handleClickPoolColor); //מוחק את האירועים הקודמים ממאגר הצבעים
    });
};

const paintColors = (color, circle) => {
    //==========פונקציה 5=========
    //מזמן את פוקציה 6 ששומרת את הצבע במערך הצבעים שלנו שאותו בעצם בודקים אם זה נכון 
    // circle.style.backgroundColor = color;

    const radialGradient = `radial-gradient(circle at 10px 10px, ${color}, #000)`; // יוצר גרדיאנט בשביל התלת מימד של הכדורים


    circle.style.background = radialGradient;   // מגדיר את הרקע של הכדור לגרדיאנט שיצרנו
    circle.classList.remove("circ") // מסיר מהכדור הגדרה של "עיגול"
    circle.classList.add("ball") // מוסיף לכדור הגדרה של "כדור"
    keepColorInMemory(color, circle); // קורא לפונקציה 6
}
const keepColorInMemory = (color, circle) => {
    //==========פונקציה 6=========
    choseUser[circle.classList[1] - 1] = color; // בודק איזה עיגול נלחץ ושומר את הצבע שנבחר במערך הצבעים שלנו
    //  במיקום של העיגול את הצבע שנבחר tuzeUse ושומרת במשתנה 
}

const validateRow = () => {
    //==========פונקציה 7=========

    //בודק אם כ הצבעים בשורה באמת נצבעו והם לא חזורים על עצמם פעמים 
    //אם לא נבעו כל העיגולים יש הודעה ולא ישמור 
    //אם כן הכל מלא ושנה אז פנקציה 8 שהיא מקבלת את כל הנתונים של השורה 
    if (currentUser.games[0].playSound) // אם המשתמש בחר שיש מוזיקה
        clikeToValidateRow.play(); // הפעלת המוזיקה



    for (let i = 0; i < choseUser.length; i++) { // עובר על המערך של הצבעים שנבחרו
        if (choseUser[i] === -1) { // אם יש עיגול שלא נבחר
            alert("יש לבחור ארבעה צבעים, אין להשאיר עיגולים ריקים"); // הודעה למשתמש
            return; // אל תמשיך
        }
        for (let j = 0; j < choseUser.length; j++) { // עובר על המערך של הצבעים שנבחרו
            if (choseUser[i] === choseUser[j] && i !== j) { // אם יש צבע שחוזר על עצמו
                if (currentUser.games[0].chooseLevel != 3) {//אם זה לא רמה 3 (כי ברמה 3 מותר לחזור על צבעים)
                    alert("יש לבחור ארבעה צבעים שונים, אין לחזור פעמיים על אותו צבע");    // הודעה למשתמש
                    return;
                }
            }
        }
    }

    analyzeResultsNEW() //  קרא לפונקציה 8 שמחשבת כמה בולים ופגיעות יש שבודקת איזה רמה המשתמש משחק ולפי זה שולחת לפונקצייה שמחשבת את התוצאה
    addEventListenerToCircles()
};
//event listeners
submitRowElement.addEventListener("click", validateRow) // קרא לפונקציה 7 בעת לחיצה על הכפתור של "שלח שורה"



const analyzeResultsNEW = (choosen) => {
    //==========פונקציה 8=========
    //פונקציה זהו בעצם בודקת על איזה רמה המשתמש משחק 
    //אם זה הרמה הקלה אז סדר הצהובים ואדומים היו  בדיוק במקום הזוי שלהם 
    //ואם זה רמה ב או ג אז קודם יפיע הצהובים ואחרים יפיע האודמים לא קדוק דווקה למיקום של הכדור  
    if (currentUser.games[0].chooseLevel == 2) // אם זה ברמה ב
        chooseLevelBandB();//רמה ב 
    else if (currentUser.games[0].chooseLevel == 1) // אם זה ברמה א
        analyzeResultsA();// רמה א' 
    else if (currentUser.games[0].chooseLevel == 3) // אם זה ברמה ג
        analyzeResultsC() // רמה ג'
}


const analyzeResultsA = () => {
    //==========פונקציה 8-א=========
    //מחשבת כמה בולים או פגיעות לא נכנוות או כמעט נכנות יש כרגע 
    //אם יש נצחון כלומר 4 בלונים נכונם 
    //אז קוראת לפקנציה 11 שמקבלת פרמטר TRUE
    //אם לא הכל היה לא נכון אז נזמן את פוקציה 9 שמקבלת במערך מה הנתחנים שלו לנחוש זה 
    // ברמה א' הציון הוא לפי הסדר של הבולים והפגיעות
    //ההבדל בחישוב בין רמה א' לרמה ב' הוא שהציון לא לפי סדר הבולים והפגיעות

    const score = [-1, -1, -1, -1]; // מערך של הציון - מאותחל ל -1
    for (let i = 0; i < choseUser.length; i++) { // עובר על המערך של הצבעים שהמשתמש בחר
        for (let j = 0; j < choosenColors.length; j++) { // עובר על המערך של הצבעים שהמחשב בחר
            if (choseUser[i] === choosenColors[j] && i === j) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר והמיקום שלהם זהה
                score[i] = "bool"; // זה נחשב בול
            } else if (choseUser[i] === choosenColors[j]) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר אבל המיקום שלהם שונה
                score[i] = "hit"; // זה נחשב פגיעה
            }
        }
    }


    addScoreToThePage(score);  // קרא לפונקציה 9 שמקבלת את הציון ומוסיפה אותו לדף
}


const chooseLevelBandB = () => {
    //==========פונקציה 8-ב=========
    //מחשבת כמה בולים או פגיעות לא נכנוות או כמעט נכנות יש כרגע 
    //אם יש נצחון כלומר 4 בלונים נכונם 
    //אז קוראת לפקנציה 11 שמקבלת פרמטר TRUE
    //אם לא הכל היה לא נכון אז נזמן את פוקציה 9 שמקבלת במערך מה הנתחנים שלו לנחוש זה 
    //ברמה ב' הציון לא לפי הסדר של הבולים והפגיעות אלא קודם יפיע הצהובים ואחר כך יפיע האדומים לא  דווקא לפי המיקום של הכדור
    //ההבדל בחישוב בין רמה א' לרמה ב' הוא שהציון לא לפי סדר הבולים והפגיעות

    const score = [-1, -1, -1, -1]; // מערך של הציון - מאותחל ל -1
    let indxsToBool = 0; // משתנה שמכיל את מספר הבולים
    let indxsToHit = 0; // משתנה שמכיל את מספר הפגיעות
    for (let i = 0; i < choseUser.length; i++) { // עובר על המערך של הצבעים שהמשתמש בחר
        for (let j = 0; j < choosenColors.length; j++) { // עובר על המערך של הצבעים שהמחשב בחר
            if (choseUser[j] === choosenColors[i] && i === j) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר והמיקום שלהם זהה
                indxsToBool++; // הוסף 1 למספר הבולים
                break
            } else if (choseUser[j] === choosenColors[i]) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר אבל המיקום שלהם שונה
                indxsToHit++; // הוסף 1 למספר הפגיעות
                break
            }
        }
    }

    let i = 0;
    for (; i < indxsToBool; i++) // מוסיף את הבולים למערך הציון
        score[i] = "bool"
    for (; i < indxsToBool + indxsToHit; i++) // מוסיף את הפגיעות למערך הציון
        score[i] = "hit"

    addScoreToThePage(score); // קרא לפונקציה 9 שמקבלת את הציון ומוסיפה אותו לדף
}


const analyzeResultsC = () => { // פונקציה 8-ג
    //מחשבת כמה בולים או פגיעות לא נכנוות או כמעט נכנות יש כרגע עבור רמה ג
    //ברמה ג אפשר לחזור על צבעים פעמיים
    // ההבדל בחישוב בין רמה ב' לרמה ג' הוא שבחישוב של רמה ג' כל צבע שחושב ציון עליו מוסר מהרשימה, למניעת כפילויות בגלל החזרה על צבעים

    const score = [-1, -1, -1, -1]; // מערך של הציון - מאותחל ל -1 

    const userCopy = choseUser.slice(); // יוצר העתק של המשתנה choseUser
    const colorsCopy = choosenColors.slice(); // יוצר העתק של המשתנה choosenColors

    let matches = 0 // משתנה שמכיל את מספר הבולים
    let misplaced = 0 // משתנה שמכיל את מספר הפגיעות

    for (let i = 0; i < userCopy.length; i++) { // עובר על המערך של הצבעים שהמשתמש בחר
        for (let j = 0; j < colorsCopy.length; j++) { // עובר על המערך של הצבעים שהמחשב בחר
            if (userCopy[i] === colorsCopy[j] && i === j && userCopy[i] !== null && colorsCopy[j] !== null) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר והמיקום שלהם זהה
                matches++; // הוסף 1 למספר הבולים
                userCopy[i] = null; // הגדר את הצבע שנבחר ל - null - מחק אותו
                colorsCopy[j] = null; // הגדר את הצבע שהמחשב בחר ל - null - מחק אותו
            }

        }
    }


    for (let i = 0; i < userCopy.length; i++) { // עובר על המערך של הצבעים שהמשתמש בחר
        for (let j = 0; j < colorsCopy.length; j++) { // עובר על המערך של הצבעים שהמחשב בחר
            if (userCopy[i] === colorsCopy[j] && i !== j && userCopy[i] !== null && colorsCopy[j] !== null) { // אם הצבע שנבחר זהה לצבע שהמחשב בחר אבל המיקום שלהם שונה
                misplaced++; // הוסף 1 למספר הפגיעות
                userCopy[i] = null; // הגדר את הצבע שנבחר ל - null - מחק אותו
                colorsCopy[j] = null; // הגדר את הצבע שהמחשב בחר ל - null - מחק אותו
            }
        }
    }

    let i = 0;
    for (; i < matches; i++) // מוסיף את הבולים למערך הציון
        score[i] = "bool"
    for (; i < matches + misplaced; i++) // מוסיף את הפגיעות למערך הציון
        score[i] = "hit"

    addScoreToThePage(score); // קרא לפונקציה 9 שמקבלת את הציון ומוסיפה אותו לדף
}


const addScoreToThePage = (score) => {

    //==========9=========

    //\מקבלת את מספר הבולים והפגיעות
    //ומעדכנת אותם בדף אם סימנים של צבעים שחור ולבן
    //וקראת לפקציה 10 
    //מעכנת את מספר השורה לשורה  הבאה 
    //אם  מספר השורה הבאה קטן מ8 אז יזמן את פוקציה 2
    //אם לא תזמן את פנקציה 11 אם שלילי
    let count = 0;
    const name = ".scoreRow" + currentRow//  currentRow מקבל כל פעם איזה שורה אוחז כרגע לפי המשתנה החצוני שיש לו של  nameה 
    const scores = document.querySelectorAll(name)//כן הוא בעצם שומר לי אותו במשתנה את שורה הנוכחית  

    for (let i = 0; i < score.length; i++) {
        if (score[i] === "bool") {
            count++;
            scores[i].style.backgroundColor = "yellow";//אם יש נצחון צובע בצבע לבן 
        }
        else if (score[i] === "hit")
            scores[i].style.backgroundColor = "red";//אם יש פגיעה צובע בשחור 

    }
    if (count === choseUser.length) // אם יש נצחון
        gameOver(true); // קרא לפונקציה 11 עם פרמטר true - נצחון

    choseUser = [-1, -1, -1, -1]; // מאתחל את המערך של הצבעים שנבחרו ל -1
    currentRow++; // מעדכן את מספר השורה לשורה הבאה
    
    if(currentRow == 9) // אם הגענו לשורה האחרונה
        gameOver(false);

};


const gameOver = (win) => {
    //==========11=========
    //אם היה נצחון קורה לפקציה 13
    //ואם היה כשלון קורה לנקציה 14
    //היה לי טיימר שממתין לראות תצוגה אנצמיה על המסך
    //הפקציה מחחקת את כל תוכן הדף 
    //מעדכנת מוסיפה כפתרים חזרה לדף הראשי או משחק חדש
    //קיראה לפנקציה 12 אם המשתמנה שיתקבל כ]פרמטר
    if (win) { // אם יש נצחון
        showWin() // קרא לפונקציה 13
    } else { // אם יש כישלון
        showNotWin(); // קרא לפונקציה 14
    }
    saveInLocalStorage(win) // קרא לפונקציה 12 עם פרמטר win - נצחון או כישלון - פונקצייה ששומרת את הנתונים בלוקל סטורג' ובסשן סטורג'
}


const saveInLocalStorage = (won) => {

    //==========12=========

    //מעכן נצחון או כשלון בלכל סטרל של המשתמש הנוכחי 
    //וגם בסשן סטורג' של המשתמש הנוכחי
    // Ensure currentUser is correctly set in session storage

    if (won) { // אם יש נצחון
        (currentUser.games)[0].wins++ // הוסף 1 למספר הנצחונות
        if ((currentUser.games)[0].wins >= 10) // אם יש יותר מ - 10 נצחונות
            (currentUser.games)[0].level = 2 // עלה לרמה 2
        if ((currentUser.games)[0].wins >= 30) // אם יש יותר מ - 30 נצחונות
            (currentUser.games)[0].level = 3 // עלה לרמה 3

    } else { // אם יש כישלון

        (currentUser.games)[0].loses++ // הוסף 1 למספר ההפסדים
    }

    //מחליף את המשתמש הנוכחי ברשימת המשתמשים למשתמש הנוכחי שעודכן
    for (let i = 0; i < usersList.length; i++) { // עובר על כל המשתמשים
        if (usersList[i].userName === currentUser.userName) { // אם המשתמש שנמצא זהה למשתמש הנוכחי
            usersList[i] = currentUser; // החלף את המשתמש הנוכחי במשתמש שעודכן
            break;
        }
    }

    localStorage.setItem("users", JSON.stringify(usersList)); // שמור את המערך של המשתמשים בלוקל סטורג'
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // שמור את המשתמש הנוכחי בסשן סטורג'

    console.log("Updated usersList:", usersList);
}



const showWin = () => {

    //=======================פונקצייה 13============

    //מוסיפה לדף הודעת ניצחון ואנמצייה של קונפטי
    TheDiscoverySelectedBalls(); // קרא לפונקציה 13 שמציגה את הכדורים שנבחרו על ידי המחשב 
    //השמע את המוזיקה של הניצחון
    if (currentUser.games[0].playSound) // אם המשתמש בחר שיש מוזיקה
        winSound.play(); // הפעלת המוזיקה

    const endGame = document.querySelector(".endGame");
    endGame.textContent = "ניצחת! "
    const confettiImage = document.createElement("img"); // יוצר אלמנט של תמונה
    confettiImage.src = "../gifs/e4d2c1d0da356797359acd9270bcdd77 (1).gif"; // מגדיר את המקור של התמונה
    confettiImage.style.width = "100%"; // מגדיר את הרוחב של התמונה
    confettiImage.style.height = "200%"; // מגדיר את הגובה של התמונה
    confettiImage.style.zIndex = "100"; // מגדיר את המיקום של התמונה
    confettiImage.style.position = "absolute" // מגדיר את המיקום של התמונה
    bodyElement.appendChild(confettiImage); // מוסיף את התמונה לדף

    // לדעתי אולי עדיף שהקונפטי ימשיך כל הזמן, מה אומרת?

    // מוחק את התמונה אחרי 3 שניות
    // setTimeout(() => {
    //     confettiImage.remove();

    // }, 10000);

}


const showNotWin = () => {

    //=======================פונקצייה 14============

    //השמע את המוזיקה של הכישלון
    if (currentUser.games[0].playSound) // אם המשתמש בחר שיש מוזיקה
        loseSound.play(); // הפעלת המוזיקה

    //מוסיפה לדף הודעת כישלון   ואנימצייה של מיני מאוס 🤔🤨🤨
    const endGame = document.querySelector(".endGame");
    endGame.textContent = "game over!"

    TheDiscoverySelectedBalls();//פונקתיה שבעצם מציגה את מה מה שגריל המחשב 

}


const TheDiscoverySelectedBalls = () => {
    //=======================פונקצייה 13============
    let l = " "; // משתנה שיכיל את הקלאס של הכדוק
    for (let i = 0; i < choosenColors.length; i++) { // עובר על המערך של הצבעים שנבחרו על ידי המחשב
        l = ".circleM" + (i + 1) // מגדיר את הקלאס של הכדור
        const circleElement = document.querySelector(l); // בוחר את הכדור
        circleElement.classList.add("ball") // מוסיף לכדור את הקלאס של  
        // מוחק את הקלאס circ
        circleElement.classList.remove("circ")

        circleElement.textContent = ""; // מוחק את ה ?
        const radialGradient = `radial-gradient(circle at 10px 10px, ${choosenColors[i]}, #000)`; // מגדיר את הגרדיאנט של הכדור בצבע הרלוונטי  לתלת מימד
        circleElement.style.background = radialGradient; // מגדיר את הגרדיאנט של הכדור



    }
    AddedBackButtons() // קרא לפונקציה 15 - מוסיף את הכפתורים של חזרה למשחק חדש או למשחקים 
};



const but1 = document.querySelector(".button1") //  כפתור של חזרה לדף משחקים בתפריט הנפתח
const but2 = document.querySelector(".button2") // כפתור של התחלת משחק חדש בתפריט הנפתח

const toGames = (event) => { // חזרה לדף משחקים
    event.preventDefault();
    window.location.href = "../Pages/games.html";
}

const newGame = (event) => { // התחלת משחק חדש
    event.preventDefault();
    window.location.href = "../Pages/game.html";
}

but1.addEventListener("click", toGames); //הוסף אירוע לכפתור של חזרה לדף משחקים
but2.addEventListener("click", newGame); //הוסף אירוע לכפתור של התחלת משחק חדש

const backToGames = document.querySelector(".backToGames")
const newGameB = document.querySelector(".newGame")



backToGames.addEventListener("click", (event) => { // חזרה לדף משחקים
    saveInLocalStorage(false)
    toGames(event)

})

newGameB.addEventListener("click", (event) => { // התחלת משחק חדש
    saveInLocalStorage(false)
    newGame(event)

})




const AddedBackButtons = () => {
    // פונקצייה שמוסיפה את הכפתורים של חזרה למשחק חדש או למשחקים שבסוף המשחק
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}



function openNav() { // פונקצייה שפותחת את התפריט הנפתח
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() { // פונקצייה שסוגרת את התפריט הנפתח
    document.getElementById("mySidenav").style.width = "0";
}




// אם מישהו לחץ על הכפתור של השתקת צלילים צריך לעצור את המוזיקה שבאמצע
function stopBackgroundMusic() { // פונקצייה שעוצרת את הצלילים
    backgroundMusic.pause(); // עצור את הצלילים
    backgroundMusic.currentTime = 0; // הגדר את הזמן של הצלילים ל - 0
}

sound.addEventListener("click", () => { // הוסף אירוע לכפתור של הפעלת צלילים 🔈
    currentUser.games[0].playSound = !currentUser.games[0].playSound; // toggle  - הפעל או עצור את הצלילים

    if (currentUser.games[0].playSound) { //מכניס את הסמל המתאים לכפתור השמע/השתקת המוזיקה בכרטיס
        sound.src = "../images/sound.png";
    } else {
        sound.src = "../images/notSound.png";
    }

    // עדכן את הבחירה של הפעלת מוזיקה במשתמש הנוכחי בלוקל סטורג' ובסשן סטורג'
    const updatedUsersList = usersList.map((el) => { // עובר על המערך של המשתמשים
        if (currentUser.userName === el.userName) { // אם המשתמש הנוכחי זהה למשתמש במערך
            return currentUser; // החלף את המשתמש במערך למשתמש הנוכחי
        }
        return el; // החזר את המשתמש
    });

    localStorage.setItem("users", JSON.stringify(updatedUsersList)); // שמור את המערך של המשתמשים בלוקל סטורג'
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // שמור את המשתמש הנוכחי בסשן סטורג'
});


const inputs = document.querySelectorAll("input") // משתנה שמכיל מערך של כל הבחירות של הרמות
for (let i = 0; i < inputs.length; i++) { // עובר על המערך של הבחירות של הרמות
    const inputEl = inputs[i]; // משתנה שמכיל את הבחירה של הרמה
    // עובר על המערך של הבחירות של הרמות ומוסיף אירוע לכל אחד מהם

    inputEl.addEventListener("change", function () { // הוסף אירוע לבחירה של הרמה
        //כאשר המשתמש בוחר רמה, עדכן את הבחירה של הרמה במשתמש הנוכחי

        const selectedLevel = this.value; // משתנה שמכיל את הבחירה של הרמה
        currentUser.games[0].chooseLevel = selectedLevel; // עדכן את הבחירה של הרמה במשתמש הנוכחי


        usersList = usersList.map((el) => { // עובר על המערך של המשתמשים
            if (currentUser.userName === el.userName) { // אם המשתמש הנוכחי זהה למשתמש במערך
                return currentUser; // החלף את המשתמש במערך למשתמש הנוכחי
            }
            return el;
        });

        localStorage.setItem("users", JSON.stringify(usersList)); // שמור את המערך של המשתמשים בלוקל סטורג'
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser)); // שמור את המשתמש הנוכחי בסשן סטורג'
        saveInLocalStorage(false) // קרא לפונקציה 12 עם פרמטר false - כישלון
        newGame(event) // קרא לפונקציה 14 - התחלת משחק חדש

    });

    //וגם אם השלב של המשתמש הנוכחי קטן מהרמה, מגדיר את הבחירה של הרמה ללא אפשרות לבחור, ואת התווית שלו עם קו מעליו
    //מגדיר שאי אפשר לעבור לרמות שלא נפתחו עדיין
    //לדוגמא, כאשר הרמה היא 1
    // <div class="divInputs"><div class="divInput"><input type="radio" name="level" value="1"><label>קל</label></div><div class="divInput"><input type="radio" name="level" value="2" disabled=""><label style="text-decoration: line-through;">בינוני</label></div><div class="divInput"><input type="radio" name="level" value="3" disabled=""><label style="text-decoration: line-through;">קשה</label></div></div>
    if (currentUser.games[0].level < i + 1) {
        inputEl.disabled = true;
        inputEl.nextElementSibling.style.textDecoration = "line-through";
    }

}
// התוכן שבתפריט הנפתח:
//מוצג כותרת באיזה רמה נמצאים:
const levels = ["קל", "בינוני", "קשה"]; // מערך של הרמות
const titleLevel = document.querySelector(".titleLevel") // משתנה שמכיל את הכותרת של הרמה
const currentLevel = (currentUser.games)[0].chooseLevel // משתנה שמכיל את הרמה הנוכחית של המשתמש
const titleText = `רמה: ${levels[currentLevel - 1]}` // משתנה שמכיל את הטקסט של הרמה הנוכחית של המשתמש
titleLevel.textContent = titleText // מוסיף את הטקסט של הרמה הנוכחית של המשתמש לכותרת הריקה שנמצאת בדף


const inst = document.querySelector(".inst"); // תגית p שלתוכה יוכתבו ההוראות של המשחק
if (currentLevel == 1) { //הוראות רמה 1
    //ניסיתי פה הרבה זמן וכשעשיתי === לא היה לי טוב. רק שעשיתי == עובד כמו שצריך
    inst.innerHTML = "<br><br>הוראות:<br><br>נחשו ארבעה צבעים, כל אחד ייחודי ולא חוזר על עצמו.<br><br>ניקוד:<br><br>- עיגול צהוב: צבע נכון במקום הנכון (בול).<br>- עיגול אדום: צבע נכון אבל לא במקום הנכון (פגיעה).<br><br> הניקוד יוצג לפי סדר הניחוש שלך.";
} else if (currentLevel == 2) { //הוראות רמה 2
    inst.innerHTML = "<br><br>הוראות:<br><br>נחשו ארבעה צבעים, כל אחד ייחודי ולא חוזר על עצמו.<br><br>ניקוד:<br><br>- עיגול צהוב: צבע נכון במקום הנכון (בול).<br>- עיגול אדום: צבע נכון אבל לא במקום הנכון (פגיעה).<br><br>הניקוד יוצג עם בולים תחילה, ואחריו פגיעות, ולא בהכרח לפי סדר הניחוש שלך.";
} else if (currentLevel == 3) { //הוראות רמה 3
    inst.innerHTML = "<br><br>הוראות:<br><br>נחשו ארבעה צבעים, שיכולים לחזור על עצמם.<br><br>ניקוד:<br><br>- עיגול צהוב: צבע נכון במקום הנכון (בול).<br>- עיגול אדום: צבע נכון אך לא במקום הנכון (פגיעה).<br><br>הניקוד יוצג עם בולים תחילה, ואחריו פגיעות, אך לא בהכרח לפי סדר הניחוש שלך.";
}



revBtn.addEventListener("click", () => { // הוסף אירוע לכפתור של הצגת הכדורים שנבחרו על ידי המחשב וסיום המשחק
    saveInLocalStorage(false) // קרא לפונקציה 12 עם פרמטר false - כישלון
    TheDiscoverySelectedBalls() // קרא לפונקציה 13 שמציגה את הכדורים שנבחרו על ידי המחשב
})
 let dragedElement;
 let colorDragged;


    const bindDrag = (event) => {
        if(dragedElement){
            dragedElement.remove();
        }
        
        const element = event.target;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', unbindDrag)
        //יוצר כדור שנגרר, בצבע של האלמנט  קצת שקוף, שיגרר אחרי העכבר
        dragedElement = document.createElement('div');

        dragedElement.classList.add('ball');
        console.log(element);
        colorDragged = element.id;
        const radial = `radial-gradient(circle at 10px 10px, ${colorDragged}, #000)`
        dragedElement.style.background = radial;
        console.log("radial:");
        console.log(radial);
        dragedElement.style.position = 'absolute';
        document.body.appendChild(dragedElement);
        dragedElement.style.top = event.clientY + 'px';
        dragedElement.style.left = event.clientX + 'px';

    }
    const drag = (e) => {
        // if we use an anchor we should take into
        // consideration it's offset from it's parent element
        
        //מזיז את האלמנט שנגרר אחרי העכבר
        dragedElement.style.top = e.clientY  + 'px';
        dragedElement.style.left = e.clientX + 'px';

    }

    const unbindDrag = (event) => {
        //אם גררנו לתוך אלמנט עיגול, נהפוך את העיגול לכדור באמצעות הפונקצייה paintColors
        const maycircle = document.elementFromPoint(event.clientX, event.clientY);
        const name = "circleRow" + currentRow;
        console.log(maycircle);
        if (maycircle.classList.contains(name)) {
            paintColors(colorDragged,maycircle);
            console.log("yes");
        }
        else {
            console.log(maycircle.classList);
        }
        

        //מוחק את האלמנט שנגרר
        dragedElement.remove();


        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', unbindDrag);
    }
//poolColor
const addDrag = () => {
    const poolColors = document.querySelectorAll(".poolColor");
    console.log(poolColors);
    poolColors.forEach(element => {
        
        element.addEventListener('mousedown', bindDrag);

    });
}
addDrag();



