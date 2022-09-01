function shubiaoyidon(params) {
    $('body').mousedown(function () {
        $(this).attr('onselectstart', 'return false')
        var t = $(params)[0]
        var x = event.pageX
        var y = event.pageY
        $('body').mousemove(function (e) {
            $(t).css({
                transform: 'rotateX(' + -(e.pageY - y) + 'deg) ' + 'rotateY(' + (e.pageX - x) + 'deg)',
            })
        })
    })
    $('body').mouseup(function () {
        $('body').unbind('mousemove')
    })
}

function houDu3D(ele, width) {
    var arrCreate = [];
    for (let index = 0; index < 5; index++) {
        var aaa;
        aaa = $(ele)[0].cloneNode(true);
        if (index === 0) {
            aaa.innerHTML = ''
        } else {
            aaa.innerHTML = ''
            // aaa.className = ''
            if(index>=3){
                $(aaa).css({
                    width: width + 'px',
                    height: $(ele).width(),
                })
            }else{
                $(aaa).css({
                    width: width + 'px',
                    height: '100%',
    
                })
            }
        }
        $(aaa).css({
            position: 'absolute',
            left: 0,
            top: 0,
        })
        $(ele)[0].append(aaa)
        arrCreate.push(aaa)
    }

    $(arrCreate[0]).css({
        transform: 'translateZ(' + -width + 'px)',
    })
    $(arrCreate[1]).css({
        transform: ' rotateY(-90deg) translateZ(' + width / 2 + 'px) translateX(' + -width / 2 + 'px)',
    })
    $(arrCreate[2]).css({
        transform: ' rotateY(90deg) translateZ(' + ($(ele).width() - width / 2) + 'px) translateX(' + width / 2 + 'px)',
    })
    $(arrCreate[3]).css({
        transform: 'rotateY(90deg) rotateX(90deg) translateZ(' + ($(ele).width() / 2) + 'px) translateY(' + ($(ele).width() / 2 - width / 2) + 'px) translateX(' + width / 2 + 'px)',
    })
    $(arrCreate[4]).css({
        transform: 'rotateY(90deg) rotateX(-90deg) translateZ(' + ($(ele).height() / 2-(($(ele).width()-$(ele).height())/2)) + 'px) translateY(' + -($(ele).width() / 2 - width / 2) + 'px) translateX(' + width / 2 + 'px)',
    })
}