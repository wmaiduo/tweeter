/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.

  $.ajax('tweets', { method: 'GET' })
  .then(function(tweets) {
    const createTweetElement = (tweetData) => {
      return (`
      <form>
          <article class="tweet-content">
            <header>
              <div class="user">
                <img class="tweet-image" src="${tweetData.user.avatars}">
                <p class="tweeter">${tweetData.user.name}</p>
              </div>
              <p class="username">${tweetData.user.handle}</p>
            </header>
            <h1>
            ${tweetData.content.text}
            </h1>
            <footer>
              <hr>
              <div class="lower-content">
                <p class="date">${timeago.format(tweetData.created_at)}</p>
                <div class="fas-fa">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </div>
              </div>
            </footer>
          </article>
        </form>
      `);
    }
  
    const renderTweets = function (tweets) {
      for (const tweet of tweets) {
        $('#tweets-container').append(createTweetElement(tweet));
      }
    }
  
    renderTweets(tweets);
  });

  $("section.new-tweet").submit(function (event) {
    event.preventDefault();
    if ($(this.childNodes[3].childNodes[3]).val().length > 140 || $(this.childNodes[3].childNodes[3]).val() === '') {
      alert("Not accepted");
    } else {
      const serializedNewTweet = $("#tweet-text").val();
      console.log(serializedNewTweet);
      $.post('tweets', { text: serializedNewTweet });
    }
  });
});