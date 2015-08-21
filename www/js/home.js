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
			
				//format the date
						myDateParts = departure_date.split("-");
						myNewDate = new Date(myDateParts[2], myDateParts[1], myDateParts[0]);
						friendly_date = new Date( departure_date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
						var options = { weekday: "long", year: "numeric", month: "long",  day: "numeric" }
						
						
						
				//if the result is an empty object, no dat was found
				if (jQuery.isEmptyObject(data))
				{	
					//before showing search results
					$(document).on('pagebeforeshow', "#search-results",function(){
					//first empty the list, if not when you reload this page, it just appends
						$('#search-results-list').html("");
						$('#search-results-list').append("<li class='ui-last-child'><a href='' class='ui-btn'><div>No schedules available at the moment. <br/>Please try again later.</div></a></li>");
						$('#page-subtitle').html(friendly_date.toLocaleDateString ("en-US", options));
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
							//if it's vip, add the class. if not, don't. Quite troublesome, hence done in a quite archaic manner. but works
							var vip = 0;
							var is_vip = " ";
							if(element.vip==1){ is_vip="<div class='medium-text orange li-subtext'>VIP</div>";}
							if(element.vip==1){ vip=1;}
							
							$('#search-results-list').append("<li class='ui-first-child ui-last-child schedule-list-item'><a rel='external' href='schedule-details.html?bus_seats="+element.bus_seats+"&ticket_price="+element.ticket_price+"&departure_time="+element.departure_time+"&parent_name="+element.parent_name+"&departure_date="+departure_date+"&from="+from+"&to="+to+"&from_name="+from_name+"&to_name="+to_name+"&agency_id="+element.agency_id+"&schedule_id="+element.schedule_id+"&vip="+vip+"' id='schedule-details' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><div>"+element.parent_name+"</div><div>"+element.departure_time+"</div><div><span class='grey medium-text'>"+element.bus_seats+" seater </span> </div><span class='ui-li-aside'><h2>"+element.ticket_price+" frs</h2>"+is_vip+"</span></a></li>");
							//$('#search-results-list').append("<li class='ui-first-child ui-last-child schedule-list-item'><a href='#' id='' class='ui-btn ui-btn-icon-right ui-icon-carat-r'><div>"+element.parent_name+"</div><div>"+element.departure_time+"</div><div><span class='grey medium-text'>"+element.bus_seats+" seater </span> </div><span class='ui-li-aside'><h2>"+element.ticket_price+" frs</h2>"+is_vip+"</span></a></li>");
							//add the form elements corresponding to that schedule
							//$('#search-results-list').append("<form id='search-results-form'><input type='hidden' name='bus_seats' value="+element.bus_seats+"><input type='hidden' name='ticket_price' value="+element.ticket_price+"><input type='hidden' name='departure_time' value="+element.departure_time+"><input type='hidden' name='parent_name' value="+element.parent_name+"><input type='hidden' name='departure_date' value="+departure_date+"><input type='hidden' name='from' value="+from+"><input type='hidden' name='to' value="+to+"><input type='hidden' name='from_name' value="+from_name+"><input type='hidden' name='to_name' value="+to_name+"><input type='hidden' name='agency_id' value="+element.agency_id+"><input type='hidden' name='schedule_id' value="+element.schedule_id+"><input type='hidden' name='vip' value="+vip+">");
						
							
							
							
							
							$('#page-subtitle').html(friendly_date.toLocaleDateString ("en-US", options));
						});
						//put the origin and destination as title of the page, and date as subtitle
						$('#page-title').html(from_name+' to '+to_name);
						
					
						
					});
					//hide the ajax spinner
					$.mobile.loading("hide");
					//show search results page
					$.mobile.changePage('search-results.html');
				}
				
				
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

/*
$(document).on('click',".schedule-list-item", function(){
	//alert($("form#search-results-form").serialize());
	$.mobile.changePage( "schedule-details.html?"+$("form#search-results-form").serialize(), {
		//type: "post",
		//data: $("form#search").serialize()
	//	reloadPage:true
	});
	
}); */