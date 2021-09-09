$(document).ready(function () {
  $("textarea").on("input", function () {
    let charLeft = 140 - $(this).val().length;
    $(this.parentNode.childNodes[5].childNodes[3]).val(charLeft);
    if (charLeft < 0) {
      $(this.parentNode.childNodes[5].childNodes[3]).css("color", "red");
    } else {
      $(this.parentNode.childNodes[5].childNodes[3]).css("color", "white");
    }
  });
});

