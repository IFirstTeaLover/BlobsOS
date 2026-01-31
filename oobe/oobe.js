let toBeInstalled = Array(4).fill(false);
let oobeStage = 1;
const inputs = Array.from(document.getElementsByTagName("input"));
const selection = document.getElementsByTagName("input");
const next = document.getElementById("nextButton");
const sw = Array.from(document.querySelectorAll(".settingsSwitch"));
const ISDEV = true;

sw.forEach(e => { e.classList.add("hidden") })

inputs.forEach((e, index) => {
    e.addEventListener("change", () => {
        toBeInstalled[index] = e.checked;
    })
})

next.addEventListener("click", () => {

    const content = document.querySelector(".bg .oobe-content")
    content.classList.add("hidden");
    inputs.forEach((i) => {
        i.checked = false;
    })
    oobeStage++
    let animationFinish = setTimeout(() => {
        cleanOobe()
    }, 250);
    let tm = setTimeout(() => {
        content.classList.remove("hidden");
        oobeStageSwitch()
    }, 450);

    tm.remove;
    animationFinish.remove;
})

document.querySelectorAll(".switch").forEach(switchEl => {
    const buttons = switchEl.querySelectorAll(".switch-btn");
    const indicator = switchEl.querySelector(".switch-indicator");
    const inner = switchEl.querySelector(".indicator-inner");

    const count = buttons.length;
    switchEl.style.setProperty("--count", count);

    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            console.log(btn)

            indicator.style.transform =
                `translateX(${index * 100}%)`;
        });
    });
});

function oobeStageSwitch() {
    switch (oobeStage) {
        case 2:
            sw.forEach(e => { e.classList.remove("hidden") })
            break;
        case 3:
            const card = document.getElementsByClassName("oobe-card")[0];
            card.style.width = card.offsetWidth + "px";
            card.style.height = card.offsetHeight + "px";
            card.offsetHeight;
            card.style.transition = "width 500ms ease, height 500ms ease";
            card.style.width = "75px";
            card.style.height = "75px";

            break;
    }
}

async function cleanOobe() {
    switch (oobeStage) {
        case 2:
            document.getElementsByClassName("selections")[0].remove();
            break;
        case 3:
            console.log("Saving oobe config")
            await internalFS.createPath('/system/config', "file", { apps: toBeInstalled, config: getConfig() })
            console.log("Removing oobe")
            document.getElementsByClassName("oobe-content")[0].remove();
            document.getElementsByClassName("install")[0].style.display = "block";
            console.log("Trying to initialize")

            init(false)
            console.log("Initialized!")
            break;
    }
}

document.querySelector(".apps-selall").addEventListener("click", () => {
    inputs.forEach(e => {
        e.checked = true;
    })
    inputs[5].checked = false;
})
function getConfig() {
    let datasetButtons = [];
    document.querySelectorAll(".switch").forEach(b => {
        const buttons = b.querySelectorAll(".switch-btn.active")
        buttons.forEach(b => {
            datasetButtons.push(b.dataset.pos);
        })
    });
    return datasetButtons;
}


if (ISDEV) {
    oobeStage++
    cleanOobe()
    oobeStageSwitch()
    oobeStage++
    cleanOobe()
    oobeStageSwitch()
}