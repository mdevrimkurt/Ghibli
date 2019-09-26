function moviesTable() {

    const app = document.getElementById("movTable");

    var req = new XMLHttpRequest();

    req.open("GET",'https://ghibliapi.herokuapp.com/films', true);

    req.onload = function () {
        var data = JSON.parse(this.response);

        if (req.status >= 200 && req.status < 400) {
            data.forEach(movie => {
                
                const row = document.createElement("tr");
                row.addEventListener("mouseenter", function(){
                    document.getElementById('movDesc').innerHTML = 
                    "<h3>" + movie.title + "</h3>" + movie.description;
                    document.getElementById("movDescr").style.visibility ="visible";
                })
                row.addEventListener("mouseleave", function(){
                    document.getElementById('movDesc').innerHTML = "";
                    document.getElementById("movDescr").style.visibility ="hidden";
                })
                movTable.appendChild(row);
            
                const td1 = document.createElement("td");
                td1.textContent = movie.title;
                row.appendChild(td1)

                const td2 = document.createElement("td");
                td2.textContent = movie.director;
                row.appendChild(td2)

                const td3 = document.createElement("td");
                td3.textContent = movie.producer;
                row.appendChild(td3)

                const td4 = document.createElement("td");
                td4.textContent = movie.release_date;
                row.appendChild(td4)

                const td5 = document.createElement("td");
                td5.textContent = movie.rt_score;
                row.appendChild(td5)        
            })
        }
        else {
            console.log("error " + req.status)
        }
    }

    req.send();

}

function directorsChart() {

    for (i=0;i<document.getElementsByClassName("chartLi").length;i++) {
        document.getElementsByClassName("chartLi")[i].style.backgroundColor="rgba(31, 37, 58, 0.2)";
    }

    document.getElementById("li1").style.backgroundColor="white";
    document.getElementById("li1").style.color="black";
    var req = new XMLHttpRequest();

    req.open("GET",'https://ghibliapi.herokuapp.com/films', true);

    let chartArray = [];
    let directors = [];
    chartArray[0] = ["Director","Count"];

    req.onload = function () {
        var data = JSON.parse(this.response);
        
        if (req.status >= 200 && req.status < 400) {
            
            data.forEach(movie => {
                directors.push(movie.director);          
            })

            directors.sort();
            let j = 0;

            for (i=0; i<directors.length; i++) {
                
                if (directors[i] != chartArray[j][0]) {
                    j++;
                    chartArray[j] = [];
                    chartArray[j][0] = directors[i]; 
                    chartArray[j][1] = chartArray[j][1] ? chartArray[j][1]++ : 1;
                } else {
                    chartArray[j][1]++;
                }
                
            }
            
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            // Draw the chart and set the chart values
            function drawChart() {
            var chartData = google.visualization.arrayToDataTable(chartArray);

            // Optional; add a title and set the width and height of the chart
            var chartOptions = {'title':'Directors', 'width':550, 'height':400};

            // Display the chart inside the element with id="piechart"
            var chart = new google.visualization.PieChart(document.getElementById('piechart'));
            chart.draw(chartData, chartOptions);
    }
        }
        else {
            console.log("error " + req.status)
        }
    }

    req.send();
    
}

function producersChart() {
    for (i=0;i<document.getElementsByClassName("chartLi").length;i++) {
         document.getElementsByClassName("chartLi")[i].style.backgroundColor="rgba(31, 37, 58, 0.2)";
    }
    document.getElementById("li2").style.backgroundColor="white";
    document.getElementById("li2").style.color="black";
    var req = new XMLHttpRequest();

    req.open("GET",'https://ghibliapi.herokuapp.com/films', true);

    let chartArray = [];
    let producers = [];
    chartArray[0] = ["Producer","Count"];

    req.onload = function () {
        var data = JSON.parse(this.response);
        
        if (req.status >= 200 && req.status < 400) {
            
            data.forEach(movie => {
                producers.push(movie.producer);          
            })

            producers.sort();
            let j = 0;

            for (i=0; i<producers.length; i++) {
                
                if (producers[i] != chartArray[j][0]) {
                    j++;
                    chartArray[j] = [];
                    chartArray[j][0] = producers[i]; 
                    chartArray[j][1] = chartArray[j][1] ? chartArray[j][1]++ : 1;
                } else {
                    chartArray[j][1]++;
                }
                
            }
            
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            // Draw the chart and set the chart values
            function drawChart() {
                var chartData = google.visualization.arrayToDataTable(chartArray);

            // Optional; add a title and set the width and height of the chart
                var chartOptions = {is3D:true,title:'Producers', 'width':550, 'height':400};

            // Display the chart inside the element with id="piechart"
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
                chart.draw(chartData, chartOptions);
            }
        }
        else {
            console.log("error " + req.status)
        }
    }

    req.send();
}

function scoreChart() {
    for (i=0;i<document.getElementsByClassName("chartLi").length;i++) {
         document.getElementsByClassName("chartLi")[i].style.backgroundColor="rgba(31, 37, 58, 0.2)";
    }
    document.getElementById("li3").style.backgroundColor="white";
    document.getElementById("li3").style.color="black";
    var req = new XMLHttpRequest();

    req.open("GET",'https://ghibliapi.herokuapp.com/films', true);

    let scores = [0,0,0,0];

    req.onload = function () {
        var data = JSON.parse(this.response);
        
        if (req.status >= 200 && req.status < 400) {
            
            data.forEach(movie => {
                switch(true) {
                    case (movie.rt_score <= 50):
                        scores[0]++;
                        break;
                    case (movie.rt_score <= 80):
                        scores[1]++;
                        break;
                    case (movie.rt_score <= 90):
                        scores[2]++;
                        break;
                    case (movie.rt_score <= 100):
                        scores[3]++;
                        break;
                }
            })

           
            google.charts.load('current', {'packages':['corechart']});
            google.charts.setOnLoadCallback(drawChart);

            // Draw the chart and set the chart values
            function drawChart() {

                var chartData = google.visualization.arrayToDataTable([
                    ['RT Score', 'dd', { role: 'style' } ],
                    ['0-50', scores[0], 'fill-color: red; fill-opacity: 0.5'],
                    ['51-80', scores[1], 'fill-color: yellow; fill-opacity: 0.5'],
                    ['81-90', scores[2], 'fill-color: green; fill-opacity: 0.5' ],
                    ['91-100', scores[3], 'fill-color: blue; fill-opacity: 0.5']
                 ]);

                var chartOptions = {'width':550, 'height':400,
                    legend: { position: "none" },
                    focusTarget: 'category',
                    hAxis: {
                      title: 'RT Scores',
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: false,
                        italic: false
                      },
                      titleTextStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                      }
                    },
                    vAxis: {
                      ticks: [0,2,4,6,8,10,12,14,16],
                      title: 'Counts',
                      textStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: false,
                        italic: false
                      },
                      titleTextStyle: {
                        fontSize: 14,
                        color: '#053061',
                        bold: true,
                        italic: false
                      }
                    }
                  };

            // Display the chart inside the element with id="piechart"
                var chart = new google.visualization.ColumnChart(document.getElementById('piechart'));
                chart.draw(chartData, chartOptions);
            }
        }
        else {
            console.log("error " + req.status)
        }
    }

    req.send();
}
