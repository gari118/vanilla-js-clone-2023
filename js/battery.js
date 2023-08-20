const batteryObject = {
    batteryIsCharging: false,
    batteryCharged: ""
};

const batteryStatusValue = document.querySelector("#battery span");
const batteryStatusIcon = document.querySelector("#battery i");

const updateBatteryStatus = () => {
    const battery = navigator.getBattery().then(function(battery) {
        batteryObject.batteryCharged = `${battery.level * 100}%`;

        if (Number(battery.level * 100) >= 100) {
            batteryStatusIcon.classList.add("fa-battery-full");
            batteryStatusIcon.classList.remove(
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-empty",
                "fa-battery-half"
            );
            console.log(batteryStatusIcon);
        } else if (
            Number(battery.level * 100) > 50 &&
            Number(battery.level * 100) <= 100
        ) {
            console.log(batteryStatusIcon);
            batteryStatusIcon.classList.add("fa-battery-three-quarters");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-quarter",
                "fa-battery-empty",
                "fa-battery-half"
            );
        } else if (
            Number(battery.level * 100) < 50 &&
            Number(battery.level * 100) >= 10
        ) {
            batteryStatusIcon.classList.add("fa-battery-quarter");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-empty",
                "fa-battery-half"
            );
        } else if (Number(battery.level * 100) < 5) {
            batteryStatusIcon.classList.add("fa-battery-empty");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-half"
            );
        } else {
            batteryStatusIcon.classList.add("fa-battery-half");
            batteryStatusIcon.classList.remove(
                "fa-battery-full",
                "fa-battery-three-quarters",
                "fa-battery-quarter",
                "fa-battery-empty"
            );
        }
        batteryStatusValue.innerText = batteryObject.batteryCharged;
        batteryIsCharging = battery.charging;

        battery.addEventListener("chargingchange", function() {
            batteryIsCharging = battery.charging;
        });
        console.log(batteryIsCharging);
        batteryIsCharging === true
            ? (batteryStatusIcon.style.color = "#00FF2B")
            : (batteryStatusIcon.style.color = "white");
    });
};

updateBatteryStatus();
setInterval(updateBatteryStatus, 1000);
