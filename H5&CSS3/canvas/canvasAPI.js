// /** @type {HTMLCanvasElement} */ 代码提示

// 画布api

// 防白嫖文本  1.画布id 2.文本内容 3.一行字数 4.字体大小 5. 行高
function wd(ele, text, number, size, line) {
    // ele 元素的id ，text 文本 ， number 一行几个字 ，size font ， line 行高
    if (!line) { var line = 0 }
    var cxt2 = document.getElementById(ele)
    var context2 = cxt2.getContext('2d')
    context2.font = size + "px Arial";
    for (var i = 0; i < text.length / number; i++) {
        context2.beginPath()
        context2.fillText(text.slice(i * number, i * number + number), 0, ((i * (size + line)) + size))
    }
}

//  第一个参数为 数据  第二个为 canvas 的 id
function tubiao(tubiao, canvasId) {
    var cxt = document.getElementById(canvasId)
    var context = cxt.getContext('2d')
    //  封装 ， 线
    function lin(a, b, c, d) {//A , b 起始位置 c,d 末尾位置
        context.beginPath()
        context.moveTo(a, b)
        context.lineTo(c, d)
        context.stroke()
    }
    // lin(0,0,100,100)
    function wd(str, x, y, size, color) { // str 文本内容 ， x ，y 坐标 ， size 字体大小
        context.beginPath()
        context.fillStyle = color == undefined ? '#000' : color
        context.font = size + 'px Arial'
        context.fillText(str, x, y)
    }
    function juxing(w, h, x, y, color) { // w，h 宽高 ， x，y坐标 ，color 颜色
        context.beginPath()
        context.fillStyle = color
        context.fillRect(w, h, x, y)
    }
    function 取大于最大值(max) {
        if (max <= 10) {
            return 10
        } else {
            var max1 = '' + max
            return max + Math.pow(10, max1.length - 1) - max % Math.pow(10, max1.length - 1)
        }
    }

    // juxing(150,100,100,50,'#000')
    // twd('衣服',100,100,20)
    // lin(0,0,100,100)
    // console.log(...[1,2,3,4]);

    var max = Math.max(...tubiao.data)
    var w = cxt.clientWidth
    var h = cxt.clientHeight
    var pw = w * 0.1
    var ph = h * 0.1
    var jw = w * 0.8
    var jh = h * 0.8
    lin(pw, ph, pw, h - ph)
    lin(pw, h - ph, w - pw, h - ph)
    wd(tubiao.yD, pw - 20, ph - 15, 20, 'red')
    wd(tubiao.xD, pw + jw + 10, jh + ph + 5, 20, 'red')
    var max = 取大于最大值(max)

    // 柱状图

    var 条数 = tubiao.gapNum == undefined ? 5 : tubiao.gapNum  // 线条数
    var da = tubiao.fontSize == undefined ? 20 : tubiao.fontSize  // 字体大小

    for (var j = 0; j < 条数; j++) {
        // 颜色 线
        context.strokeStyle = '#d1d1d1'
        // x
        var x = pw
        // y
        var y = ph + ((jh / 条数) * j)
        // 划线
        lin(x, y, pw + jw, y);
        // 内容 计算间隔
        var con = (max / 条数) * (条数 - j) < 10 && (max / 条数) * (条数 - j) == parseInt((max / 条数) * (条数 - j)) ? '0' + (max / 条数) * (条数 - j) : (max / 条数) * (条数 - j)
        // 保留两位小数 Number.EPSILON 最大误差值
        con = Math.round((con + Number.EPSILON) * 100) / 100
        // 获取 data 每个数据的长度
        var dataLen = ('' + con).length
        // 添加文本数据
        wd(con, x - 10 - ((da / 2) * dataLen), y + da / 3, da)
    }

    for (var i = 0; i < tubiao.name.length; i++) {
        //  每项的值
        var zhi = tubiao.data[i] * (jh / max)
        //  颜色
        var c = '#' + Math.random().toString(16).slice(-6)
        // x 坐标
        var x = pw + ((jw / (tubiao.name.length * 2)) * (i * 2)) + jw / (tubiao.name.length * 2) / 2 // 简单计算一下
        // y坐标
        var y = jh - zhi + ph - 1

        // !!!!!!!!!!!!!!!!!!!!!!!!!!!    如果不要柱状图 ， 注释一下下面一条代码就可以了
        // 矩形 绘画   
        if (tubiao.type === 'bar&line' || tubiao.type === 'line&bar' || tubiao.type == 'bar') {
            juxing(x, y, jw / (tubiao.name.length * 2), zhi, c);
        }

        // 数据长度
        var dataLen = ('' + tubiao.data[i]).length
        // name 数据长度
        var nameLen = ('' + tubiao.name[i]).length
        // 添加文本数据
        wd(tubiao.data[i], x + jw / (tubiao.name.length * 2) / 2 - (((da / 2) * dataLen) / 2), y - da / 2, da, c)
        // 添加name文本数据
        wd(tubiao.name[i], x + jw / (tubiao.name.length * 2) / 2 - (((da / 2) * nameLen) / 2), jh + ph + da, da, c)
    }

    if (tubiao.type === 'bar&line' || tubiao.type === 'line&bar' || tubiao.type == 'line') {

        // 折线图
        context.beginPath()
        context.strokeStyle = tubiao.lineColor == undefined ? 'rgb(0, 0, 255)' : tubiao.lineColor
        context.lineWidth = '' + tubiao.lineWidth == undefined ? 2 : tubiao.lineWidth
        context.lineJoin = 'round'
        context.moveTo(pw, (ph + jh))
        // context.lineTo(100,100)
        // context.lineTo(200,100)
        for (var index = 0; index < tubiao.name.length; index++) {
            var zhi = tubiao.data[index] * (jh / max)
            var x = pw + ((jw / (tubiao.name.length * 2)) * (index * 2)) + jw / (tubiao.name.length * 2)  // 简单计算一下
            var y = jh - zhi + ph - 1
            context.lineTo(x, y)
        }
        context.stroke()
    }
}

// 圆饼 1.数据 2. 画布id 3. 圆饼大小
function cake(tubiao, cancasId, sizeR) {

    // 大饼图
    var cxt2 = document.getElementById(cancasId)
    var context = cxt2.getContext('2d')

    function wd(str, x, y, size, color) { // str 文本内容 ， x ，y 坐标 ， size 字体大小
        context.beginPath()
        context.fillStyle = color == undefined ? '#000' : color
        context.font = size + 'px Arial'
        context.fillText(str, x, y)
    }
    function arc(x, y, r, start, end, color) {
        context.beginPath();
        // context.stroke()
        context.moveTo(x, y)
        context.fillStyle = color == undefined ? 'lightblue' : color
        context.arc(x, y, r, start * (Math.PI / 180), end * (Math.PI / 180));
        // context.closePath()
        context.fill()
    }
    var v = tubiao.data.reduce((red, num) => { return red + num }, 0)

    context.translate(cxt2.clientWidth / 2, cxt2.clientHeight / 2);
    var old = 0;
    for (var i = 0; i < tubiao.name.length; i++) {
        var value = 360 * (tubiao.data[i] / v)
        var a = (Math.round((tubiao.data[i] / v + Number.EPSILON) * 10000) / 10000)
        console.log(old);
        context.rotate(old * Math.PI / 180);
        // arc(0, 0, 150, -(90+(value/2)), value-(90+(value/2)), '#' + (Math.random() + '').toString(16).slice(-6))
        arc(0, 0, sizeR, -(90), value - (90), '#' + (Math.random() + '').toString(16).slice(-6))
        context.rotate((value / 2) * Math.PI / 180);
        var a = (Math.round((tubiao.data[i] / v + Number.EPSILON) * 10000) / 10000)
        var fontRS = tubiao.fontRS == undefined ? 14 : tubiao.fontRS
        var a = a * 90 + a * 10 + '%'
        var b = a.length * (fontRS / 4)
        wd(a, -b, -(4 * sizeR) / 5, fontRS, 'white')
        var fontSize = tubiao.fontSize == undefined ? 20 : tubiao.fontSize
        wd(tubiao.name[i], -(tubiao.name[i].length * fontSize / 2 / 2), -(3 * sizeR) / 5, 20, 'white')
        context.rotate(-(value / 2) * Math.PI / 180);
        old = value
    }
}





