$(document).ready(function(){
    //intializing variables and targeting with jQuery
        var imageBank = $("#gifImages");
        var gifPicked = $("input");
        var choiceBank = $("#gifButtons");
        var imageBankTitle = $("#gifImagesTitle");
        var gifChoices = [];
        let offset = 0;
        var gifChosen;

        //apiKey for ajax request
        const apiKey = "174LnYydojrFSsBxwowWXgnph961v0ry";

      
        $("#add-gif").on("click",function(event)
        {
            choiceBank.empty();
            event.preventDefault();
           
            var newGif = gifPicked.val();
            gifChoices.push(newGif);
            console.log(gifChoices);
            renderButtons();
            $("#gif-input").val(" ");
        })

        $(document).on('click','#optionGif', function(){
            gifChosen = $(this).attr("data-gifTag");
            // need to put logic here to offset if the icon is clicked a second or third time.
            // let offset = parseInt($(this).attr("offset"))
            console.log(offset);
            buttonClicked(gifChosen);
        });

        //clear function to clear buttons and gifs images.  Will not delete favorite gifs
        $("#clear").on("click",function(){
            choiceBank.empty();
            $("#gifImagesHere").empty();
            gifChoices.splice(0, gifChoices.length);
            
        })

        //render buttons function to add new gif searches
        function renderButtons(){
            for (let i in gifChoices)
            {
                choiceBank.append("<button id = 'optionGif' data-gifTag =" + gifChoices[i] + ">" +gifChoices[i] + "</button>");
            }
        };

        //code to pause and unpause gifs.
        $(document).on('click','.img-fluid', function(){
            var state = $(this).attr("data-state");
            if(state ==="still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state","animate");
            }
            else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state","still");
            }
        });

        //this section of code adds the gif to a favorites section when #favoriteIcon is pressed.
        $(document).on('click','#favoriteIcon',function(){
            varFavState= $(this).attr("value");

            if(varFavState == "false"){
                $(this).attr("value","true");
                $(this).attr("src","./images/starFull.png");

                var newFavDiv =$("<div>");
                var newFav = $("<img>");
                var newFavIcon =$("<img>")

                newFav.attr("src", $(this).siblings("img").attr("src"));
                newFav.attr("data-still", $(this).siblings("img").attr("data-still"));
                newFav.attr("data-animate", $(this).siblings("img").attr("data-animate"));
                newFav.attr("data-state","animate");
                newFav.attr("class","img-fluid")

                newFavIcon.attr("src", "./images/trashcan.png");
                newFavIcon.attr("id","trashCan");
                newFavDiv.append(newFav, newFavIcon);
                $("#favoriteSection").append(newFavDiv);
            
            }else{
                $(this).attr("value","false");
                $(this).attr("src","./images/starNotFull.png")
            }

        })

        //going to add code here to delete gifs from favorite section
        $(document).on('click', '#trashCan',function(){
            $(this).parent("div").remove();
        });

        //a button clicked function to up query and make ajax function call.

    function buttonClicked(gifName){

        imageBankTitle.text(gifName.toUpperCase() + " GIFs")

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=174LnYydojrFSsBxwowWXgnph961v0ry&q=" + gifName + "&limit=10&offset=0rating=R&lang=en"
            console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            
            var dataGif = response.data;
            $("#gifImagesHere").empty();
            for(let i = 0; i< response.data.length; i++){
                var gifDiv = $("<div>");

                var gifImage =$("<img>");
                gifImage.attr("src",dataGif[i].images.fixed_height.url);
                gifImage.attr("data-still",dataGif[i].images.fixed_height_still.url);
                gifImage.attr("data-animate",dataGif[i].images.fixed_height.url);
                gifImage.attr("data-state","animate");
                gifImage.attr("class","img-fluid");
                gifImage.attr("offset", "0");
                
                var icon =$("<img>");
                icon.attr("src", "./images/starNotFull.png");
                icon.attr("id","favoriteIcon");
                icon.attr("value","false");

                gifDiv.prepend(gifImage, icon);

                $("#gifImagesHere").prepend(gifDiv);

            }
        });
    }     
})