<?php

// a PHP tábla generáló function, GET metódussal átveszi az input adatokat és az alapján vissza adja azt a HTML nek

function generatePhpTable(){

     $rows = $_GET["rows"];
     $columns = $_GET["columns"];
    
    for($i = 0; $i < $rows; $i++){
    
        echo "<tr id='generatedElement'>";
            for($j = 0; $j < $columns; $j++){
                   echo "<td>"."PHP"."</td>";
            }
        echo "</tr>";
    }
}

echo generatePhpTable();

?>