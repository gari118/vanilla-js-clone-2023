const dDayForm = document.getElementById("d-day-form");
const dDayInputText = dDayForm.querySelector("input:first-child");
const dDayInputDate = dDayForm.querySelector("input:nth-child(2)");
const dDayBtn = dDayForm.querySelector("button");
const dDayList = document.getElementById("d-day-list");

const DDAYS_KEY = "dDays";

let dDays = [];

const saveDdays = () => {
    localStorage.setItem(DDAYS_KEY, JSON.stringify(dDays));
};

const deleteDday = event => {
    const li = event.target.parentElement;
    li.remove();
    dDays = toDos.filter(dDay => dDay.id != parseInt(li.id));
    saveDdays();
};

const checkDday = date => {
    const currentDate = new Date();
    const checkDate = new Date(date);
    let dDay = "";
    if (
        currentDate.getFullYear() == checkDate.getFullYear() &&
        currentDate.getMonth() == checkDate.getMonth() &&
        currentDate.getDay() == checkDate.getDay()
    ) {
        dDay = "- 0";
    } else if (checkDate > currentDate) {
        const countDate = String(
            Math.floor((checkDate - currentDate) / (1000 * 60 * 60 * 24) + 1)
        );
        dDay = `- ${countDate}`;
    } else {
        const countDate = String(
            Math.floor((currentDate - checkDate) / (1000 * 60 * 60 * 24) + 1)
        );
        dDay = `+ ${countDate}`;
    }
    return dDay;
};

const paintDday = dDay => {
    const li = document.createElement("li");
    li.id = dDay.id;
    const button = document.createElement("button");
    button.innerText = "✅";
    const span = document.createElement("span");
    const checkDate = checkDday(dDay.date);
    const dDayText = `D ${checkDate} ${dDay.text}`;
    span.innerText = dDayText;
    button.addEventListener("click", deleteDday);
    li.appendChild(button);
    li.appendChild(span);
    li.classList.add("todo-list__item");
    dDayList.appendChild(li);
};

const handleDdaySubmit = event => {
    console.log(dDayInputText, dDayInputDate.value);
    event.preventDefault();
    const newDdayText = dDayInputText.value;
    dDayInputText.value = "";
    const newDdayDate = dDayInputDate.value;
    dDayInputDate.value = "";
    console.log(newDdayText, newDdayDate);
    const newDdayObj = { text: newDdayText, date: newDdayDate, id: Date.now() };
    dDays.push(newDdayObj);
    paintDday(newDdayObj);
    saveDdays();
};

dDayForm.addEventListener("submit", handleDdaySubmit);

const savedDdays = localStorage.getItem(DDAYS_KEY);

if (savedDdays != null) {
    const parsedDdays = JSON.parse(savedDdays);
    dDays = parsedDdays;
    parsedDdays.forEach(paintDday);
}
