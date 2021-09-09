/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //load the existing tweeters
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
      };

      const renderTweets = function(tweets) {
        for (const tweet of tweets.slice().reverse()) {
          $('#tweets-container').append(createTweetElement(tweet));
        }
      };

      renderTweets(tweets);
    });

  //submitting the new tweet
  $("section.new-tweet").submit(function(event) {
    event.preventDefault();
    const serializedNewTweet = $("#tweet-text").val().trim();
    //check whether the tweet is abouve 140 words count or is empty
    if (serializedNewTweet.length > 140 || serializedNewTweet === '') {
      //give an error if it is
      $('.error').empty();
      const error = `<div class="slider" style="display:none"><i class="fas fa-exclamation-triangle"></i>&nbsp;Invalid Input, try again!&nbsp;<i class="fas fa-exclamation-triangle"></i></div>`;
      $('.error').append(error);
      $('.error').find('.slider').slideDown('fast');
    } else {
      $('.error').empty();
      //change the message into text in order to prevent XSS
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(serializedNewTweet));
      const safeHTML = `<p>${div.innerHTML}</p>`;
      //post the message into server
      $('#tweet-text').val('');
      $('output.counter').val('140');
      $.post('tweets', { text: safeHTML })
        //when done, load the message from the server to the webpage
        .done(function() {
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
              };

              const renderTweets = function(tweets) {
                $('#tweets-container').empty();
                for (const tweet of tweets.slice().reverse()) {
                  $('#tweets-container').append(createTweetElement(tweet));
                }
              };

              renderTweets(tweets);
            });
        });
    }
  });
});