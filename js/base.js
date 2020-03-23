/* 各个网页均存在的JS  

*/
// 手机端菜单键点击后执行的函数
function switchMenu(params) {
    if (window.innerWidth < 800) { //宽度小于800才执行
        document.querySelector('#perspective').style.height = window.innerHeight + "px" //为模块设置高度为PC浏览器的高度
        var node = document.querySelector('#container');
        if (node.classList.contains('page_inright')) { //左侧菜单已经打开  切换至正常  open to close
            document.querySelector("#container").classList.remove("page_inright")
            document.querySelector(".menubar").classList.remove("arrow")
            document.querySelector("#top-menu").classList.remove("menu-inright")
            document.querySelector("#perspective").style.backgroundColor = "transparent"
            document.querySelector(".aside").style.display = "block"
            document.querySelector("#cover").style.display = "none"//调整点击面板
            setTimeout(function (params) {
                document.querySelector("#container").style.overflow = "visible"
            }, 800);
            document.querySelector(".menu").classList.remove("open")
        } else { //左侧菜单没有打开  点击打开菜单  close to open
            document.querySelector("#perspective").style.backgroundColor = "cornflowerblue" //菜单栏背景颜色
            document.querySelector(".menubar").classList.add("arrow")
            document.querySelector("#container").classList.add("page_inright")
            document.querySelector("#container").style.overflow = "hidden"
            document.querySelector("#top-menu").classList.add("menu-inright")
            document.querySelector(".menu").classList.add("open")
            document.querySelector(".aside").style.display = "none"
            document.querySelector("#cover").style.display = "block"//盖住点击面板
        }
    }
}
// 监听菜单键
document.querySelector(".menubar").addEventListener("click", switchMenu);
document.querySelector("#container").addEventListener("click", function () {
    if (document.querySelector('#container').classList.contains('page_inright')) {
        switchMenu();
    }
});

// 置顶键的响应（右下角）
window.onload = function () {
    var scrollTop = 0;
    document.onscroll = function () {
        if (scrollTop < (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)) { //判断页面滚动的方向
            document.querySelector('.aside').style.right = -45 + "px";
        } else {
            document.querySelector('.aside').style.right = 5 + "px";
        }
        if (scrollTop < 150) {
            document.querySelector('.aside').style.right = -45 + "px";

        }
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    }
}
// 改变QQ地址  （腾讯QQ的API移动端与PC端链接不同） PC优先
var width = document.documentElement.clientWidth
if (width < 600) {
    document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com"
}
// 设置footer日期  设置到当前日期
var date = new Date();
document.querySelector('#now_date').innerHTML = (date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate());
// 移动端菜单栏标题响应当前HTML的title
document.querySelector('.top-title div').innerHTML = document.querySelector('title').innerHTML
// 加载左上角句子的script 不用一个一个添加   一言API
var secScript = document.createElement("script");
secScript.setAttribute("type", "text/javascript");
secScript.setAttribute("src", "https://v1.hitokoto.cn/?c=d&c=i&c=k&encode=js&select=%23hitokoto"); //一言c参数可以设置句子类型
document.body.insertBefore(secScript, document.body.lastChild);
// 防止iframe消失
if (!parent.document.body.querySelector("#iframe")) {
    window.location.href = "http://www.bblog.github.io/";
}
//设置导航栏文字
if (document.querySelector(".tabbed li:last-child a")) {
    document.querySelector(".tabbed li:last-child a").innerHTML = "网站首页";
}
//设置移动导航栏文字
if (document.querySelector(".menu ul li")) {
    document.querySelector(".menu ul li:first-child a").innerHTML = "网站首页";
    document.querySelector(".menu ul li:nth-last-child(3) a").innerHTML = "首个网站";
    document.querySelector(".menu ul li:nth-last-child(2) a").innerHTML = "每日明记";
}
if (document.querySelector(".category-list ul li:nth-last-child(2) a")) {
    document.querySelector(".category-list ul li:nth-last-child(2) a").innerHTML = "每日明记";
}


//用word方式计算正文字数
function fnGetCpmisWords(str) {
    sLen = 0;
    try {
        //先将回车换行符做特殊处理
        str = str.replace(/(\r\n+|\s+|　+)/g, "龘");
        //处理英文字符数字，连续字母、数字、英文符号视为一个单词
        str = str.replace(/[\x00-\xff]/g, "m");
        //合并字符m，连续字母、数字、英文符号视为一个单词
        str = str.replace(/m+/g, "*");
        //去掉回车换行符
        str = str.replace(/龘+/g, "");
        //返回字数
        sLen = str.length;
    } catch (e) {}
    return sLen;
}
// 计算字数
if (document.querySelector('#word')) {
    var p = document.querySelector('.massage').textContent
    document.querySelector('#word').innerHTML = fnGetCpmisWords(p) + " 字"
}

//随机边框颜色
if ( document.querySelector('main')) {
    document.querySelector('main').style.borderColor = "#" + Math.round(Math.random() * 0x1000000).toString(16);
}
var canvas = document.createElement("canvas");
canvas.setAttribute("id", "cover");
document.querySelector(".blogs").appendChild(canvas)
