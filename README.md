# evk_calendar
Simple jQuery based calendar script - another one :smile:

Plain, clear and easy to use!

## Setup
```
<script type="text/javascript" src="evk_calendar_jk.js"></script>
<link href="evk_calendar_jk.css" rel="stylesheet" type="text/css">
```
## Usage
```
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
</script>
```
## How it looks
![How it looks](https://evk.ru.com/uploads/github/evk_calendar_jk_js.JPG)

## Demo
You can see a [demo and usage here](https://evk.ru.com/demo/github/evk_calendar_jk_js)
