console.log("helloss")

const menu = document.getElementById("menu")
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")





let menuOpen = false;


function openMenu(){

    menuOpen = true
  
    sidebar.style.width="210px"
    sidebar.style.borderStyle="solid";
    sidebar.style.borderWidth="2.5px";
    sidebar.style.display = "block";
}

function closeMenu(){

    menuOpen = false
   
    sidebar.style.width="0px"
    sidebar.style.border.width="0px";
    sidebar.style.border.radius="0px";
    sidebar.style.borderStyle="none";
    sidebar.style.display = "none";
}




menu.addEventListener("click", function(){

   if(!menuOpen){
     openMenu()
   }else{
     closeMenu()
   }


})



$("#sidebar a").click(function() {
   
    var id = $(this).attr("id");

    if("Routes"== id.toString()){

      console.log("I am clicking Routes")
       
      var strMessage1 = document.getElementById("switchscreen");
      

       $("#switchscreen").html(Routes);

     
    
    }
    if("Bus_Dashboard" == id.toString()){

      console.log("I am clicking dashboard")
      $("#switchscreen").html(DashBoard);


    console.log(id)
    }

    if ("Report" == id.toString()){

      console.log("I am clicking Report")
      $("#switchscreen").html(DashBoard);


      
    }



});



console.log("sidebardfdsfdf")


console.log("end page")