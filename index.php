<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8" />
    <title>Artificial Non Intelligence</title>
    <meta name="Description" content="Artificial Non Intelligence" />
    <meta property="og:locale" content="en_EN">
    <meta property="og:site_name" content="Artificial Non Intelligence" />
    <meta property="og:url" content="" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Artificial Non Intelligence" />
    <meta property="og:description" content="Artificial Non Intelligence" />
    <meta property="og:image" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Quicksand" />
    <link href="style/style.css" rel="stylesheet" type="text/css" />
    <link href="style/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <?php
    // If there's a skin parameter from GET request and if it's part of the existing ones...
    if (isset($_GET["aggressive"]) and ($_GET["aggressive"] == ("true" || "false"))) {
        echo '<script type="text/javascript">
        var aggressive = ("'.addslashes($_GET["aggressive"]).'" === "true")</script>';
    } else {
        echo '<script type="text/javascript">
        var aggressive = null</script>';
    }
    ?>
    
    <script src="index.js"></script>

</head>

<body>

    <div id="main-wrapper">
        <div class="button" id="left">
            I think it's<span>🤖</span>AI-GENERATED
        </div>
        <div id="main-content-wrapper">
            <div id="main-content">

                <div id="loader-wrapper">
                    <img src="style/loader-troll-2.gif">
                    <br />
                    Loading...
                </div>

                <div id="question-wrapper">“ <span id="question"></span> ”</div>

                <div id="answer-wrapper">
                    <div id="answer"></div>
                    <button id="next-question-button">Next question please</button>
                </div>

            </div>
            <div id="score-wrapper">
                Score: <span id="score"></span>
                <br />
                <span id="lives"></span>/3 ❤️
            </div>
        </div>
        <div class="button" id="right">
            I think it's<span>👩</span>HUMAN-GENERATED
        </div>
    </div>

</body>

</html>