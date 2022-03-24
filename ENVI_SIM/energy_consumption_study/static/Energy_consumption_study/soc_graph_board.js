console.log("Energy consumption is started")


var energy_consumption_s =[]
var time_s = []




$("#tripset_id li").click(function() {

  console.log("Clicking on selection of routes:tripset")
      
  var button = document.getElementById("dropdown_button_tripset")
  var id = $(this).attr("id");
  button.innerHTML = id;
  console.log(id)

});


$("#routes_id li").click(function() {

  console.log("Clicking on selection of routes:energy")
      
  var button = document.getElementById("dropdown_button_routes")
  var button_seasons = document.getElementById("dropdown_button_seasons")
  var id = $(this).attr("id");
  button.innerHTML = id;
  console.log(id)
  console.log()
/*
  if(id == "Mainline 1"){
    console.log("Clicking on Maineline 2")
    data = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_1_0.csv")
    data1 = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_1_1.csv")
    data2 = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_1_2.csv")
    data3 = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_1_3.csv")
    Promise.all([data,data1,data2,data3]).then(function(results){
      plotEnergy(results)
      
      
    });
    

  } else if(id == "Line 2"){
    console.log("Clicking on line 2")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_2_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_2_1.csv")
    data2= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_2_2.csv")
    Promise.all([data,data1,data2]).then(function(results){
      plotEnergy(results)
      
    });
    

  } else if(id == "3M Line"){

    console.log("Clicking on 3M")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3M_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3M_1.csv")
    data2= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3M_2.csv")
    data3= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3M_3.csv")
    Promise.all([data,data1,data2,data3]).then(function(results){
      plotEnergy(results)
      
    });

  }else if(id == "3C Line"){

    console.log("Clicking on 3C")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3C_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3C_1.csv")
    Promise.all([data,data1]).then(function(results){
      plotEnergy(results)
      
    });

  }
  else if(id == "3J Line"){

    console.log("Clicking on 3J")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3J_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_3J_1.csv")
    Promise.all([data,data1]).then(function(results){
      plotEnergy(results)
    });

  } else if(id == "4 Line"){

    console.log("Clicking on 4")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_4_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_4_1.csv")
    Promise.all([data,data1]).then(function(results){
      plotEnergy(results)
    });

  }
  else if(id == "5 Line"){

    console.log("Clicking on 5")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_5_0.csv")
    data1 = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_5_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  else if(id == "6 Line"){

    console.log("Clicking on 6")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_6_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_6_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  else if(id == "7 Line"){

    console.log("Clicking on 7")
    data = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_7_0.csv")
    data1 = retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_7_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  else if(id == "8 Line"){

    console.log("Clicking on 8")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_8_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_8_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  
  else if(id == "9 Line"){

    console.log("Clicking on 9")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_9_1.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_9_2.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }
  
  else if(id == "10 Line"){

    console.log("Clicking on 10")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_10_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_10_1.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  else if(id == "11 Line"){

    console.log("Clicking on 11")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_11_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_11_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }
  else if(id == "12 Line"){

    console.log("Clicking on 12")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_12_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_12_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }

  else if(id == "13 Line"){

    console.log("Clicking on 13")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_13_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_13_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }
  else if(id == "14 Line"){

    console.log("Clicking on 14")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_14_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_14_1.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }
  else if(id == "16 Line"){

    console.log("Clicking on 16")
    data= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_16_0.csv")
    data1= retrieveEnergyData("C:/Users/fullh/Desktop/consumped/Fall/TS_16_0.csv")
    Promise.all([data, data1]).then(function(results){
      plotEnergy(results)
    });
  }


  */

});




  






