jQuery.extend({
    Model: function(){
	/**
	 * referencia a nosotros (truco!!)
	 */
	var self = this;
	/**
	 * listeners del modelo
	 */
	var listeners = new Array();	
	
	/**
	 * load lots of data from the server
	 * or return data from cache if it's already
	 * loaded
	 */
	this.getAll = function(){
	    //Se notifican los listeners que estamos
	    //haciendo algo
	    self.dummyModel();
	    //Hacemos algo
	    //...
	    //...
	    //Retornamos ese algo
	    return "Datos"
	}
	
	/**
	 * Añade un listener
	 */
	this.addListener = function(list){
	    listeners.push(list);
	}
	
	/**
	 * Función que se llama en los listeners
	 * del modelo.
	 */
	this.dummyModel = function(){
	    $.each(listeners, function(i){
		listeners[i].dummyModel();
	    });
	}	
    },
    
    /**
     * Funcion para crear un listener del modelo facilmente.
     */
    ModelListener: function(list) {
	if(!list) list = {};
	return $.extend({
	    dummyModel : function(){}
	}, list);
    }
});