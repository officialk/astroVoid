<?php
    $name = $_REQUEST['name'];
    $score = $_REQUEST['score'];
    $date = date("Y-m-d H:i:s a");
    $con = mysqli_connect("localhost","root","","astroGame");
    $query = "insert into scores(name,score,dated) values('$name','$score','$date')";
    mysqli_query($con,$query);
    $query = "select score,name from scores order by score desc,dated asc limit 10";
    $ans = mysqli_query($con,$query);
    $ret = "<div class='row container center'><h2 class='col m6 l6'>Name</h2><h2 class='col m6 l6'>Score</h2>";
    while($row = mysqli_fetch_array($ans)){
        $min = $row[0];
        $ret .= "<div class='col m6 l6'>$row[1]</div><div class='col m6 l6'>$min</div>";
    }
    echo $ret."</div>";
?>
