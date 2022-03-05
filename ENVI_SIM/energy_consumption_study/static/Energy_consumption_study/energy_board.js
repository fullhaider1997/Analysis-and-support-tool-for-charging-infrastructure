/*
energy_board = 
`
<div id="back_ground">


    <div id="dash_board">
    <ul id="energy_menu">
    <li id="Energy graph" class="item"><a class="title_button">Energy graph </a></li>
    <li id="Energy report" class="item"><a class="title_button">Energy report </a></li>
    </ul>   
    

    <div id="switchscreenbus">  
    
    <div id="Content_switch_screen"> 
    
   </div>
  
  </div>


 </div>

 <script>
 console.log("I am changing the energy activation")

var element = document.getElementById("Energy graph");
console.log("Here..")
console.log(element)
element.classList.remove("item")
element.classList.add("item-active")
$("#Content_switch_screen").html(report_res);

</script>


<script>

$("#energy_menu li").click(function() {

    var graph_tab = document.getElementById("Energy graph");
    var report_tab = document.getElementById("Energy report");
  
    console.log(this)
    var id = $(this).attr("id");
    
    if("Energy graph" == id.toString())
     {
       
  
       $("#Content_switch_screen").html(graph_res);
  
       report_tab.classList.remove("item-active")
       report_tab.classList.add("item")
   
       graph_tab.classList.remove("item")
       graph_tab.classList.add("item-active")
  
       
     }
  
    else if ("Energy report" == id.toString())
    {
     
     
      $("#Content_switch_screen").html(report_res);
  
      graph_tab.classList.remove("item-active")
      graph_tab.classList.add("item")
  
      report_tab.classList.remove("item")
      report_tab.classList.add("item-active")
      
  
      
    }
  
  
  });
</script>
`
*/
function show_list() {
  var courses = document.getElementById("buses_id");

  
  if (courses.style.display == "block") {
      courses.style.display = "none";
  } else {
      courses.style.display = "block";
  }
}

window.onclick = function (event) {
  if (!event.target.matches('#dropdown_button')) {
      document.getElementById('buses_id').style.display = "none";
  }
}  

