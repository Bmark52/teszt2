
// Az alap JS tábla generáló function

function generateTable() {

    if (document.contains(document.getElementById("generatedElement"))) {     
        
        var prevGenTable = document.getElementById("genTable");

        for (var i = 0, row; row = prevGenTable.rows[i]; i++){
            for (j = 0 ; j = prevGenTable.rows[i] ; j++) {
                document.getElementById("generatedElement").remove()
            }
        }
    } 

    var row_count = document.getElementById("rows").value;
    var column_count = document.getElementById("columns").value;

            for (var i=0; i < row_count; i++) {

                var generatedTable = document.getElementById("genTable").insertRow(i);

                for (var j=0; j < column_count; j++) {
                    generatedTable.insertCell(j).innerHTML = "JS";
                    generatedTable.id = "generatedElement"
                }
            }

    checkInputAndBtn()
}

// AJAX function ami átadja a PHP-nek az input adatokat és onnan kiiratja a készített táblázatot az oldalra.

function callPhp() {       
    $.ajax({
    type: "GET",
    url: "../php-tasks/generate-table.php",
    data: {

        "rows" : $("#rows").val(),
        "columns" : $("#columns").val()
    },
    success: function(data){
        document.getElementById("genTable").innerHTML = data                
    },
    error: function(){
        alert("AJAX hiba történt!");
    }
});
    checkInputAndBtn()
}

// Ez a function maga az ami létrehozza a szinező gombot és a random színeket.

function createColorBtn () { 

    if (document.contains(document.getElementById("colorBtn"))) {  // Ez azért kell hogy ne hozzon létre 1 gombnál többet.
        document.getElementById("colorBtn").remove
    } else {
        
    let btn = document.createElement("button");  
    btn.innerHTML = "Színezz át!";
    btn.type = "submit";
    btn.name = "colorBtn";
    btn.id = "colorBtn";
    btn.className = "btn btn-primary";
    btn.addEventListener("click", function(){
        
        var table = document.getElementById("genTable");
            for (var i = 0, row; row = table.rows[i]; i++) {   
                for (var j = 0, cell; cell = row.cells[j]; j++) {

                    var r = Math.floor(Math.random() * 256);
                    var g = Math.floor(Math.random() * 256);
                    var b = Math.floor(Math.random() * 256);
                    var bgColor = "rgb(" + r + "," + g + "," + b + ")";
                    cell.style.backgroundColor = bgColor;

                }  
            }
        });
    
    document.getElementById("btnContainer").appendChild(btn);  //Egy szimpla span-be appendeli a gombot
    }

}

// Ez a function ellenőrzi azt hogy melyik radio button van becheckelve, és az alapján dönti el hogy a generáló
// gomb a JS functiont-t vagy a PHP-sat hívja meg.

function radioBtnCheck () {        

    var radioValue = document.getElementsByName("radioBtn");
    
        for (i = 0; i < radioValue.length; i++) {
            if (radioValue[i].checked){
               clickedBtn = radioValue[i].value;
            }
        }

       if (clickedBtn == "PHP") {

            document.getElementById("generateBtn").addEventListener("click", callPhp())

       } else if (clickedBtn == "JS") {

            document.getElementById("generateBtn").addEventListener("click", generateTable())

       }

}

// Ez a function validálja az inputokat és törli vagy hozzáadja a szinező gombot a generált táblához.

function checkInputAndBtn() {  

    var formRows = document.forms["tableForm"]["rows"].value;
    var formColumns = document.forms["tableForm"]["columns"].value;
    if (formRows == "" || formColumns == "") {
      alert("Nincs megadva elég adat a tábla létrehozásához!")
      if (document.contains(document.getElementById("colorBtn"))){
        document.getElementById("colorBtn").remove()
      }
    } else {
      createColorBtn()
    }
  }