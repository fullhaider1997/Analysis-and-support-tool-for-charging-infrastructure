console.log("connecting financial board.js")
path = "C:/Users/fullh/Desktop/charg-infra-project"


mixfleet_data = retrieveCostData(path + "/ENVI_SIM/data/output/mixed_fleet_assignments/cost_related_data.csv" )
disel_data = retrieveCostData(path + "/ENVI_SIM/data/output/diesel_only_assignments/cost_related_data.csv" )

console.log("Didn't reach the end of the line..")
    //console.log(data)
Promise.all([disel_data,mixfleet_data]).then(function(data){
       
       plotFinancialData(data)
      
      
});


function retrieveCostData(path){
    return fetch('/retrieveCostData/', {  headers: {'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify({"path": path})

}).then(function (response) { 
   return response.text();

    }).then(function (text) {

   return JSON.parse(text)

   
   }).then(data =>{
  return data})
}