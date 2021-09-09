/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  $.ajax('tweets', { method: 'GET' })
    .then(function (tweets) {
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

  //submitting the new tweet
  $("section.new-tweet").submit(function (event) {
    event.preventDefault();
    if ($(this.childNodes[1].childNodes[3]).val().length > 140 || $(this.childNodes[1].childNodes[3]).val() === '') {
      const error = `<div class="slider" style="display:none"><i class="fas fa-exclamation-triangle"></i>&nbsp;Invalid Input, try again!&nbsp;<i class="fas fa-exclamation-triangle"></i></div>`;
      $('.error').append(error);
      $('.error').find('.slider').slideDown('fast');
    } else {
      const serializedNewTweet = $("#tweet-text").val();
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(serializedNewTweet));
      const safeHTML = `<p>${div.innerHTML}</p>`;
      console.log(safeHTML);
      $.post('tweets', { text: safeHTML })
        .done(function () {
          $.ajax('tweets', { method: 'GET' })
            .then(function (tweets) {
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
                console.log(tweets.length);
                $('#tweets-container').append(createTweetElement(tweets[tweets.length - 1]));
              }

              renderTweets(tweets);
            })
        });
    }
  });
});