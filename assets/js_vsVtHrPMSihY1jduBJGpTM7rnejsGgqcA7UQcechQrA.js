(function($, Drupal) {
	$(document).ready(function() {
		// Add a select all option to all chosen select fields
		if (Drupal.settings.chosen != undefined && Drupal.settings.chosen.selector != undefined && Drupal.settings.chosen.selector != '') {
			$(Drupal.settings.chosen.selector).each(function(event) {
				if ($(this).attr('multiple') && $(this).children('option').length >= Drupal.settings.chosen.minimum_multiple) {
					var _this = this;
					var options = $(this).children('option');
					$(this).next('.chosen-container').after(
						$('<div>')
						.addClass('sel-buttons-container')
						.addClass('clearfix')
						.append(
							$('<a>')
							.text('Select All')
							.addClass('chzn-sel-all')
							.addClass('button')
							.attr('href', '#chzn-sel-all')
							.click(function(event) {
								event.preventDefault();
								options.attr('selected', true);
								$(_this).trigger('chosen:updated.chosen').trigger('change');
								return false;
							})
							.after($('<a>')
								.text('Select None')
								.addClass('chzn-sel-none')
								.addClass('button')
								.attr('href', '#chzn-sel-none')
								.click(function(event) {
									event.preventDefault();
									options.attr('selected', false);
									$(_this).trigger('chosen:updated.chosen').trigger('change');
									return false;
								})
								.hide()
							)
						)
					);
					$(this).change(function(event) {
						if ($(this).children('option:selected').length == 0) {
							$(this).parent().find('.chzn-sel-all').show();
							$(this).parent().find('.chzn-sel-none').hide();
						} else if ($(this).children('option:selected').length == $(this).children('option').length) {
							$(this).parent().find('.chzn-sel-all').hide();
							$(this).parent().find('.chzn-sel-none').show();
						} else {
							$(this).parent().find('.chzn-sel-all').show();
							$(this).parent().find('.chzn-sel-none').show();
						}
					});
				}
			});
		}
	});
})(jQuery, Drupal);
;
