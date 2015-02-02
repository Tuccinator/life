Life.BackPressView = Ember.View.extend({
	didInsertElement: function() {
		$('#content-container').on('click', '#back-button', function() {
            var sidebar = $('#sidebar');
            sidebar.animate({
                width: "0%",
                opacity: 0,
            }, 500 );

            $('#content').animate({
                width: '97%'
            }, 500 );

            sidebar.promise().done(function() {
                $('#content-container').prepend('<div id="restore-button"><i class="glyphicon glyphicon-arrow-right"></i></div>');
            });
        });

        $('#content-container').on('click', '#restore-button', function() {
            var restore = $('#restore-button');
            restore.remove();
            var sidebar = $('#sidebar');

            sidebar.animate({
                width: "20%",
                opacity: 1,
            }, 500 );

            $('#content').animate({
                width: '80%'
            })
        });
	}
})