var data = [

    {

      type: "waterfall",

      x: [

        ["2016", "2017", "2017", "2017", "2017", "2018", "2018", "2018", "2018"],

        ["initial", "q1", "q2", "q3", "total", "q1", "q2", "q3", "total" ]

      ],

      measure: ["absolute", "relative", "relative", "relative", "total", "relative", "relative", "relative", "total"],

      y: ["6:00 am", "7:00 am", "8:00 am", "9:00 am","10:00 am", "11:00 am"],

      base: 300,

    decreasing: { marker: { color: "Maroon" , line:{color : "red", width :2}}},

    increasing: { marker: { color: "Teal"} },

    totals: { marker: { color: "deep sky blue", line:{color:'blue',width:3}} }

    }];

var layout = {title: {

            text: "Profit and loss statement"

        },

    waterfallgap : 0.3,

    xaxis: {

      title: "",

      tickfont: {size: 15},

      ticks: "outside"

    }

  }
  Plotly.newPlot('myDiv', data);