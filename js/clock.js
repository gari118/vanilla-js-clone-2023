const clock = document.querySelector("h2#clock");

const getClock = () => {
    const time = {
        month: "",
        week: "",
        day: "",
        noon: "AM",
        hours: "00",
        minutes: "00",
        seconds: "00"
    };
    const date = new Date();
    if (date.getHours() > 12) {
        time.noon = "PM";
        time.hours = String(date.getHours() - 12).padStart(2, "0");
    } else {
        time.hours = String(date.getHours()).padStart(2, "0");
    }
    time.minutes = String(date.getMinutes()).padStart(2, "0");
    time.seconds = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${time.noon} ${time.hours}:${time.minutes}:${time.seconds}`;
};

getClock();
setInterval(getClock, 1000);
