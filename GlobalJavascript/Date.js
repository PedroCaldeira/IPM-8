function getTime(){
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    if(hours<10)
      hours="0"+hours;
    if (minutes<10)
      minutes="0"+minutes;
    document.getElementById("Time").textContent=hours+":"+minutes;
    document.getElementById("TimeFood").textContent=hours+":"+minutes;
    document.getElementById("TimeMusic").textContent=hours+":"+minutes;
    document.getElementById("TimeProfile").textContent=hours+":"+minutes;
    t=setTimeout('getTime()',1000);  
  }