/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  $('.error-message').hide();


  function createTweetElement(tweetData) {
    let currentUser = tweetData.user;
    let profilePicture = currentUser.avatars.small;
    let userName = currentUser.name;
    let username = currentUser.handle;
    let content = tweetData.content.text;
    let postDate = moment(tweetData.created_at).fromNow();
    let paragraphContent = $('<p>').text(content);

    let $tweet = $(`<article></article>`).appendTo(`.tweet-container`).addClass(`logged-tweet`)
      .append(`<header></header>`).children().addClass(`tweet-header`)
      .append(`<img>`).children().attr(`src`, `${profilePicture}`)
      .attr(`alt`, `Profile Picture`).addClass(`profile-picture`)
      .after(`<h2>${userName}</h2>`).next().addClass(`user-name`)
      .after(`<small>${username}</small>`).next().addClass(`user-username`)
      .parent().parent().append(paragraphContent).children().last()
      .addClass(`user-tweet-body`).after(`<footer></footer>`)
      .next().addClass(`tweet-footer`).append(`<span>${postDate}</span>`)
      .children().addClass(`post-date`);
    return $tweet;
  }

  function renderTweets(tweetsList) {
    for (var i = tweetsList.length - 1; i >= 0; i--) {
      createTweetElement(tweetsList[i]);
    }
  }

  function loadTweets() {
    $('.tweet-container').html("");
    $.ajax({
        'method': 'GET',
        'url': '/tweets'
      })
      .then(function(tweetPosts) {
        renderTweets(tweetPosts);
      });
  }
  loadTweets();

  const $newTweetForm = $('#new-tweet-form');
  $newTweetForm.submit(function(event) {
    event.preventDefault();
    if (!$('#new-tweet').val() || Number($('.counter')[0].innerHTML) <= 0) {
      return alert("Tweet must be less than 140 characters, and more than 0.");
    } else {
      const formData = $newTweetForm.serialize();
      $.ajax({
        'method': 'POST',
        'url': '/tweets',
        'data': formData,
        'complete': function(response) {
          loadTweets();
        }
      });
    }
  });

  $('.new-tweet-button').click(function() {
    $('.new-tweet').slideToggle();
    if ($('.new-tweet').height() === 0) {
      $('#new-tweet').focus();
    }
  });

});
