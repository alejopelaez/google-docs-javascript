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
            callback = function(root) {		
                var rows = root.table.rows;
                var result = [];

                for ( r in rows ) {
		    var rresult = [];
                    for( c in rows[r].c ){
                        rresult.push( rows[r].c[c].v );
                    }
		    result.push(rresult);
                }
		var prune = root.table.cols[1].type != 'number' ? true : false;
		var ans = { 'data' : result, 'recursive' : prune};
                self.onLoadEnd(ans);
            }	    
            // Leer de google docs
            $.getScript('http://spreadsheets.google.com/tq?tqx=responseHandler:callback&key='+key+'&pub=1');
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
            onLoadEnd : function(info){}
        }, list);
    }
});