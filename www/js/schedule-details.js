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
				//check origin and destination
				if(!name){
				 alert('Provide your contact information and passenger\'s phone and ID card number.');
				 return;
				}else{
				
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
							$.mobile.changePage('complete.html',{data:{reloadPage:false, changeHash:false, transition: "slideup"}});
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
				