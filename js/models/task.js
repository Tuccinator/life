Life.Task = DS.Model.extend({
	name: DS.attr('string'),
	shortDescription: DS.attr('string'),
	longDescription: DS.attr('string'),
	day: DS.attr(),
	started: DS.attr(),
	completed: DS.attr()
});