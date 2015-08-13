//WHEN A PARTICULAR SCHEDULE IS SELECTED FROM SEARCH RESULTS
				$(document).on('click',"#schedule-details", function(){
				
					//Get the full url of the link that was clicked and pass to the function to get the variables
					url = this.href;
					var bus_seats = getURLParameterByName('bus_seats',url);
					var ticket_price = getURLParameterByName('ticket_price',url);
					var departure_time = getURLParameterByName('departure_time',url);
					var parent_name = getURLParameterByName('parent_name',url);
					var departure_date = getURLParameterByName('departure_date',url);
					var from = getURLParameterByName('from',url);
					var to = getURLParameterByName('to',url);
					var from_name = getURLParameterByName('from_name',url);
					var to_name = getURLParameterByName('to_name',url);
					var schedule_id = getURLParameterByName('schedule_id',url);
					var agency_id = getURLParameterByName('agency_id',url);
					 
					//alert(bus_seats+ticket_price+departure_time+parent_name+departure_date+from+to+from_name+to_name);
					
					//before showing schedule-details page, fill it in with the details
					//doesn't work if you don't use onpagebeforeshow
					$(document).on('pagebeforeshow', "#schedule-details",function(){
						$('#town-from').html(from_name);		
						$('#town-to').html(to_name);
						$('#bus-seats').html(bus_seats+ " seater");		
						$('#ticket-price').html(ticket_price+" frs");		
						$('#departure-date').html(departure_date);		
						$('#departure-time').html(departure_time);		
						$('#parent-name').html(parent_name);	
						$('#agency_id').val(agency_id);	
						$('#schedule_id').val(schedule_id);	
					});
										
				});
				
				
				//THIS FUNCTION EXTRACTS URL PARAMETERS BY THEIR NAMES
				function getURLParameterByName(name,url) {
					name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
					var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
						//link in url
						//results = regex.exec(location.search);
						results = regex.exec(url);
					return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
				}