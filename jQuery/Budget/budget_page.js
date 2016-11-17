<script language='javascript' type='text/javascript'>
	var budgetCheckBoxes = ".input-budget-select";
	var sumCheckBoxSelector = "input:checked" + budgetCheckBoxes;
	var submitBudgetButton = "#btnBudgetSubmit";
    var budgetPageSlug = "budget-page";
	var contactDetailsPageSlug = "contact-details";
    var budgetTotalRange = "#divBudgetTotal";
  
	// Global store of last calculated buget sum values
	// Budget Sum Low
	var budgetSumLowGL = 0.0;
	// Budget Sum High
	var budgetSumHighGL = 0.0;
  
//function getDIYClasses()
window.getDIYClasses = function()
{
	var diyBudgetClasses = ".div-general, .div-locale, .div-disclosure, .div-majorsites";
		
	return diyBudgetClasses;
}

//function getDelegatorClasses()
window.getDelegatorClasses = function()
{
	var delegatorBudgetClasses = getDIYClasses();
	
	if ( delegatorBudgetClasses != null && delegatorBudgetClasses.length > 0)
	{
		delegatorBudgetClasses += ", .div-pest, .div-appraisal, .div-editing"; 
	}
	else
	{
		delegatorBudgetClasses += ".div-pest, .div-appraisal, .div-editing"; 
	}
	
	return delegatorBudgetClasses;
}

//function getPerfectionistClasses()
window.getPerfectionistClasses = function()
{
	var perfectionistBudgetClasses = getDelegatorClasses();

	if ( perfectionistBudgetClasses != null &&  perfectionistBudgetClasses.length > 0)
	{
		perfectionistBudgetClasses += ", .div-painting, .div-staging, .div-photography";
	}
	else
	{
		perfectionistBudgetClasses += ".div-painting, .div-staging, .div-photography";
	}	
	
	return perfectionistBudgetClasses;
}


//function showBudget(whichBudget)
window.showBudget = function(whichBudget)
	{
		var budgetItems;
		var selectedBudgetRows = new Array();
		
		if ( whichBudget == "diy" )
		{
			budgetItems = getDIYClasses();
		}
		else if ( whichBudget == "delegator" )
		{
			budgetItems = getDelegatorClasses();
		}
		else if ( whichBudget == "perfectionist" )
		{
			budgetItems = getPerfectionistClasses();
		}

		// Hide all budget items
		
		
		// Reset all budget check boxes
		resetAllBudgetCheckBoxes();
		
		var budgetRows = $jq(budgetItems);
		
		$jq("#divBudgetSelection").show();
		
		// Show budget submit button
		$jq(submitBudgetButton).show();
		
		// Show relevant budget items
		$jq(budgetRows).each(function() {			
			//$jq(this).show();
			//$jq(this).css("display", "div-table-row");
			
			// Find the checkboxes and check them
			$jq(this).find(budgetCheckBoxes).each(function() {
				$jq(this).attr("checked", true);
			});
		});			

		return budgetRows;
	}

//function hideAllBudgetItems()
window.hideAllBudgetItems = function()
	{
		// Find all the literal "budgetActive" class entries to total
		//$jq(this).find("#divBudgetSelection.div-table-row").each(function() {
		$jq("#divBudgetSelection .div-table-row").each(function() {
			// Parse all values into floats
			$jq(this).hide();
		});	
	}
	
window.resetAllBudgetCheckBoxes = function()
	{
		// Find all the literal "budgetActive" class entries to total
		//$jq(this).find("#divBudgetSelection.div-table-row").each(function() {
		$jq(budgetCheckBoxes).each(function() {
			// Parse all values into floats
			$jq(this).attr('checked', false);
		});	
	}
	
//$jq.noConflict();

var $jq = jQuery.noConflict();

// Document has loaded DOM completely
$jq(document).ready(function($) {

  //hideAllBudgetItems();
	
  var btnBudgets = "#btnDiyBudget, #btnDelBudget, #btnPerBudget";
  
  var lowBudgetSelector = ".div-budget-work-cost-low";
  var highBudgetSelector = ".div-budget-work-cost-high";
  
  var shownBudgetItems;
  
  /*********************************/
  // Budget Button Selection
  /*********************************/
  $jq(btnBudgets).click(function(){
  	
	var budgetSumLow = 0.0;
	var budgetSumHigh = 0.0;
 
	var btnBudgetId = $jq(this).attr("id");
	
	if ( btnBudgetId == "btnDiyBudget" )
	{
		shownBudgetItems = showBudget("diy");
	} 
	else if ( btnBudgetId == "btnDelBudget" )
	{
		shownBudgetItems = showBudget("delegator");
	} 
	else if ( btnBudgetId == "btnPerBudget" )
	{
		shownBudgetItems = showBudget("perfectionist");
	}
  
	// Search within the div having the literal class name "budgetWrapper"
	//var budgetWrapperDiv = $jq("div.budgetWrapper");
	
	// Calculate the budget total
	$jq(shownBudgetItems).each(function() {
	
		// Find all the literal low budget costs
		$jq(this).find(lowBudgetSelector).each(function() {
			// Parse all values into floats
			//alert("'" + $(this).text() + "'");
			if ( $jq(this).text().trim().length > 0 )
			{
				budgetSumLow += parseFloat( $jq(this).text().replace(/[$,]/g, '') );
			}
		});			
		
		// Find all the literal low budget costs
		$jq(this).find(highBudgetSelector).each(function() {
			// Parse all values into floats
			//alert("'" + $jq(this).text() + "'");
			if ( $jq(this).text().trim().length > 0 )
			{
				budgetSumHigh += parseFloat( $jq(this).text().replace(/[$,]/g, '') );
			}
		});			
			
	});
	
	//alert("Total: " + budgetSum);		
	
	// Display the budget total
	
	// Put the resulting sum in the budget result column
	var budgetTotalDiv = $jq(budgetTotalRange);
	
	
		// Save the budget values
	budgetSumLowGL = budgetSumLow;
	budgetSumHighGL = budgetSumHigh;

	
	// Update existing Budget Total Div
	// TODO: Centralize and clean this up
	$jq(budgetTotalDiv).html("<span style='font-size:16px;color: #088A29 !important;'>Total</span>: &nbsp;&nbsp;$" + budgetSumLow + ".00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$" + budgetSumHigh + ".00");		
	
  });
  
  /*********************************/
  // Checkbox check/uncheck 
  /*********************************/  
  $jq(budgetCheckBoxes).click(function(){
  
	// Hide the row, which is the parent.parent
	//$(this).parent().parent().hide();  
  
	// Recalculate the total based on the modified checked rows
	
	// Determine which check boxes are checked	
	
	var budgetSumLow = 0.0;
	var budgetSumHigh = 0.0;
	
	$jq(sumCheckBoxSelector).each(function() { 
	
		// Find their parent.parent
		// Find the budget values for those rows
		// Aggregate those values

		// Get the parent row
		chkParentRow = $jq(this).parent().parent();
		
		// Make sure it is visible
		if ( $jq(chkParentRow).is(":visible") )
		{
			// Low Budget
			$jq(chkParentRow).find(lowBudgetSelector).each (function() {
				if ( $jq(this).text().trim().length > 0 )
					{
					budgetSumLow += parseFloat( $jq(this).text().replace(/[$,]/g, '') );
				}
			});
			
			// High Budget
			$jq(chkParentRow).find(highBudgetSelector).each (function() {
				if ( $jq(this).text().trim().length > 0 )
				{
					budgetSumHigh += parseFloat( $jq(this).text().replace(/[$,]/g, '') );
				}
			});		   
		}
	});
	
		   
	// Display the budget total
	
	// Put the resulting sum in the budget result column
	var budgetTotalDiv = $jq(budgetTotalRange);
	
	
	// Save the budget values
	budgetSumLowGL = budgetSumLow;
	budgetSumHighGL = budgetSumHigh;
	
	// Update existing Budget Total Div
	// TODO: Centralize and clean this up
	$jq(budgetTotalDiv).html("<span style='font-size:16px;color: #088A29 !important;'>Total</span>: &nbsp;&nbsp;$" + budgetSumLow + ".00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$" + budgetSumHigh + ".00");			
  
  });
  
  /*********************************/
  // Budget Submit Button 
  /*********************************/  
  $jq(submitBudgetButton).click(function(){
  
	var url = window.location.href;
	
	var newUrl = url.substring(0, url.indexOf(budgetPageSlug));
	
	// Grab all the items that were checked and append their costs together	
	// Append those values onto the URL to the 'Contact Details' page
	newUrl = newUrl + contactDetailsPageSlug;	
	
	var checkedBudgetItems = '';
	
	// Find all the check boxes that were checked
	$jq(sumCheckBoxSelector).each(function() { 
		// Get the parent row of the parent row
		chkParentRow = $jq(this).parent().parent();
		
		// Find the ID of that item
		checkedBudgetItems += chkParentRow.attr('id') + "^";
	});		
	
	// Get rid of the last "^" if there was anything selected
	if (checkedBudgetItems.length > 0)
	{		
		checkedBudgetItems = checkedBudgetItems.substring(0, checkedBudgetItems.length - 1);
	}
	
	// URL format= base URL/contact details page slug?budgetItem1^budgetItem2^budgetItemN|lowbudget^highbudget
	newUrl += "?1ex_field5=" + encodeURIComponent(checkedBudgetItems + "|" + budgetSumLowGL + "^" + budgetSumHighGL);						
	
	// Redirect to 'Contact Details' page will all the arguments in the URL
	window.location = newUrl;
		
   });  

});
</script>