


function plotFinancialData(data){
    console.log(data)

    console.log(data[0][0][0])
    console.log(data[0][1][0])
    console.log(data[0][6][0])

   document.getElementById("total_maintenace_cost_disel").innerHTML = Math.ceil(data[0][0][0])
   document.getElementById("total_operation_cost_disel").innerHTML = Math.ceil(data[0][1][0])
   document.getElementById("total_elec_disel").innerHTML = Math.ceil(data[0][2][0])
   document.getElementById("total_emission").innerHTML = Math.ceil(data[0][3][0])
   document.getElementById("total_fuel_comsumed").innerHTML = Math.ceil(data[0][4][0])
   document.getElementById("total_energy_consumed").innerHTML = Math.ceil(data[0][5][0])
   document.getElementById("total_procurement_cost").innerHTML = Math.ceil(data[0][6][0])

   
   document.getElementById("total_maintenace_cost_disel_opt").innerHTML = Math.ceil(data[1][0][0])
   document.getElementById("total_operation_cost_disel_opt").innerHTML = Math.ceil(data[1][1][0])
   document.getElementById("total_elec_disel_opt").innerHTML = Math.ceil(data[1][2][0])
   document.getElementById("total_emission_opt").innerHTML = Math.ceil(data[1][3][0])
   document.getElementById("total_fuel_comsumed_opt").innerHTML = Math.ceil(data[1][4][0])
   document.getElementById("total_energy_consumed_opt").innerHTML = Math.ceil(data[1][5][0])
   document.getElementById("total_procurement_cost_opt").innerHTML = Math.ceil(data[1][6][0])
   



}