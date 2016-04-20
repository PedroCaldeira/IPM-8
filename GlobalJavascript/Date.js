function getTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    if(hours<10)
      hours="0"+hours;
    if (minutes<10)
      minutes="0"+minutes;
    array=document.getElementsByClassName("Time")
    for (var i = array.length - 1; i >= 0; i--) {
      array[i].textContent=hours+":"+minutes;
    }
    t=setTimeout('getTime()',1000);  
  }