var moveBy = 15;
var score = 0;
var life = 3;
var bulletSpeed = 10;
var asteriodSpeed = 6;
var bulletCount = 6;
var asteriodCount = 4;

function start() {
    $(document).ready(function () {
        //initialize variables
        var playarea = document.getElementById("playarea");
        var character = document.getElementById("character");
        var charPos = window.innerWidth / 2;
        var leftVal = [];

        //movement functions

        //user moving functions
        $(window).keydown(function (event) {
            if (event.key == 'd' || event.key == 'D') {
                //move right
                charPos = move(moveBy, charPos);
            } else if (event.key == 'a' || event.key == 'A') {
                //move left
                charPos = move((-1 * moveBy), charPos);
            }
        });
        //makes an object move right or left
        function move(deg, pos) {
            try {
                if (pos > playarea.clientWidth - 70) {
                    pos = playarea.clientLeft + 40;
                } else if (pos < playarea.clientLeft + 40) {
                    pos = playarea.clientWidth - 70;
                } else {
                    pos = (deg + pos) % (playarea.clientWidth);
                }
                $("#character").css('left', (pos));
                return pos;
            } catch (e) {
                alert(e);
            }
        }

        //action functions

        //fire bullets
        function fire() {
            for (var i = 1; i <= bulletCount; i++) {
                setTimeout(setInterval, 1000 * i, bulletTravel, 100, "bullet" + i);
            }
        }
        //animation of bullets
        function bulletTravel(b) {
            var bullet = document.getElementById(b);
            var top = bullet.offsetTop;
            $("#" + b).show();
            bullet.style.top = top - bulletSpeed;
            //        alert("here"+top);
            if (top < playarea.offsetTop - 75) {
                bullet.style.top = character.style.top;
                bullet.style.left = parseFloat(character.style.left) + 10;
            }
        }
        //creation of asteriods
        function asteriod() {
            for (var i = 1; i <= asteriodCount; i++) {
                leftVal[i - 1] = Math.floor(Math.random() * ((playarea.offsetWidth - 30) - 20 + 1)) + 20;
                setTimeout(setInterval, 1000 * i, asteriodFall, 100, "asteriod" + i, i - 1);
            }
        }
        //animation of asteriods
        function asteriodFall(name, left) {
            $("#" + name).show();
            var aster = document.getElementById(name);
            var top = aster.offsetTop;
            aster.style.left = leftVal[left];
            aster.style.top = top + asteriodSpeed;
        }

        //collision checking

        //keeps checking for collisions
        function checkBulletCollision() {
            for (var i = 1; i <= bulletCount; i++) {
                for (var j = 1; j <= asteriodCount; j++) {
                    var isCollide = false;
                    var bullet = $("#bullet" + i);
                    var aster = $("#asteriod" + j);

                    var bulletLeft = bullet.offset().left;
                    var bulletTop = bullet.offset().top;
                    var asterLeft = aster.offset().left;
                    var asterTop = aster.offset().top;
                    if (bulletLeft > asterLeft && bulletLeft + 5 < asterLeft + 105) {
                        if (bulletTop < asterTop + 90) {
                            isCollide = true;
                        }
                    }
                    if (isCollide == true) {
                        //                        $("#bullet"+i).hide();
                        //                        destroyBullet("#bullet" + i);
                        destroyAsteriod("#asteriod" + j, j);
                        score = score + 1;
                        setScore(score);
                    }
                }
            }
        }
        //keeps checking for asteriods colliding with the 
        function checkCollision() {
            var bullet = $("#playarea");
            for (var j = 1; j <= asteriodCount; j++) {
                var aster = $("#asteriod" + j);
                var limiter = (playarea.offsetHeight + playarea.offsetTop) - 85;
                var asterBottom = aster.offset().top + 100;
                if (limiter <= asterBottom) {
                    destroyAsteriod("#asteriod" + j, j);
                    life = life - 1;
                    setLives(life);
                }
            }
        }

        //destruction functions
        //destroys the bullet after it collides
        function destroyBullet(b) {
            var bullet = $(b);
            bullet.css("top", $("#character").offset().top);
            bullet.css("left", $("#character").offset().left);
        }
        //destroys the bullet after it collides
        function destroyAsteriod(name, i) {
            leftVal[i - 1] = Math.floor(Math.random() * ((playarea.offsetWidth - 50) - 20 + 1)) + 20;
            var aster = $(name);
            var top = -100;
            aster.css("left", leftVal[i - 1]);
            aster.css("top", top);
        }
        //calls

        setTimeout(fire, 1000);
        setTimeout(asteriod, 1000);
        setInterval(checkCollision, 100);
        setTimeout(setInterval, 2000, checkBulletCollision, 75);

    });
}

function startGame() {
    var name = prompt("Enter Your Name");
    if (name != "") {
        document.getElementById("name").innerHTML = ":"+name;
        alert("Movement With A and D!");
        alert("Press Start Game ANd Enjoy");
        document.getElementById("strGameBtn").innerHTML = "";
        document.getElementById("set").innerHTML = "";
        start();
    }
    else{
        startGame();
    }
}
//initializing parameters
function init() {
    setAsteriodCount(4);
    setBulletCount(6);
    setAsteriodSpeed(4);
    setBulletSpeed(10);
    setLifeCount(3);
}
//settings
function setAsteriodCount(num) {
    asteriodCount = num;
    var aster = "";
    for (var i = 1; i <= num; i++) {
        aster += "<img src='asteroid.png' class='asteriod' id='asteriod" + i + "'>";
    }
    document.getElementById("asteriods").innerHTML = aster;
}

function setBulletCount(num) {
    bulletCount = num;
    var bullets = "";
    for (var i = 1; i <= num; i++) {
        bullets += "<div id='bullet" + i + "' class='bullets'></div>";
    }
    document.getElementById("bullets").innerHTML = bullets;
}

function setLifeCount(num) {
    document.getElementById("lives").innerHTML = "" + num;
    life = num;
}

function setAsteriodSpeed(num) {
    asteriodSpeed = num;
}

function setBulletSpeed(num) {
    bulletSpeed = num;
}
//gameOver
function gameOver() {
    alert("gameOver");
    gameOver = true;
    var i = window.setInterval(function () {}, 9999);
    while (i >= 0) {
        clearInterval(i--);
    }
    submit();
    $('#gameOverScreen').modal('open');
}
//general functions
//sets the score of the user
function setScore(scor) {
    score = Math.ceil((asteriodCount / bulletCount) / life) + scor;
    document.getElementById("score").innerHTML = score;
}
//sets the lives of the user
function setLives(lives) {
    if (lives == -1) {
        gameOver();
    } else {
        life = lives;
        document.getElementById("lives").innerHTML = lives;
    }
}

function submit() {
    var x = new XMLHttpRequest();
    var name = document.getElementById("name").innerHTML;
    x.open("POST", "query.php?name=" + name + "&score=" + score, true);
    x.send();
    x.onreadystatechange = function () {
        if (x.readyState == 4 && x.status == 200) {
            document.getElementById("gameOverScreen").innerHTML = x.response;
        }
    }
}
//initializing materialize components
$(document).ready(function () {
    $('.modal').modal();
});
