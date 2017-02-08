$(document).ready(function() {

	//to form data can't be reset when submit
	$("form").submit(function() { 
		return false;
	});

	//hide all the tab-containers
	//the first container will be shown when the page is loaded
	$(".tab-content").hide();
	$(".active-content").show();

	//hide and show left panel
	$("aside .collapse").click(function() {
	
      $("aside").toggleClass("hide");

      if ($("aside").hasClass("hide")) {
      	$("aside").animate({
      		left: "-=453px"
      	}, 800);
      }
      else {
      	$("aside").animate({
      		left: "0px"
     	}, 800);
      }

      $(this).toggleClass("collapse-transform");
	});

	//creating datepicker field
	$("#datepicker").datepicker({
		minDate: "0"
	});



	//to not delete tab when edit
	var activeTab = 200;


	var addTab = function() {

		//checking for empty fields
		$("input[type='text'], textarea").each(function (i, element) {
			$(element).removeClass("highlight");
		});

		$("input[type='text'], textarea").each(function (i, element) {
			if (element.value.length === 0) {
				$(element).addClass("highlight");
				$(element).attr("placeholder", "Fill in this field");
			}
		});

		//checking the Index field
		var $inputIndex = $("#text");

		if (!$.isNumeric($inputIndex.val()) || 
			parseInt($inputIndex.val(), 10) < 0 || 
			parseInt($inputIndex.val(), 10) !== parseFloat($inputIndex.val())) {
			
			$inputIndex.addClass("highlight")
				.val("")
				.attr("placeholder", "Enter a real number >= 0");
			return;
		}

		//creating the tab and tab-content
		var newTab = '<li class="tab"><span class="tab-text">' + $("#title").val() + '</span></li>';
		var newTabContent = '<li class="tab-content">' + $("#html").val() + '<p>Actual due date: ' + $("#datepicker").val() + '</p>' + '</li>';

		var tabHTML = $.parseHTML(newTab);
		var tabContentHTML = $.parseHTML(newTabContent);

		var indexValue = parseInt($inputIndex.val(), 10);

		//if there are no empty fields
		if ($(".highlight").length === 0) {

			//insertion into position 0
			if (indexValue === 0) {
				$(newTab).insertBefore(".tab:nth-child(1)");
				$(tabContentHTML).insertBefore(".tab-content:nth-child(1)").hide();
			}

			//insertion into other positions
			else {
				var tabsCount = $(".tab").length;

				if (indexValue >= tabsCount) {
					$(newTab).insertAfter(".tab:last-child");
					$(tabContentHTML).insertAfter(".tab-content:last-child").hide();
				}
				else {
					$(newTab).insertAfter(".tab:nth-child(" + (indexValue) + ")");
					$(tabContentHTML).insertAfter(".tab-content:nth-child(" + (indexValue) + ")").hide();
				}

			}

			reset();
		}

	}

	//creating new tab by clicking the "add" button
	$("#add").click(function() {

		addTab();
		//disable button add when there is no place
		if ($(".tabs").eq(0).width() < (100 * $(".tab").length)) {
			$("#add").prop("disabled", true);
		}
		
	});

	//edit tab
	$("#edit").click(function() {

		//remove existing tab and create new
		
		
		$(".tab").eq(activeTab).remove();
		$(".tab-content").eq(activeTab).remove();
		addTab();
		
	});

	//remove highlighting when the value of the field changes
	$("input[type='text'], textarea").each(function (i, element) {
		$(element).on("input", function() {
			$(element).removeClass("highlight wrong-input").attr("placeholder", "");
		});
	});


	//clear form
	var reset = function() {
		$("input[type='text'], textarea").each(function (i, element) {
			$(element).val("");
			$(element).attr("placeholder", "");
			$(element).removeClass("highlight");
		});
	}

	//reset button
	$("#reset").click(function() {
		reset();
	})

	//switch tabs
	$(".tabs").delegate(".tab", "click", function() {

		$(".tab").each(function (i, element) {
			$(element).removeClass("active-tab");
		});

		$(this).addClass("active-tab");


		$(".tab-content").each(function (i, element) {
			$(element).hide();
			$(element).removeClass("active-content");
		});

		var tabIndex = $(".tab").index($(this));
		activeTab = tabIndex;

		$(".tab-content").eq(tabIndex).addClass("active-content");
		$(".active-content").show();

		//fill left panel when clicking a tab
		$("#text").val(tabIndex);
		$("#title").val($(".tab:nth-child(" + (tabIndex + 1) + ") .tab-text").text());

		var htmlContent = $(".tab-content:nth-child(" + (tabIndex + 1) + ")").html().trim();
		var tmpDate = htmlContent.substring(htmlContent.length - 15, htmlContent.length - 4);

		$("#html").val($(".tab-content:nth-child(" + (tabIndex + 1) + ")").html().trim());
		$("#datepicker").val(tmpDate);
		
	});

});