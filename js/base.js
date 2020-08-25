/* 各个网页均存在的JS  
 */
// 防止iframe消失  刷新时---
function GetUrlRelativePath() { //获取相对路径
    var url = document.location.toString();
    var arrUrl = url.split("//");
    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
if (!parent.document.body.querySelector("#iframe")) {
    window.location.href = "/" + "#" + GetUrlRelativePath(); //刷新时传递锚点
}
//地址栏  标题  主题
window.parent.document.querySelector("title").innerHTML = document.querySelector("title").innerHTML
window.parent.addEventListener("popstate", function (e) { //后退的优化
    window.history.back(-2);
}, false);
var stateObject = {};
var title = document.querySelector("title").innerHTML
var newUrl = document.location.href;
if (GetUrlRelativePath() == "/index0.html") { //主页优化
    newUrl = window.location.origin
}
window.parent.history.pushState(stateObject, title, newUrl);
var container = document.querySelector('#container');
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
//文字设置
! function () {
    // 设置footer日期  设置到当前日期
    var date = new Date();
    document.querySelector('#now_date').innerHTML = (date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate());
    // 设置字数
    if (document.querySelector('#word')) {
        var p = document.querySelector('.massage').textContent
        document.querySelector('#word').innerHTML = fnGetCpmisWords(p) + " 字"
    }
}()
//样式设置
! function () {
    //随机边框颜色
    if (document.querySelector('main')) {
        document.querySelector('main').style.borderColor = "#" + Math.round(Math.random() * 0x1000000).toString(16);
    }
    // 添加进度条标签
    if (document.querySelector("#top-menu")) {
        var progress = document.createElement("progress");
        progress.setAttribute("class", "top_progress");
        progress.setAttribute("value", "0");
        document.body.appendChild(progress);
    }
    // 进度条的响应
    if (document.querySelector('.top_progress')) {
        window.onscroll = function () {
            document.querySelector('.top_progress').max = document.body.scrollHeight - window.screen.availHeight
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.querySelector('.top_progress').value = scrollTop
        }
    }
}()
//添加框架、画布、SVG
! function () {
    // add iframe  粒子文字
    var h = window.innerHeight / 2 - 50 + "px"
    if (!document.querySelector(".none-top-word")) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "top_h")
        iframe.setAttribute("frameborder", "0")
        iframe.setAttribute("height", h)
        iframe.setAttribute("src", "../../../iframe/particle_word.html")
        container.insertBefore(iframe, container.childNodes[0]);
    }
    // add iframe  底部动画
    //随机几个
    var bottom_src = [
        "../../../iframe/bike.html",
        "../../../iframe/horse.html",
        "../../../iframe/train.html"
    ]
    if (document.querySelector(".no_particle")) { //首页几个页面footer有问题，独立添加
        document.querySelector("#bottom_frame").setAttribute("height", h)
        document.querySelector("#bottom_frame").setAttribute("src", bottom_src[Math.floor(Math.random() * bottom_src.length)])
    } else {
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "bottom_frame")
        iframe.setAttribute("frameborder", "0")
        iframe.setAttribute("height", h)
        iframe.setAttribute("src", bottom_src[Math.floor(Math.random() * bottom_src.length)])
        container.insertBefore(iframe, document.querySelector(".footer"));
    }
}()
var width = document.documentElement.clientWidth
    //结构设置
    ! function () {

        // 改变QQ地址  （腾讯QQ的API移动端与PC端链接不同） PC优先

        if (width < 600) {
            document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com"
        }
        // 置顶键的响应（右下角）
        window.onload = function () {
            var scrollTop = 0;
            document.onscroll = function () {
                if (scrollTop < (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)) { //判断页面滚动的方向
                    //向下
                    document.querySelector('.top_progress').style.top = "0px"; //进度条
                    document.querySelector('#top-menu').style.top = "-62px"; //移动端
                    document.querySelector('.tabbed').style.top = "-62px"; //PC
                    document.querySelector('.aside').style.right = -45 + "px"; //置顶键
                } else { //向上
                    document.querySelector('.top_progress').style.top = "60px"; //进度条
                    document.querySelector('#top-menu').style.top = "0px"; //移动端
                    document.querySelector('.tabbed').style.top = 0;
                    document.querySelector('.aside').style.right = 5 + "px";
                }
                if (scrollTop < 250) {
                    document.querySelector('.top_progress').style.top = "60px"; //进度条
                    document.querySelector('#top-menu').style.top = "0px"; //移动端
                    document.querySelector('.aside').style.right = -45 + "px";
                    document.querySelector('.tabbed').style.top = 0;
                }
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            }
        }
    }()
//优化pc和移动端的代码，防止无效的执行
var width = document.documentElement.clientWidth

function addListSVg(params) {
    if (document.documentElement.clientWidth < 783) {
        // 添加svg——菜单是否展示
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute("id", "list")
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute("d", "M30 18h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM30 6.25h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2h28c1.1 0 2 0.9 2 2s-0.9 2-2 2zM2 25.75h28c1.1 0 2 0.9 2 2s-0.9 2-2 2h-28c-1.1 0-2-0.9-2-2s0.9-2 2-2z")
        svg.appendChild(path)
        document.body.appendChild(svg)
        svg.addEventListener('click', function (params) {
            if (document.querySelector('#side-nav').classList.contains('left')) {
                document.querySelector('#side-nav').classList.remove("left")
            } else {
                document.querySelector('#side-nav').classList.add("left")
            }
        })
    }
}
if (width < 783) {
    document.querySelector('#qq').href = "mqqwpa://im/chat?chat_type=wpa&uin=790430354&version=1&src_type=web&web_src=oicqzone.com"
    // 移动端菜单栏标题响应当前HTML的title
    document.querySelector('.top-title div').innerHTML = "Blue Blog"
    var str = [
        "网站首页",
        "精选美文",
        "名人名言",
        "个人感悟",
        "留言板",
        "分类",
        "标签",
        "存档",
        "搜索",
        "关于我/博客",
    ]
    var href = [
        "../../../../index0.html",
        "../../../../article",
        "../../../../sentence",
        "../../../../mysentence",
        "../../../../about/guestbook.html",
        "../../../../about/classification.html",
        "../../../../about/tags.html",
        "../../../../about/file.html",
        "../../../../about/search.html",
        "../../../../about",
    ] //展开的链接
    var ul = document.querySelector(".menu ul")
    for (let index = 0; index < 2; index++) {
        //由str的长度添加<li><a></a></li>
        //并设置文字  href
        var a = document.createElement("a");
        // a.innerHTML = str[index]
        // a.href = href[index]
        var li = document.createElement("li");
        li.appendChild(a)
        ul.appendChild(li)
    }
    var title_li = document.querySelectorAll(".menu ul li")
    for (let index = 0; index < title_li.length; index++) {
        var element = title_li[index].querySelector("a");
        element.innerHTML = str[index]
        element.href = href[index]
    }
    // 添加一个模糊层，防止菜单展开后，返回时点到其他链接
    if (container) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "cover");
        container.appendChild(canvas);
    }
    // 监听菜单键
    document.querySelector(".menubar").addEventListener("click", switchMenu) //switchMenu后面加（）会执行一次
    container.addEventListener("click", function () {
        if (container.classList.contains('page_inright')) {
            switchMenu();
        }
    });
    document.querySelector('#perspective').style.height = window.innerHeight + "px" //为模块设置高度为浏览器的高度
    // 手机端菜单键点击后执行的函数
    function switchMenu(params) {
        // alert("justifyContent: ")
        if (window.innerWidth < 783) { //宽度小于800才执行
            if (container.classList.contains('page_inright')) { //左侧菜单已经打开  切换至正常  open to close
                container.classList.remove("page_inright")
                document.querySelector(".menubar").classList.remove("arrow")
                document.querySelector("#top-menu").classList.remove("menu-inright")
                document.querySelector("#perspective").style.backgroundColor = "transparent"
                setTimeout(function (params) {
                    container.style.overflow = "visible"
                }, 800);
                document.querySelector(".menu").classList.remove("open")
                document.querySelector("#cover").style.display = "none" //调整点击面板
                document.querySelector(".aside").style.display = "block" //置顶栏优化
                if (document.querySelector("#list")) {
                    document.querySelector("#list").style.display = "block" //目录优化
                    document.querySelector("#side-nav").style.display = "block" //目录按钮优化
                }
            } else { //左侧菜单没有打开  点击打开菜单  close to open
                container.classList.add("page_inright")
                document.querySelector(".menubar").classList.add("arrow")
                document.querySelector("#top-menu").classList.add("menu-inright")
                document.querySelector("#perspective").style.backgroundColor = "cornflowerblue" //菜单栏背景颜色
                container.style.overflow = "hidden"
                document.querySelector(".menu").classList.add("open")
                document.querySelector("#cover").style.display = "none" //盖住点击面板
                document.querySelector(".aside").style.display = "none" //置顶栏优化

                if (document.querySelector("#list")) {
                    document.querySelector("#list").style.display = "none" //目录优化
                    document.querySelector("#side-nav").style.display = "none" //目录按钮优化
                }

            }
        }
    }
} else { //PC
    // 加载左上角句子的script 不用一个一个添加   一言API
    var secScript = document.createElement("script");
    secScript.setAttribute("type", "text/javascript");
    secScript.setAttribute("src", "https://v1.hitokoto.cn/?c=d&c=i&c=k&encode=js&select=%23hitokoto"); //一言c参数可以设置句子类型
    document.body.insertBefore(secScript, document.body.lastChild);
    //设置导航栏文字
    if (document.querySelectorAll(".tabbed ul li")) {
        var title_li = document.querySelectorAll(".tabbed ul li")
        title_li[title_li.length - 1].querySelector("a").innerHTML = "网站首页"
    }

    //关于的设置
    var li = document.createElement("li");
    var a = document.createElement("a");
    var ul2 = document.createElement("ul");
    a.href = "../../../../about" //链接
    a.innerHTML = "关于" //标题
    ul2.setAttribute("id", "ul_c")
    li.appendChild(a) //li里面的a
    var str = [
        "本站信息",
        "首个网站",
        "每日明记",
        "本站文档",
        "留言板"
    ]
    var href = [
        "../../../../about",
        "https://mdming.github.io",
        "../../../../diary",
        "../../../../about/docs.html",
        "../../../../about/guestbook.html"
    ] //展开的链接
    for (let index = 0; index < str.length; index++) {
        //由str的长度添加<li><a></a></li>
        //并设置文字  href
        var a = document.createElement("a");
        a.innerHTML = str[index]
        a.href = href[index]
        var li1 = document.createElement("li");
        li1.appendChild(a)
        ul2.appendChild(li1)
    }
    li.appendChild(ul2) //li里面有ul
    var ul = document.querySelector(".tabbed ul")
    ul.insertBefore(li, ul.childNodes[0]); //插入  关于li
    //查找文章  的设置
    ul.children[1].querySelector("a").textContent = "查找文章"
    ul.children[1].querySelector("a").href = "../../../../about/search.html"
    var article_li = ul.children[1]
    var ul2 = document.createElement("ul");
    ul2.setAttribute("id", "ul_c")
    var str = [
        "分类查找",
        "标签",
        "存档",
        "搜索"
    ]
    var href = [
        "../../../../about/classification.html",
        "../../../../about/tags.html",
        "../../../../about/file.html",
        "../../../../about/search.html#我的",
    ] //链接
    for (let index = 0; index < str.length; index++) {
        //由str的长度添加<li><a></a></li>
        //并设置文字  href
        var a = document.createElement("a");
        a.innerHTML = str[index]
        a.href = href[index]
        var li1 = document.createElement("li");
        li1.appendChild(a)
        ul2.appendChild(li1)
    }
    article_li.appendChild(ul2)
}
if (document.querySelector(".title h2")) { //通过是否有标题判断是否要添加
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var articles = JSON.parse(this.responseText).articles //例化
            // 顶部
            var card = document.createElement("div"),
                head = document.createElement("div");
            head.setAttribute("class", "h-htc")
            //   div.innerHTML="&lt;div></div>"
            var ul = document.createElement("ul")
            ul.setAttribute("class", "h-tablist-s")
            var str = ["站长推荐", "相关阅读", "随机阅读"]
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            for (let index = 0; index < str.length; index++) {
                var a = document.createElement("a");
                a.innerHTML = str[index]
                var li = document.createElement("li");
                if (index == 1) {
                    li.setAttribute("class", "active")
                }
                li.appendChild(a)
                ul.appendChild(li)
            }
            head.appendChild(ul)
            //底部列表
            var bottom = document.createElement("div")
            bottom.setAttribute("class", "b-htc")
            var ul = document.createElement("ul")
            for (let index = 0; index < 12; index++) {
                var a = document.createElement("a");
                var span = document.createElement("span");
                span.innerHTML = index + 1 //文章列表序号
                var li = document.createElement("li");
                li.appendChild(span)
                li.appendChild(a)
                ul.appendChild(li)
            }
            bottom.appendChild(ul)
            card.appendChild(head)
            card.appendChild(bottom)
            card.setAttribute("class", "bottom_card")
            var container = document.querySelector("#container")
            container.insertBefore(card, document.querySelector("#bottom_frame"));
            var list = document.querySelectorAll(".b-htc ul li")
            var text = new Array();
            var title = document.querySelector(".title h2").innerHTML
            var writer
            var tag = ""
            var time
            var classification
            var index_have = false //判断index.json中是否存在
            // 判断在json是否有对应的标题
            // 读取标题所对应的json的信息  将其序号加入text中
            for (let index = 0; index < articles.length; index++) {
                var element = articles[index];
                if (element.title == title) {
                    var classification = element.classification
                    writer = element.writer
                    tag = element.tag
                    time = element.time
                    text.push(index)
                    index_have = true
                }
            }
            if (index_have) { //index.json中存在
                // 1 !text.includes(index)用于防止有同一篇文章
                // 提取标题中有同样文字的文章序号
                if (text.length < list.length + 1) {
                    var title_word = title.split(""); //剪辑成数组
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                            if (element.title.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index)
                            }
                        }
                    }
                }
                // 提取同一个分类（classification）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.classification == classification && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个作者（writer）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.writer == writer && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个标签（tag）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.tag == tag && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }
                // 提取同一个同一年（time）的文章序号
                if (text.length < list.length + 1) {
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.time.substring(0, 4) == time.substring(0, 4) && text.length < list.length + 1 && !text.includes(index)) {
                            text.push(index)
                        }
                    }
                }

            } else { //index.json中不存在时
                // 提取标题中有同样文字的文章序号
                text.push("none")
                if (text.length < list.length + 1) {
                    var title_word = title.split(""); //剪辑成数组
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        for (let i = 0; i < title_word.length; i++) { //遍历是否有对应的字
                            if (element.title.includes(title_word[i]) && text.length < list.length + 1 && !text.includes(index)) {
                                text.push(index)
                            }
                        }
                    }
                }
            }
            // 如果数量不够，随机添加
            while (text.length < list.length + 1) {
                var random = Math.floor(Math.random() * articles.length)
                if (!text.includes(random)) {
                    text.push(random)
                }
            }
            // 使用text数组添加，title和href
            for (let index = 0; index < list.length; index++) {
                var element = list[index];
                element.querySelector("a").innerHTML = articles[text[index + 1]].title //index+1是因为第一个是当前的文章的序号
                element.querySelector("a").href = articles[text[index + 1]].url
            }

            // 添加监听ul
            document.querySelector(".h-tablist-s").addEventListener("click", function name(e) {
                for (let index = 0; index < this.childNodes.length; index++) { //清空.active
                    if (this.childNodes[index].classList.contains('active')) {
                        this.childNodes[index].classList.remove("active")
                    }
                }
                // 防止触发源的不理想（好像不存在）  添加active
                if (e.target.localName == "a") {
                    e.target.parentNode.classList.add("active")
                } //else if (e.target.localName == "li") {
                //   e.target.classList.add("active")
                //  }
                if (e.target.innerHTML == "站长推荐") { //点击站长推荐
                    var num = new Array
                    for (let index = 0; index < articles.length; index++) {
                        var element = articles[index];
                        if (element.recommend) { //优先显示json中recommend=true的文章
                            num.push(index)
                        }
                    }
                    // 防止数量不够，随机添加
                    while (num.length < list.length) {
                        var random = Math.floor(Math.random() * articles.length)
                        if (!num.includes(random)) {
                            num.push(random)
                        }
                    }
                    // 添加底部展示信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[num[index]].title
                        element.querySelector("a").href = articles[num[index]].url
                    }
                } else if (e.target.innerHTML == "相关阅读") { //点击相关阅读
                    // 利用数组text设置信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[text[index + 1]].title
                        element.querySelector("a").href = articles[text[index + 1]].url
                    }
                } else if (e.target.innerHTML == "随机阅读") { //点击随机阅读
                    var Random = new Array
                    // 获取随机序号且无重复
                    while (Random.length < list.length) {
                        var random = Math.floor(Math.random() * articles.length)
                        if (!Random.includes(random)) {
                            Random.push(random)
                        }
                    }
                    // 设置信息
                    for (let index = 0; index < list.length; index++) {
                        var element = list[index];
                        element.querySelector("a").innerHTML = articles[Random[index]].title
                        element.querySelector("a").href = articles[Random[index]].url
                    }
                }
            })
        }
    }
    xmlhttp.open("GET", "../../../../json/index.json", true);
    xmlhttp.send();
}

function addLeftList(params) {
    // 生成列表
    var contents = document.querySelectorAll(".contents")
    if (contents.length > 0) {
        var li = document.createElement("li")
        var ul = document.createElement("ul")
        var a = document.createElement("a")
        var container = document.querySelector('body');
        ul.id = "side-nav"
        li.appendChild(a)
        ul.appendChild(li)
        container.insertBefore(ul, container.lastChild);
        var id = ""

        for (let index = 0; index < contents.length; index++) { //生成侧边导航栏并设id、href
            var element = contents[index];
            var li = document.querySelector("#side-nav li").cloneNode(true) //克隆  true：子节点也克隆
            if (element.dataset.titleName != undefined) { //data-title-name 可以设置标题
                id = element.dataset.titleName
            } else {
                const l = 15
                if (element.children.length > 0) {
                    if (element.firstChild.innerHTML.replace(/\s+/g, "").length > l) {
                        //优化,字符串过长时截取前面的非空格字符
                        id = element.firstChild.innerHTML.replace(/\s+/g, "").substring(0, l)
                    } else {
                        id = element.firstChild.innerHTML
                    }
                } else {
                    if (element.innerHTML.replace(/\s+/g, "").length > l) { //优化
                        id = element.innerHTML.replace(/\s+/g, "").substring(0, l)
                    } else {
                        id = element.innerHTML
                    }
                }
            }
            li.firstChild.innerHTML = id
            li.firstChild.href = "#" + id
            element.setAttribute("id", id)
            ul.appendChild(li)
        }
        // 添加监听ul
        document.querySelector("#side-nav").addEventListener("click", function (e) {
            var t = this
            setTimeout(function () {
                for (let index = 0; index < t.childNodes.length; index++) { //清空.active
                    if (t.childNodes[index].classList.contains('active')) {
                        t.childNodes[index].classList.remove("active")
                    }
                }
                // 被点击后添加样式
                if (e.target.localName == "a") {
                    e.target.parentNode.classList.add("active")
                }
            }, 500);
        })
        window.addEventListener("scroll", function (e) { //监听滚动 便于active的响应
            // h获取被滚动的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window
                .pageYOffset;
            for (let index = 0; index < document.querySelectorAll(".contents").length; index++) { // 遍历标题
                var element = document.querySelectorAll(".contents")[index]
                //element.getBoundingClientRect().top);可以直接获取元素到浏览器顶部的距离
                if (element.getBoundingClientRect().top < 120) { //如果滚到对应位置 && d - scrollTop < 200
                    for (let index = 0; index < document.querySelector("#side-nav").childNodes
                        .length; index++) { //清空.active
                        if (document.querySelector("#side-nav").childNodes[index].classList.contains(
                                'active')) {
                            document.querySelector("#side-nav").childNodes[index].classList.remove("active")
                        }
                    }
                    document.querySelector("#side-nav").childNodes[index + 1].classList.add("active")
                }
            }
            // 目录栏响应
            if (scrollTop > 250 && width > 800) { //防止移动端出现
                document.querySelector('#side-nav').classList.add("left")
            } else {
                document.querySelector('#side-nav').classList.remove("left")
            }
        })
        addListSVg()
    }
}
if (document.querySelector("#word")) {
    addLeftList(); //添加目录
    // 添加来必力评论
    //添加html
    var main = document.querySelector("main"),
        h2 = document.createElement("h2"),
        div = document.createElement("div"),
        span = document.createElement("span");
    h2.innerText = "留言";
    span.innerText = "文明上网，理性发言";
    span.setAttribute('id', 'tips');
    h2.appendChild(span);
    div.setAttribute('id', 'lv-container');
    div.setAttribute('data-id', 'city');
    div.setAttribute('data-uid', 'MTAyMC80OTE3Mi8yNTY2Ng==');
    main.appendChild(h2);
    main.appendChild(div);
    //添加js
    (function (d, s) {
        var j, e = d.getElementsByTagName(s)[0];
        if (typeof LivereTower === 'function') {
            return;
        }
        j = d.createElement(s);
        j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
        j.async = true;
        e.parentNode.insertBefore(j, e);
    })(document, 'script');
}
//底部栏优化
if (document.querySelector('#busuanzi_container_site_uv')) {
    document.querySelector('#busuanzi_container_site_uv').innerHTML = document.querySelector('#busuanzi_container_site_uv').innerHTML.slice(0, -1)
}
//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?dfb2e9af2c4ea3536c96e73ddb3dc6b8";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
