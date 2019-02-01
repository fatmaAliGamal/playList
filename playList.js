var currentAudio = 0;
var arrayCurrentAudio = [$(".sounds li a")[0].href,
    $(".sounds li a")[1].href,
    $(".sounds li a")[2].href
];

function playAudio() {
    var promise = document.querySelector('audio').play();
    if (promise !== undefined) {
        promise.then(_ => {
            $("#audio")[0].play();
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
}

function play() {
    for (let index = 0; index < $(".sounds li a").length; index++) {
        $("#audio")[0].src = $(".sounds li a")[currentAudio].href;
        playAudio()
        $(".sounds li").removeClass("current-audio");
        $(".sounds li:eq(" + currentAudio + ")").addClass("current-audio");
    }
}

function playlist() {
    $(".sounds li a")[currentAudio].click(function(e) {
        e.preventDefault();
        $("#audio")[0].src = this;
        playAudio()
        $(".sounds li").removeClass("current-audio");
        currentAudio = $(this).parent().index();
    })
    $("#audio")[0].addEventListener("ended", () => {
        currentAudio++;
        if (currentAudio === $(".sounds li a").length)
            currentAudio = 0
        $(".sounds li").removeClass("current-audio");
        $(".sounds li:eq(" + currentAudio + ")").addClass("current-audio")
        $("#audio")[0].src = $(".sounds li a")[currentAudio].href
        playAudio();
    })

}

function shuffle() {
    var lastSong = null;
    var selection = null;
    $("#audio")[0].autoplay = true;
    $("#audio")[0].addEventListener("ended", selectRandom);

    function selectRandom() {
        while (selection == lastSong) {
            selection = Math.floor(Math.random() * arrayCurrentAudio.length);
        }
        lastSong = selection;
        $(".sounds li").removeClass("current-audio");
        $(".sounds li:eq(" + (selection) + ")").addClass("current-audio");
        $("#audio")[0].src = arrayCurrentAudio[selection];

    }
    playAudio();
}

function clickSound() {
    for (let index = 0; index < $(".sounds li a").length; index++) {
        $(".sounds li a")[index].addEventListener("click", function(e) {
            e.preventDefault();
            $("#audio")[0].src = this;
            playAudio();
            $(".sounds li").removeClass("current-audio");
            currentAudio = $(this).parent().index();
            $(".sounds li:eq(" + index + ")").addClass("current-audio");
        })
    }
}
clickSound();
$(".buttons li button")[0].addEventListener("click", shuffle);
$(".buttons li button")[1].addEventListener("click", playlist);
$(".buttons li button")[2].addEventListener("click", play);
//I can know why this doesn't work
window.addEventListener("load", () => {
    $("#audio")[0].src = $(".sounds li a")[0].href;
    playAudio();
});