<!-- <!DOCTYPE html> -->
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="finalDraw.css" type="text/css">
    <link rel="stylesheet" href="card-deck-css/css/cardstarter.css">
    <script defer src="javascript/finalDraw.js"></script>
    <link rel="shortcut icon" href="card-deck-css/images/backs/red.svg" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Chelsea+Market&display=swap" rel="stylesheet">
    <title>WAR</title>
</head>

<body>
    <nav id="nav">
        <!-- <button class="button" id="start">Start</button> -->
        <h1>WAR</h1>
        <button class="button" id="restart">Restart</button>
    </nav>
    <div id="infoBar">
        Get Ready to Play
    </div>
    <main>
        <section id="tableSec">
            <div id="table">
                <div id="player">
                    <div class="information" id="playerInfo">
                        <h2 id="playerName">Darone</h2>
                        <h3>Number of cards</h3>
                        <h1 id="playerCards">0</h1>
                    </div>
                    <section class="warView" id="PlayerWarCards">
                        <div class="" id="playerWar1"></div>
                        <div class="" id="playerWar2"></div>
                        <div class="" id="playerWar3"></div>
                        <div class="" id="playerWarValueCard"></div>
                    </section>
                    <section class="standardView" id="PlayerCards">
                        <div class="card xlarge no-border back-red" id="playerStack"></div>
                        <div class="" id="playerActive"></div>
                    </section>
                </div>
                <div id="computer">

                    <section class="standardView" id="computerCards">
                        <div class="" id="compActive"></div>
                        <div class="card xlarge no-border back-red" id="compStack"></div>
                    </section>
                    <section class="warView" id="computerWarCards">
                        <div class="" id="compWarValueCard"></div>
                        <div class="" id="compWar3"></div>
                        <div class="" id="compWar2"></div>
                        <div class="" id="compWar1"></div>
                    </section>
                    <div class="information" id="compInfo">
                        <h2 id="compName">Natalia</h2>
                        <h3>Number of cards</h3>
                        <h1 id="compCards">0</h1>
                    </div>
                </div>
            </div>
        </section>

        <footer id="footer">
            <button class="button" id="start">Start</button>
            <button class="button" id="play">Play</button>
        </footer>
    </main>
</body>
