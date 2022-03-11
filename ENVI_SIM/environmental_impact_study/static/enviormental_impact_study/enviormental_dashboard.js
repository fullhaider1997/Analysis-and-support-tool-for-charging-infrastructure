
function show_list() {
    var courses = document.getElementById("routes_id");
  
    
    if (courses.style.display == "block") {
        courses.style.display = "none";
    } else {
        courses.style.display = "block";
    }
  }
  
  window.onclick = function (event) {
    if (!event.target.matches('#dropdown_button')) {
        document.getElementById('routes_id').style.display = "none";
    }
  }  
  
  $("#routes_id li").click(function() {
  
    console.log("Clicking on selection of routes")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
  
  
  });
  
  
  
  var exp1 = "x";
  var exp2 = "1.5*x";
  var exp3 = "1.5*x + 7";
  
  // Generate values
  
  var x1Values = [];
  var x2Values = [];
  var x3Values = [];
  var y1Values = [];
  var y2Values = [];
  var y3Values = [];
  
  for (var x = 0; x <= 10; x += 1) {
    x1Values.push(x);
    x2Values.push(x);
    x3Values.push(x);
    y1Values.push(eval(exp1));
    y2Values.push(eval(exp2));
    y3Values.push(eval(exp3));
  }
  
  // Define Data
  var data = [
    {x: x1Values, y: y1Values, mode:"lines"},
    {x: x2Values, y: y2Values, mode:"lines"},
    {x: x3Values, y: y3Values, mode:"lines"}
  ];
  
  // Define Layout
  var layout = {title: "[y=" + exp1 + "] [y=" + exp2 + "] [y=" + exp3 + "]"};
  
  
  Plotly.newPlot('plot', data,);