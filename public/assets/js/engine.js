
$( document ).ready(function() {

  $( "#carousel" ).animate({opacity: 0.0,}, 25, function() {} );

  $("#start").on("click", function (){
    $( "#carousel" ).animate({opacity: 1.0,}, 2000, function() {} );
    $( "#start" ).css("display", "none");
  });

  $.getJSON('/gearz', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#carousel').append("<figure id="+[i]+"> <div class='card card"+[i]+"'> <div class='card-image'> <img src='assets/images/road.jpg'> <span class='card-title' id='gearTitle"+[i]+"'>Article Title</span> </div> <div class='card-content grey lighten-2' id='gearPre"+[i]+"'> <p>This will be a preview of the article.</p> </div> <div class='card-action' id='more"+[i]+"'> <a href='#''>Read More</a> <a href='#'>Add a 'blip'</a> </div> </div> </figure>");
      $('#options').html("<input id='panel-count' value='"+ data.length +"' min='3' max='"+ data.length +"' />");
      
      $('#gearTitle'+[i]+'').html(data[i].title);
      $('#gearPre'+[i]+'').html('<p data-id="' + data[i]._id + '">'+ data[i].preview + '</p>')
      $('#more'+[i]+'').html("<a href='" + data[i].link + "' target='_blank'>Read More!</a><a data-id=" + data[i]._id + " href='#' id='blip'>Add a 'blip'</a>");

    }
  });


  $(document).on('click', '#blip', function(){

    $('#modal1').openModal();

    $('.blipz').empty();

    var thisId = $(this).attr('data-id');

    $.ajax({
      method: "GET",
      url: "/gearz/" + thisId,
    })
      .done(function( data ) {
        console.log(data);
        $('.blipz').append('<h4>' + data.title + '</h4>');
        $('.blipz').append('<input id="titleinput" name="title" >');
        $('.blipz').append('<textarea id="bodyinput" name="body"></textarea>');
        $('.blipzLow').html("<a href='#!' class=' modal-action modal-close waves-effect waves-green btn-flat' data-id=" + data._id + " id='savenote'>Save Blip</a>");

        if(data.note){
          $('#titleinput').val(data.note.title);
          $('#bodyinput').val(data.note.body);
        }
      });
  });

  $(document).on('click', '#savenote', function(){

    $('#modal1').closeModal();
    var thisId = $(this).attr('data-id');

    $.ajax({
      method: "POST",
      url: "/gearz/" + thisId,
      data: {
        title: $('#titleinput').val(),
        body: $('#bodyinput').val()
      }
    })
      .done(function( data ) {
        console.log(data);
        $('.blipz').empty();
      });


    $('#titleinput').val("");
    $('#bodyinput').val("");
  });
});