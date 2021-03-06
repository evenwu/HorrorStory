angular.module("horror", [])
    .controller("HorrorController", function($scope, $http){
        var horror = this;
        horror.showCount = 5;
        $.getJSON("data.json", function(data) {
            horror.data = data;
            setTimeout(function(){
                $("#message").replaceWith("<div id='message'><p style='text-align:center' class='animated fadeIn'>沒有啦，騙你的啦哈哈</p></div>");
                setTimeout(function(){
                    $("#message").remove();
                    $scope.$apply();
                    $("#info").show();
                    $("#info").addClass("animated fadeIn");
                    $(".center").append('<p style="text-align: center; font-size: 16px" class="animated fadeIn">每三十分鐘更新一次<br>Made by <a href="https://goo.gl/7FSJVN" target="_blank">銀行汽車貸款＿吳先生</a></p>');
                    $(".page").show();
                    $("#pageOne").append('<div class="animated fadeIn" id="downMessage" style="position: absolute; left: 50%; bottom:0; padding: 10px 10px 10px 10px;"><div style="position: relative; left: -50%; text-align:center">下拉查看排名<br><i class="fa fa-chevron-down"></i></div></div>')
                }, 1500);
            }, 2000);
        });

        horror.showMore = function(scope, el, attrs) {
            horror.showCount = horror.showCount + 10;
            if (horror.showCount > 200)
                $("#showMoreButton").hide();
        };

        horror.sortByLike = function() {
            $("#sortByLikeButton").addClass("active");
            $("#sortByCommentButton").removeClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.likes.summary.total_count) - parseFloat(a.likes.summary.total_count);
            });
        };

        horror.sortByComment = function() {
            $("#sortByLikeButton").removeClass("active");
            $("#sortByCommentButton").addClass("active");
            horror.data.posts.sort(function(a,b){
                return parseFloat(b.comments.summary.total_count) - parseFloat(a.comments.summary.total_count);
            });
        };
    });
$(document).ready(function(){
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 5){
            $("#downMessage").removeClass("animated fadeIn");
            $("#downMessage").addClass("animated fadeOut");
        } else {
            $("#downMessage").removeClass("animated fadeOut");
            $("#downMessage").addClass("animated fadeIn");
        }
    });
});