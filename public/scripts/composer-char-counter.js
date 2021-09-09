$(document).ready(function () {
  $("textarea").on("input", function () {
    let charLeft = 140 - $(this).val().length;
    $(this.parentNode.childNodes[5].childNodes[3]).val(charLeft);
    if (charLeft < 0) {
      $(this.parentNode.childNodes[5].childNodes[3]).css("color", "red");
    } else {
      $(this.parentNode.childNodes[5].childNodes[3]).css("color", "black");
    }
  });

  $("i.fa-flag").hover(
    function () {
      $(this).css("color", "#AFD275");
    }, function () {
      $(this).css("color", "black");
    }
  );
  $("i.fa-retweet").hover(
    function () {
      $(this).css("color", "#AFD275");
    }, function () {
      $(this).css("color", "black");
    }
  );
  $("i.fa-heart").hover(
    function () {
      $(this).css("color", "#AFD275");
    }, function () {
      $(this).css("color", "black");
    }
  );
});

