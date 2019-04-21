var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

app.controller('statsCtrl', function($scope){

  var updateScores = function(){
    socket.on('zboruri', function (json) {
       data = JSON.parse(json);
       tableB = document.getElementById('tab-zboruri');
       tableH = document.getElementById("tab-head");
       tableB.innerHTML = '';
       tableB.appendChild(tableH);

       //Data = array de zboruri
       for(let i = 0; i < data.lenght; i++) {
         let plecare = data[i].plecare,
             intoarcere = data[i].intoarcere,
             zbor = data[i].zbor;

         addRowToTable(plecare, intoarcere, zbor);
       }
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function addRowToTable(plecare, intoarcere, zbor) {
    tableB = document.getElementById("tab-zboruri");
    row = document.createElement("tr");
    // create 3 td elements for row cells 
    cellPlecare = document.createElement("td");
    cellIntoarcere = document.createElement("td");
    cellZbor = document.createElement("td");

    // create info for cells
    infoPlecare = document.createTextNode(plecare);
    infoIntoarcere = document.createTextNode(intoarcere);
    infoZbor = document.createTextNode(zbor);

    //add info to cells
    cellPlecare.appendChild(infoPlecare);
    cellIntoarcere.appendChild(infoIntoarcere);
    cellZbor.appendChild(infoZbor);

    //add row to table
    tableB.appendChild(row);
     
}

function getPercentages(a, b) {
  var result = {};

  if (a + b > 0) {
    result.a = Math.round(a / (a + b) * 100);
    result.b = 100 - result.a;
  } else {
    result.a = result.b = 50;
  }

  return result;
}
