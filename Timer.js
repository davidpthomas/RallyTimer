
var Timer = (function() {

  var counter,
      startTime,
      endTime,
      currentTime,
      updateInterval = 1000;  // 1 sec

  // convert minutes to milliseconds
  function min2ms(min) {
    return min * 60 * 1000;
  };

  function updateTimer() {
  };

  return {

    start: function(minutes, msRemainingCallback) {
      startTime = new Date();
      endTime = new Date(startTime.getTime() + min2ms(minutes));
      currentTime = startTime;
      counter = setInterval(function() {
        currentTime = new Date(currentTime.getTime() + updateInterval);
        msRemaining = endTime.getTime() - currentTime.getTime();
        msRemainingCallback(msRemaining);
        }, updateInterval);
    },

    interrupt: function() {
      if (!counter) {
        return;
      }
      console.log("INTERRUPTED");
    },

    resume: function() {
      if (!counter) {
        return;
      }
      console.log("RESUMED");
    }

  };

}());
