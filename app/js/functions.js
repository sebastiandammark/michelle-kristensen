$(document).ready(function() {
  $('.flexslider').flexslider({
    animation: "slide"
  });

	$('input, textarea').placeholder();
	

	$('body').delegate('label.checkbox', 'click', function() {
		var checkBoxes = $('input[id="' + $(this).attr('for') + '"]');
		$(this).toggleClass('active');

 		checkBoxes.attr('checked', !checkBoxes.attr('checked'));
	});
});