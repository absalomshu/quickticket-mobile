/*$(document).on('pageinit', '#home', function(){    
	alert('done');
    var url = 'php/search',
        mode = 'search/movie?query=',
        movieName = '&query='+encodeURI('Batman'),        
        key = '&api_key=470fd2ec8853e25d2f8d86f685d2270e';        
     
    $.ajax({
        url: url + mode + key + movieName ,
        dataType: "jsonp",
        async: true,
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});
 */