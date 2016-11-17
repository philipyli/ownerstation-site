    <script type='text/javascript'>
    
    	window.getURLParameter = function(name)
		{
			return decodeURI(
				(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
			);
		}	

		window.urlDecode = function (url) {
			return decodeURIComponent(url.replace(/\+/g, ' '));
		}

		// Document has loaded DOM completely
		jQuery(document).ready(function($) {
		
			var hrefAddLoc = ".fb_help_url";
			var zipReplace = /\[ZIP\]/g;			
			var cityReplaceQuery = /\[CITY_QUERY\]/g;
			var cityReplaceHyph = /\[CITY_HYPHEN\]/g;
			var stateReplace = /\[STATE\]/g;
			var location = "location";
			var zipRegex = /\d{5}?/g;						
			var zipReplaceDefault = "90028";
			var cityReplaceDefault = "LOS ANGELES";
			var stateReplaceDefault = "CA";
			var cityMatchQuery = encodeURIComponent(cityReplaceDefault);
			var cityMatchHyph = cityReplaceDefault.replace( / /g, '-');

			
			// Retrieve the location information from the URL
			//var urlLocation = getURLParameter(location);
            
            var geoLocation = getGeoCookie();
			
			if (geoLocation)
			{	
				// Clean the returned location values from the URL		
				var zipMatch = geoLocation[1];
				var stateMatch = geoLocation[2];
				var cityMatch = geoLocation[3];                
				var cityMatchQuery = encodeURIComponent(cityMatch);
				var cityMatchHyph = cityMatch.replace( / /g, '-');
		
				// Perform replaces
				jQuery(hrefAddLoc).each(function() {
				
					if (cityMatch)
					{
						this.href = this.attributes["href"].nodeValue.replace(cityReplaceQuery, cityMatchQuery);
						this.href = this.attributes["href"].nodeValue.replace(cityReplaceHyph, cityMatchHyph); 																	
					}

					if (stateMatch)
					{
						this.href = this.attributes["href"].nodeValue.replace(stateReplace, stateMatch); 										
					} 
					else
					{
						// Nothing to replace with
						this.href = this.attributes["href"].nodeValue.replace(stateReplace, stateReplaceDefault); 										
					}
					
					if (zipMatch)
					{
						this.href = this.attributes["href"].nodeValue.replace(zipReplace, zipMatch); 					
					}				
					else
					{
						// Nothing to replace with
						this.href = this.attributes["href"].nodeValue.replace(zipReplace, zipReplaceDefault); 					
					}
					
				});
				
			}
			
		});
	
	</script>