// $('.banner').css({height:$(document).height()})
$('header .row .logo>div>button').click(function (e) {
    $('header .row .xs').toggleClass('act')
    $('header').toggleClass('act')
})
var num = 1;
$('.banner>i').click(function (e) {
    // console.log(this);
    // console.log(this.isSameNode($('.banner>i:first-child')[0]));
    if (this.isSameNode($('.banner>i:first-child')[0])) {
        if (num === 1) {
            num = 4
            $('.banner').css({ backgroundImage: 'url("./img/b' + num + '.jpg")' })
        } else {
            num--;
            $('.banner').css({ backgroundImage: 'url("./img/b' + num + '.jpg")' })
        }
    } else {
        if (num === 4) {
            num = 1
            $('.banner').css({ backgroundImage: 'url("./img/b' + num + '.jpg")' })
        } else {
            num++;
            $('.banner').css({ backgroundImage: 'url("./img/b' + num + '.jpg")' })
        }
    }
})

window.onload = function () {
    setTimeout(() => {

        if ($('html').scrollTop() >= 100) {
            $('header').addClass('scrolltop')
        }
    }, 100)
}
window.onmousewheel = function () {
    if ($('html').scrollTop() + event.deltaY  >= 100) {
        $('header').addClass('scrolltop')
    } else {
        $('header').removeClass('scrolltop')
    }
}


$('.iii').on('click', function () {
    if ($('.iii').find('i')[0].className.includes('moon')) {
        $('.iii').find('i').addClass('fa-sun-o')
        $('.iii').find('i').removeClass('fa-moon-o')
        $('body').addClass('夜间模式')
    }else{
        $('.iii').find('i').addClass('fa-moon-o')
        $('.iii').find('i').removeClass('fa-sun-o')
        $('body').removeClass('夜间模式')
    }
})



