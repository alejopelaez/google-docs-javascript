jQuery.extend({
    View: function($buttons){
	/**
	 * Referencia a uno mismo (Truco!!)
	 */
	var self = this;
	/**
	 * Arreglo con los listeners de esta vista.
	 */
	var listeners = new Array();
	
	/**
	 * Se añade un listener a esta vista.
	 */
	this.addListener = function(list){
	    listeners.push(list);
	}

	/**
	 * Pega los botones.
	 */
	$console.append($("<input type='button' value='Dummy'></input><br><br>").click(function(){
	    self.dummy;
	}));

	/**
	 * Funcion dummy
	 */
	this.dummy = function{
	    $.each(listener, function(i){
		listeners(i).dummy();
	    });
	}
    },
    
    /**
     * Clase para crear listener de la vista facilmente.
     */
    ViewListener: function(list) {
	if(!list) list = {};
	return $.extend({
	    dummy : function(){}
	}, list);
    }
});