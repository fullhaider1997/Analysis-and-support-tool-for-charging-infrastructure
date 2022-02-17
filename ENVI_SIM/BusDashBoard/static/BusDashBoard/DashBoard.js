



DashBoard = `



<div id="back_ground">


 <div id="dash_board">
 <ul id="bus_menu">
 <li><a class="item-active">Electical buses</a></li>
 <li><a class="item" >liquid-fuel buses</a></li>
 </ul>   

   <div id="screen_1">  
    <div id="title> Electrical bus configuration </div>
   
   
   
   </div>

   <div id="screen_2"> liquid-fuel bus configuration</div>





 
 </div>

</div>



`


const menu = document.getElementById("bus_menu")


$("#bus_menu").click(function() {

    console.log("hello bus menu")
    console.log("busmenu li a")
    var id = $(this).attr("id");
    
    console.log(id);


});

console.log(meu)