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
        this.getAll = function(key){
            //Se notifican los listeners que estamos
            //haciendo algo
            self.onLoadBegin();
            $.Model.callback = function(root) {
                var rows = root.table.rows;
                var result = [];

                for ( r in rows ) {
		    var rresult = [];
                    for( c in rows[r].c ){
                        rresult.push( rows[r].c[c].v );
                    }
		    result.push(rresult);
                }
                self.onLoadEnd(result);
            }	    
            // Leer de google docs
            $.getScript('http://spreadsheets.google.com/tq?tqx=responseHandler:$.Model.callback&key='+key+'&pub=1');//key=0As2pD6IuRl_7dE14LWlTYjhoVDFQRENMTVlmUzRzNGc
        }

        /**
         * Añade un listener
         */
        this.addListener = function(list){
            listeners.push(list);
        }

        /**
         * Función que se llama en los listeners
         * del modelo cuando se empieza a cargar.
         */
        this.onLoadBegin = function(){
            $.each(listeners, function(i){
                listeners[i].onLoadBegin();
            });
        }
        /**
         * Función que se llama en los listeners
         * del modelo cuando se termina de cargar.
         */
        this.onLoadEnd = function(result){
            $.each(listeners, function(i){
                listeners[i].onLoadEnd(result);
            });
        }
    },

    /**
     * Funcion para crear un listener del modelo facilmente.
     */
    ModelListener: function(list) {
        if(!list) list = {};
        return $.extend({
            onLoadBegin : function(){},
            onLoadEnd : function(){}
        }, list);
    }
});