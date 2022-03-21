

path = "C:/Users/fullh/Desktop/"
//Initalizating the map

//Plotly.newPlot('Enviormental_map', data=[] , layout = {height: 400,}) ;
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
  
    console.log("Clicking on selection of routes:enviormental")
        
    var button = document.getElementById("dropdown_button")
    var id = $(this).attr("id");
    button.innerHTML = id;
    console.log(id)

    if(id == "Mainline 1"){
      console.log("Clicking on Maineline 2")
      ts1_0 = retrieveCO2EmissionData(path +"charg-infra-project/ENVI_SIM/data/Fall/TS_1_0.csv")
      ts1_1 = retrieveCO2EmissionData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/Fall/TS_1_1.csv")
      ts1_2 = retrieveCO2EmissionData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/Fall/TS_1_2.csv")
      ts1_3 = retrieveCO2EmissionData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/Fall/TS_1_3.csv")
      ts1_4 = retrieveCO2EmissionData("C:/Users/fullh/Desktop/charg-infra-project/ENVI_SIM/data/Fall/TS_1_4.csv")
      console.log("Didn't reach the end of the line..")
      //console.log(data)
      Promise.all([ts1_0,ts1_1,ts1_2,ts1_3,ts1_4]).then(function(ts_all){
         
         plotTrips(ts_all)
        
        
       });



    }
  
  
  });
  
  
