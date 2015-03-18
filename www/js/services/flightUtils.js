angular.module('flightsApp.services')

  .factory('FlightUtils',  function() {

  	return {
      convertUSD : convertUSD,
      getMonth_DD : getMonth_DD,
      getTime : getTime,
      getDuration : getDuration,
      getDayName : getDayName,
      getStopCounts : getStopCounts
  	};



  	function convertUSD(price) {
  		return price.replace("USD", "$");
  	};

  	function getMonth_DD(date) {
  		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  		var d = new Date(date);
  		return monthNames[d.getMonth()]+'-'+padZero(d.getDate());
  	}

  	function getTime(time) {
  		var d = new Date(time);
        var h=d.getHours();
        var m=d.getMinutes();
        h = h % 12;
        h= h ? h : 12; // the hour '0' should be '12'
        var ampm=h >= 12 ? 'p' : 'a';
        m = m < 10 ? '0'+m : m;
        return padZero(h)+':'+padZero(m)+ampm;
  	}

  	function getDuration(time) {
  		var h = time/60;
  		var m = time%60;
  		return padZero(Math.floor(h))+'h:'+padZero(m)+'m';
  	}

    function getDayName(date) {
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var d = new Date(date);
      return days[d.getDay()];
    } 

    function getStopCounts(segments) {
      var count = 0;
      angular.forEach(segments, function(segment) {
        count += segment.leg.length;
      }) ;
      return count-1;
    }

    function padZero(num) {
      num =  num+'';
      if(num.length == 1) {
        return '0'+num;
      } else {
        return num;
      }
    }
  });