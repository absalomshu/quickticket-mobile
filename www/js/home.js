//LOAD THE DATEPICKER ONCE THE PAGE LOADS

$(document).ready(function(){

	//Get the date/time of today
	nowTime = new Date();
	
	//Initialize datebox and set default date
	$('#date').datebox({
		mode: "calbox",
		afterToday: true, //Dates available only as from the date of today
		overrideDateFormat: "%d-%m-%Y",
		"useFocus": true //make the entire input to trigger the calendar, not just the icon
	});
	$("#date").datebox('setTheDate', nowTime).trigger('datebox', {'method':'doset'});
})




//WHEN THE SEARCH BUTTON IS CLICKED
//Catch the search form's submit
$(document).on('click',"#search", function(){
	
	var link = "http://localhost/quickticket/mobile/search_schedule?departure_time=any";
	var link = "http://dev.quickticket.co/mobile/search_schedule?&departure_time=any";
	var from = $("#town_from").val();
	var from_name = $("#town_from option:selected").html();
	var to = $("#town_to").val();
	var to_name = $("#town_to option:selected").html();
	var departure_date = $("#date").val();

	//check origin and destination
	if(from==to){
		 alert('Origin and destination can\'t be same.');
		 return;
	}else{
	
		//Send via ajax
		$.ajax({url: link,
			data: {
				from: from,
				to: to,
				departure_date: departure_date
			},
			//use dataType jsonp. normal json will be blocked by the browser when you try to send requests to different domain than the current (localhost)
			dataType:'json',
			type:'get',
			async: true,
			beforeSend: function(){
				$.mobile.loading("show"); //show the ajax spinner
			},
			complete: function(){
				//$.mobile.loading("hide"); //hide the ajax spinner
			},
			success: function(data){ //for each search result, populate the list
				//if the result is an empty object, no dat was found
				if (jQuery.isEmptyObject(data))
				{	
					//before showing search results
					$(document).on('pagebeforeshow', "#search-results",function(){
					//first empty the list, if not when you reload this page, it just appends
						$('#search-results-list').html("");
						$('#search-results-list').append("<li class='ui-last-child'><a href='' class='ui-btn'><div>No schedules available at the moment. <br/>Please try again later.</div></a></li>");
					});
					//hide the ajax spinner
					$.mobile.loading("hide");
					//show search results page
					$.mobile.changePage('search-results.html');
					
				}else{
				
					//before showing search results
					$(document).on('pagebeforeshow', "#search-results",function(){
						//first empty the list, if not when you reload this page, it just appends
						$('#search-results-list').html("");
						//iterate through result set and populate the list with search results
						$.each(data, function(index, element){
							$('#search-results-list').append("<li class='ui-first-child ui-last-child'><a href='schedule-details.html?bus_seats="+element.bus_seats+"&ticket_price="+element.ticket_price+"&departure_time="+element.departure_time+"&parent_name="+element.parent_name+"&departure_date="+departure_date+"&from="+from+"&to="+to+"&from_name="+from_name+"&to_name="+to_name+"&agency_id="+element.agency_id+"&schedule_id="+element.schedule_id+"' id='schedule-details' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><div>"+element.parent_name+"</div><div><span class='grey'>"+element.bus_seats+" seater </span> | "+element.departure_time+" </div><span class='ui-li-aside'><h2>"+element.ticket_price+" frs</h2></span></a></li>");
						});
					});
					//hide the ajax spinner
					$.mobile.loading("hide");
					//show search results page
					$.mobile.changePage('search-results.html');
				}
				//put the origin and destination as title of the page
				$('#route').html(from_name+' to '+to_name);
			},
			error: function(){ //If there's an error
			//alert(this.url);
				alert('Error: Can\'t connect. Verify your internet connection and try again.');
				$.mobile.loading("hide"); //hide the ajax spinner
				return;
			}
			});
			
			//go to the search result page
			
		}
});