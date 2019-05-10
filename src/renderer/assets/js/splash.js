$(function() {
    function count($this){
        var current = parseInt($this.html(), 10);
        $this.html(++(current));
        if(current !== $this.data('count')){
            setTimeout(function(){count($this)}, 50);
        } else {
          $('#starting-txt').html('Starting...');

          // redirecting
          var seconds = 2;
          $("#lblCount").html(seconds);
          setInterval(function () {
              seconds--;
              $("#lblCount").html(seconds);
              if (seconds == 0) {
                  $("#dvCountDown").hide();
                  window.location = "platter.html";
                  // window.open($(this).attr('href', "platter.html"),'title', 'width=800, height=700');
                  return false;
              }
          }, 1000);
        }
    }        
  $("#field-value").each(function() {
      $(this).data('count', parseInt($(this).html(), 10));
      $(this).html('0');
      count($(this));
  });
});