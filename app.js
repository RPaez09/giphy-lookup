var app = {
    
    subjects : {
        
        store: ['coding' , 'drifting' , 'wine' , 'biking' , 'stunt' , 'skydive' , 'samoyed' , 'the office'],

        element: document.getElementsByClassName('query-wrapper')[0],

        inputBox: document.getElementsByClassName('search-box')[0],

        add: function( ){
            if( this.inputBox.value != "" ){
                this.store.unshift( this.inputBox.value );
                this.inputBox.value = "";
                this.render();
            }
        },

        remove: function( index ){
            this.store.splice( index , 1 );
            this.render();
        },

        render: function(){
            
            var newHTML = '';

            for( var i = 0; i < app.subjects.store.length; i++ ){
                newHTML += '<div class="button query-item" data-index="' + i + '" data-value="' + app.subjects.store[i] + '">'+ app.subjects.store[i] +'<div class="del-btn">X</div></div>';
            }

            this.element.innerHTML = newHTML;

        }

    },

    results : {

        store : [],

        element: document.getElementsByClassName('result-wrapper')[0],

        createQuery : function( subject ){
            return "https://api.giphy.com/v1/gifs/search?api_key=fNmH3bq6TtGUIEPZLAotDnsoCRR2aHuN&q="+ subject +"&limit=10&offset=0&rating=G&lang=en"
        },

        makeRequest : function( subject ){
            var xhr = new XMLHttpRequest();
            
            xhr.open('GET' , this.createQuery( subject ) );

            xhr.send(null);

            xhr.onreadystatechange = function(){
                if( xhr.readyState === 4 ) { //request done
                    if( xhr.status === 200 ){
                        app.results.store = ( JSON.parse( xhr.response ) ).data;
                        app.results.render();
                    } else {
                        console.error('Error: ' + xhr.status + ' an error occurred during the request made to the server.');
                    }
                }
            };

        },

        render : function(){
            var newHTML = '';

            for(var i = 0; i < this.store.length; i++){
                newHTML += '<div class="search-result" data-index="'+ i +'"><img src="'+ this.store[i].images.fixed_height_still.url +'"/></div>'
            }

            this.element.innerHTML = newHTML;
        }
    },

    startUp : function(){
        this.subjects.render();

        document.getElementsByClassName( 'query-wrapper' )[0].addEventListener( 'click' , function( e ){ 
            if( e.target.matches('.del-btn') ){
                // event delegation for deleting an item from the queries
                app.subjects.remove( e.target.parentNode.attributes['data-index'].value );

            } else if( e.target.matches('.query-item') ){
                // event for making requests when a subject is clicked
                app.results.makeRequest( e.target.attributes['data-value'].value );
            };
        });

        document.getElementsByClassName( 'search-btn' )[0].addEventListener('click' , function(e){
            // event for adding an item to the queries
            app.subjects.add();
        });

        document.getElementsByClassName( 'search-box' )[0].addEventListener('keyup' , function(e){
            // same as above but on enter key being pressed
            if( e.which === 13 ){
                app.subjects.add();
            }
        });
    }
};

app.startUp();