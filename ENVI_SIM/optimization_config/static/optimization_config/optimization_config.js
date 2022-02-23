optimization_config = 

`
<div id="back_ground">

  <div id="dash_board">
     
      <div id="dash_board_title"> Optimization parameters</div>
      <div id="dropdown_list">
      <button id="dropdown_button" 
          onclick="show_list()">
          Select Route
      </button>

      <div id="buses_id" class="buses">
          <li id="All routes"><a > All routes</a></li>
          <li id="1 mainlane"><a >1 mainlane</a></li>
          <li id="2 Crosstown"><a >2 Crosstown</a></li>
          <li id="3C county Park"><a >3C county Park</a></li>
      </div>
  </div>

      <div class="split left">
      <ul>
      <li>
          <label id="title_input">Battery Capacity</label>
          <input class = "my_input" type="text" readonly><br>
      </li>
       <li>
          <label id="title_input">Max Passengers</label>
          <input class = "my_input" type="text" readonly><br>
      </li>
       <li>
          <label id="title_input">Max speed</label>
          <input class = "my_input" type="text" ><br>
      </li>
       <li>
          <label id="title_input">Weight</label>
          <input class = "my_input" type="text" ><br>
      </li>
      <li>
          <label id="title_input">Time to charge</label>
          <input class = "my_input" type="text" ><br>
      </li>
      
     </ul>

     </div>
  </div>
  

</div>

<script>
 
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

</script>


`