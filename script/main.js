let theWheel = new Winwheel({
    'numSegments': 8,
    'outerRadius': 200,
    'drawText': true,
    'textFontSize': 16,
    'textOrientation': 'curved',
    'textAlignment': 'inner',
    'textMargin': 90,
    'textFontFamily': 'monospace',
    'textStrokeStyle': 'black',
    'textLineWidth': 3,
    'textFillStyle': 'white',
    'drawMode': 'segmentImage',
    'segments':
        [
            {'image': './assets/img/jane.png', 'text': 'Jane'},
            {'image': './assets/img/tom.png', 'text': 'Tom'},
            {'image': './assets/img/mary.png', 'text': 'Mary'},
            {'image': './assets/img/alex.png', 'text': 'Alex'},
            {'image': './assets/img/sarah.png', 'text': 'Sarah'},
            {'image': './assets/img/bruce.png', 'text': 'Bruce'},
            {'image': './assets/img/rose.png', 'text': 'Rose'},
            {'image': './assets/img/steve.png', 'text': 'Steve'}
        ],
    'animation':
        {
            'type': 'spinToStop',
            'duration': 5,
            'spins': 8,
            'callbackFinished': alertPrize
        }
});


let wheelPower = 0;
let wheelSpinning = false;

function powerSelected(powerLevel) {

    if (wheelSpinning == false) {

        document.getElementById('pw1').className = "";
        document.getElementById('pw2').className = "";
        document.getElementById('pw3').className = "";


        if (powerLevel >= 1) {
            document.getElementById('pw1').className = "pw1";
        }

        if (powerLevel >= 2) {
            document.getElementById('pw2').className = "pw2";
        }

        if (powerLevel >= 3) {
            document.getElementById('pw3').className = "pw3";
        }

        wheelPower = powerLevel;
        document.getElementById('spin_button').src = "./assets/img/spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    }
}

function startSpin() {

    if (wheelSpinning == false) {
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 8;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 15;
        }
        document.getElementById('spin_button').src = "./assets/img/spin_off.png";
        document.getElementById('spin_button').className = "";
        theWheel.startAnimation();
        wheelSpinning = true;
    }
}

function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    document.getElementById('pw1').className = "";
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";
    wheelSpinning = false;
}

function alertPrize(indicatedSegment) {
    // document.getElementById("main").style.visibility = "hidden"
    document.getElementById("prize").value = indicatedSegment.text;
    openModal();

}

// Modal

const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
// modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
});

function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
}

// modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});


