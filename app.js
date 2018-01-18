var app = {
    
    subjects : {

        activeIndex : null,
        
        store: ['coding' , 'drifting' , 'wine' , 'biking' , 'stunt' , 'skydive' , 'samoyed' , 'the office'],

        element: document.getElementsByClassName('query-wrapper')[0],

        inputBox: document.getElementsByClassName('search-box')[0],

        add: function( ){
            if( this.inputBox.value != "" ){
                this.store.unshift( this.inputBox.value );
                this.inputBox.value = "";
                this.activeIndex++;
                this.render();
            }
        },

        remove: function( index ){
            this.store.splice( index , 1 );
            if( index === this.activeIndex ){
                this.activeIndex = null;
            }else if( index < this.activeIndex ){
                this.activeIndex--;
            }
            this.render();
        },

        render: function(){
            
            var newHTML = '';

            for( var i = 0; i < app.subjects.store.length; i++ ){
                newHTML += '<div class="button query-item';
                
                if( i === this.activeIndex ){
                    newHTML += ' active';
                }
                
                newHTML += '" data-index="' + i + '" data-value="' + app.subjects.store[i] + '">'+ app.subjects.store[i] +'<div class="del-btn">X</div></div>';
            }

            this.element.innerHTML = newHTML;

        }

    },

    results : {

        store : [],

        activeIndex : null,

        activeElement : null,

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
                app.subjects.activeIndex = parseInt(e.target.attributes['data-index'].value);
                app.subjects.render();
                app.results.makeRequest( e.target.attributes['data-value'].value );
                app.results.activeIndex = null; // reset the current active index since a new gif set is produced
                app.results.activeElement = null;
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

        document.getElementsByClassName('result-wrapper')[0].addEventListener('click' , function(e){
            // event for when a gif is clicked
            if( e.target.matches('img') ){
                var newIndex = parseInt( e.target.parentNode.attributes['data-index'].value ); // get the new index
                if( app.results.activeIndex === null ){
                    e.target.attributes.src.value = app.results.store[ newIndex ].images.fixed_height.url; // switch to a gif
                    app.results.activeIndex = newIndex; // switch to the new index
                    app.results.activeElement = e.target; // lets save the element reference for switching the gif to a stll image later
                }
                else if( app.results.activeIndex === newIndex ){ // if clicking an already active gif
                    e.target.attributes.src.value = app.results.store[ newIndex ].images.fixed_height_still.url; // switch to the still image
                    app.results.activeIndex = null; // reset active index
                    app.results.activeElement = null; // reset active element
                } else {
                    app.results.activeElement.attributes.src.value = app.results.store[ app.results.activeIndex ].images.fixed_height_still.url;
                    e.target.attributes.src.value = app.results.store[ newIndex ].images.fixed_height.url; // switch to a gif
                    app.results.activeIndex = newIndex; // switch to the new index
                    app.results.activeElement = e.target;
                }
            }
        });
    }
};

app.startUp();