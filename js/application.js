window.Life = Ember.Application.create({
	
});

Life.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'api'
});

Ember.Handlebars.registerBoundHelper('currentDate', function(date) {
  return moment(date).format('h:m A');
});