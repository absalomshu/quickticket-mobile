//WHEN THE TICKET INFORMATION IS SUBMITTTED
			//Catch the search form's submit
			//WHEN THE TICKET INFORMATION IS SUBMITTTED
			//Catch the search form's submit
			$(document).on('click',"#reserve-seat", function(){
								
				var link = "http://localhost/quickticket/mobile/reserve_seat";
				var link = "http://dev.quickticket.co/mobile/reserve_seat";
				var name = $("#name").val();
				var idc = $("#idc").val();
				var phone = $("#phone").val();
				var email = $("#email").val();
				var agency_id = $("#agency_id").val();
				var schedule_id = $("#schedule_id").val();


				if(!name){ alert('Enter passenger\'s name.'); return;}
				else if(!idc){ alert('Enter passenger\'s ID card number'); return;}
				else if(!phone){ alert('Enter contact phone number'); return;}
				else if(!$.isNumeric( phone )){ alert('Enter valid phone number'); return;}
				else if(!$.isNumeric( idc )){ alert('Enter valid ID card number'); return;}
				else{
				
					//Send via ajax
					$.ajax({url: link,
						data: 
						{
							name: name,
							idc: idc,
							email: email,
							schedule_id: schedule_id,
							agency_id: agency_id,
							phone: phone
						},
						
					
						type:'post',
						async: true,
						beforeSend: function(){
							$.mobile.loading("show"); //show the ajax spinner
							
						},
						complete: function(){
							//$.mobile.loading("hide"); //hide the ajax spinner
						},
						success: function(data){ 
						//wait 2 mins before showing page. coz if it loads fast, once you click to go home, it re-submits
							setTimeout(function()
							{
							$.mobile.changePage('complete.html',{data:{reloadPage:false, changeHash:false, transition: "slideup"}});
							}, 2000);
						
							
						},
						
						error: function(){ //If there's an error
						//alert(this.url);
							alert('Error: Can\'t connect. Verify your internet connection and try again.');
							$.mobile.loading("hide"); //hide the ajax spinner
							 return;
							
						}
					});
							}
			});
				