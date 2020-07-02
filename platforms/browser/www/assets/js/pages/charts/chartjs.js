$(function () {
    // if($('#line_chart').length > 0){
    //     new Chart(document.getElementById("line_chart").getContext("2d"), getChartJs('line'));
    // }
    // if($('#bar_chart').length > 0){
    //     new Chart(document.getElementById("bar_chart").getContext("2d"), getChartJs('bar'));
    // }
    // if($('#radar_chart').length > 0){
    //     new Chart(document.getElementById("radar_chart").getContext("2d"), getChartJs('radar'));
    // }
    // if($('#pie_chart').length > 0){
    //     new Chart(document.getElementById("pie_chart").getContext("2d"), getChartJs('pie'));
    // }
    // if($('#doughnut_chart').length > 0){
    //     new Chart(document.getElementById("doughnut_chart").getContext("2d"), getChartJs('doughnut'));
    // }
});

var splitCategory = [];
var splitCatValue = [];
function defineChart(data){
	data.forEach(domBodyProgressChart);
    appendChart(splitCategory,splitCatValue);
    
}

function appendChart(cat,value){
    let htmlChart = '<canvas id="line_chart" class="animated flipInX mb-3" height="188"></canvas>';
    $('.chartProg').append(htmlChart);
    new Chart(document.getElementById("line_chart").getContext("2d"), domChartJs('line',cat,value));
}

function domBodyProgressChart(data,index){
    splitCategory.push(data.categoryName);
    splitCatValue.push(data.value);
}

function domChartJs(type,cat,value){
    config = {
        type: type,
        data: {
            labels: cat,
            datasets: [{
                label: "My First dataset",
                data: value,
                borderColor: 'rgba(0, 188, 212, 0.75)',
                backgroundColor: 'rgba(0, 188, 212, 0.3)',
                pointBorderColor: 'rgba(0, 188, 212, 0)',
                pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                    }
                }]
            }
        }
    }
    return config;
}

function getChartJs(type) {
    console.log('s',progressData);
    var config = null;

    if (type === 'line') {
        config = {
            type: 'line',
            data: {
                labels: ["Fat Level", "Blood Pressure"],
                datasets: [{
                    label: "My First dataset",
                    data: [500, 20],
                    borderColor: 'rgba(0, 188, 212, 0.75)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                    pointBorderWidth: 1
                }, 
                {
                        label: "My Second dataset",
                        data: [0, 111],
                        borderColor: 'rgba(233, 30, 99, 0.75)',
                        backgroundColor: 'rgba(233, 30, 99, 0.3)',
                        pointBorderColor: 'rgba(233, 30, 99, 0)',
                        pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
                        pointBorderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                legend: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "white",
                        }
                    }]
                }
            }
        }
    } else if(type === 'doughnut'){
        config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor : ['red','yellow','blue']
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                ]
            },
            options: {
                responsive: true,
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'rgb(255, 99, 132)'
                    }
                }
            }
        }
    }
    else if (type === 'bar') {
        config = {
            type: 'bar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(0, 188, 212, 0.8)'
                }, {
                        label: "My Second dataset",
                        data: [28, 48, 40, 19, 86, 27, 90],
                        backgroundColor: 'rgba(233, 30, 99, 0.8)'
                    }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    else if (type === 'radar') {
        config = {
            type: 'radar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 25, 90, 81, 56, 55, 40],
                    borderColor: 'rgba(0, 188, 212, 0.8)',
                    backgroundColor: 'rgba(0, 188, 212, 0.5)',
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.8)',
                    pointBorderWidth: 1
                }, {
                        label: "My Second dataset",
                        data: [72, 48, 40, 19, 96, 27, 100],
                        borderColor: 'rgba(233, 30, 99, 0.8)',
                        backgroundColor: 'rgba(233, 30, 99, 0.5)',
                        pointBorderColor: 'rgba(233, 30, 99, 0)',
                        pointBackgroundColor: 'rgba(233, 30, 99, 0.8)',
                        pointBorderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    else if (type === 'pie') {
        config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [225, 50, 100, 40],
                    backgroundColor: [
                        "rgb(233, 30, 99)",
                        "rgb(255, 193, 7)",
                        "rgb(0, 188, 212)",
                        "rgb(139, 195, 74)"
                    ],
                }],
                labels: [
                    "Pink",
                    "Amber",
                    "Cyan",
                    "Light Green"
                ]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    return config;
}