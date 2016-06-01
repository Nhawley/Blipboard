
$( document ).ready(function() {

  $( "#carousel" ).animate({opacity: 0.0,}, 25, function() {} );

  $("#start").on("click", function (){
    $( "#carousel" ).animate({opacity: 1.0,}, 3000, function() {} );
    $( "#start" ).css("display", "none");
  });

  $.getJSON('/gearz', function(data) {
    for (var i = 0; i<data.length; i++){
      $('#carousel').append("<figure id="+[i]+"> <div class='card card"+[i]+"'> <div class='card-image'> <img src='assets/images/shift.png'> <span class='card-title' id='gearTitle"+[i]+"'>Article Title</span> </div> <div class='card-content' id='gearPre"+[i]+"'> <p>This will be a preview of the article.</p> </div> <div class='card-action' id='more"+[i]+"'> <a href='#''>Read More</a> <a href='#'>Add a 'blip'</a> </div> </div> </figure>");
      $('#options').html("<input id='panel-count' value='"+ data.length +"' min='3' max='"+ data.length +"' />");
      
      $('#gearTitle'+[i]+'').html(data[i].title);
      $('#gearPre'+[i]+'').html('<p data-id="' + data[i]._id + '">'+ data[i].preview + '</p>')
      $('#more'+[i]+'').html("<a href='" + data[i].link + "''>Read More!</a><a href='#'>Add a 'blip'</a>");

    }
  });


  $(document).on('click', 'p', function(){
    $('#notes').empty();
    var thisId = $(this).attr('data-id');

    $.ajax({
      method: "GET",
      url: "/gearz/" + thisId,
    })
      .done(function( data ) {
        console.log(data);
        $('#notes').append('<h2>' + data.title + '</h2>');
        $('#notes').append('<input id="titleinput" name="title" >');
        $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
        $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

        if(data.note){
          $('#titleinput').val(data.note.title);
          $('#bodyinput').val(data.note.body);
        }
      });
  });

  $(document).on('click', '#savenote', function(){
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
        $('#notes').empty();
      });


    $('#titleinput').val("");
    $('#bodyinput').val("");
  });
});