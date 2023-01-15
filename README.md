# evk_calendar
Simple jQuery based calendar script

**All you need is include:**
<script type="text/javascript" src="evk_calendar_jk.js"></script>
<link href="evk_calendar_jk.css" rel="stylesheet" type="text/css">

**Then:**

<script type="text/javascript">
$(document).ready(function(){

	$('#cale').evkJKcalendar({lang:'ru', backgroundcolor: '#000000', color: '#fffffff'});

// For click date event
$("#cale").on('change',function(e, el){
		e.preventDefault();
		var cal_date=$(el).attr('data-id');
		console.log('FRONT: '+cal_date);
	});
  
});
