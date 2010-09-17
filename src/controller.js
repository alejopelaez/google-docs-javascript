jQuery.extend({
    Controller: function(model, view){
	/**
	 * Escucha a la vista
	 */
	var vlistener = $.ViewListener({
	    dummy : function{
		var all = model.getAll();
		$.each(all, function(i){
		    
		});
	    }
	});
	view.addListener(vlistener);

	/**
	 * listen to the model
	 */
	var mlist = $.ModelListener({
	    loadBegin : function() {
		view.message("Fetching Data...");
	    },
	    loadFail : function() {
		view.message("ajax error");
	    },
	    loadFinish : function() {
		view.message("Done.");
	    },
	    loadItem : function(item){
		view.message("from ajax: " + item.name);
	    }
	});
	model.addListener(mlist);
    }
    
});