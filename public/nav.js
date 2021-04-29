/*
 *PC、移动端菜单栏的显示与事件绑定等
 */
function writePCNav() {
    document.write(" <div class='tabbed round'>");
    document.write("<a href=\"..\/..\/..\/..\/\" class=\"logo\">");
    document.write("    <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\">");
    document.write("    <span class=\"logo-text\">至简博客<\/span>");
    document.write("<\/a>");
    document.write("        <ul class=\"nav-list\">");
    document.write("            <li><a><\/a><\/li>");
    document.write("        <\/ul>");
    document.write("        <h1 class=\"t_nav\"><span id=\"hitokoto\">生如逆旅，一苇以航！<\/span><\/h1>");
    document.write(" <\/div");
}

function writeMobileTopBar() {
    document.write("<div id=\"top-menu\">");
    document.write("			<div class=\"menubar\">");
    document.write("				<svg>");
    document.write("					<path class=\"line--1\" d=\"M0 40h62c18 0 18-20-17 5L31 55\"><\/path>");
    document.write("					<path class=\"line--2\" d=\"M0 50h80\"><\/path>");
    document.write("					<path class=\"line--3\" d=\"M0 60h62c18 0 18 20-17-5L31 45\"><\/path>");
    document.write("				<\/svg>");
    document.write("			<\/div>");
    document.write("			<div class=\"top-title\">");
    document.write("				<div><a href=\"..\/..\/..\/..\/\" class=\"logo\"> <img src=\"https:\/\/s3.ax1x.com\/2020\/11\/18\/DneSpV.png\" class=\"logo-img\"><\/a><\/div>");
    document.write("			<\/div>");
    document.write("<a href=\"..\/..\/..\/..\/about\/search.html\"><span class=\"search-button\"><\/span><\/a>");
    document.write("		<\/div>");
}

function writeMobileNav() {
    document.write("<div class=\"nav-container\">");
    document.write("		<div class=\"mobile-navbar\">");
    document.write("			<ul>");
    document.write("				<li><a><\/a><\/li>");
    document.write("			<\/ul>");
    document.write("			<h1 class=\"t_nav\"><span id=\"hitokoto\">爱欲于人，犹如执炬，逆风而行，必有烧手之患<\/span><\/h1>");
    document.write("		<\/div>");
    document.write("<\/div>");
}

var width = document.documentElement.clientWidth;
var container = document.querySelector('#container');

function setNav() { //导航栏设置

    var str = [ //导航栏一级文字
        "首页",
        "知海拾贝",
        "我的原创",
        "查找文章",
        "关于",
        "发现更多"
    ]
    var href = [ //链接 
        "../../../../homePage.html",
        "javascript:void(0);",
        "javascript:void(0);",
        "javascript:void(0);",
        "javascript:void(0);",
        "javascript:void(0);"
    ]
    // 第2项二级标题
    var strList2 = [
        "经典文章",
        "技术文章",
        "美句收录"
    ]
    var hrefList2 = [ //链接
        "../../../../homePage.html#article",
        "../../../../homePage.html#knowledge",
        "../../../../sentence"
    ]
    // 第3项二级标题
    var strList3 = [
        "传统文章",
        "技术",
        "个人句子",
        "我的说说"
    ]
    var hrefList3 = [ //链接
        "../../../../homePage.html#myArticle",
        "../../../../homePage.html#myKnowledge",
        "../../../../mySentence",
        "../../../../about/saySomething.html"
    ]
    // 第4项二级标题
    var strList4 = [
        "分类查找",
        "标签",
        "存档",
        "搜索"
    ]
    var hrefList4 = [
        "../../../../about/classification.html",
        "../../../../about/tags.html",
        "../../../../about/file.html",
        "../../../../about/search.html#我的",
    ]
    // 第5项二级标题
    var strList5 = [
        "关于本站",
        "更新日志",
        "本站统计",
        "本站概述",
        "留言板"
    ]
    var hrefList5 = [
        "../../../../about",
        "../../../../about/timeline.html",
        "https://tongji.baidu.com/web/welcome/ico?s=dfb2e9af2c4ea3536c96e73ddb3dc6b8",
        "../../../../about/summary.html",
        "../../../../about/guestbook.html"
    ]
    // 第6项二级标题
    var strList6 = [
        "首个网站",
        "每日明记",
        "计时器"
    ]
    var hrefList6 = [
        "https://mdming.github.io",
        "../../../../diary",
        "../../../../tools/timer"
    ]

    if (width < 1200) { //移动端菜单栏
        writeMobileNav();
        writeMobileTopBar();
        // 监听菜单键
        document.querySelector(".menubar").addEventListener("click", // 手机端菜单键点击后执行的函数
            function () {
                if (document.querySelector(".menubar").classList.contains('arrow')) {
                    document.querySelector(".menubar").classList.remove("arrow");
                    document.querySelector(".nav-container").style.display = "none";
                } else {
                    document.querySelector(".menubar").classList.add("arrow");
                    document.querySelector(".nav-container").style.display = "block";
                }
            })

        while (document.querySelectorAll(".mobile-navbar ul li").length < str.length) { //li的数量为6
            var last = document.querySelectorAll(".mobile-navbar ul li")[0].cloneNode(true);
            document.querySelector(".mobile-navbar ul").appendChild(last);
        }

        var mobileNavbar = document.querySelectorAll(".mobile-navbar ul li")
        for (let index = 0; index < mobileNavbar.length; index++) {
            //为每个li设置文字与链接
            const element = mobileNavbar[index];
            element.querySelector("a").innerHTML = str[index]
            element.querySelector("a").href = href[index]
        }

        // 第2个的展开页
        var ul = document.querySelector(".mobile-navbar ul")
        var article_li = ul.children[1]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        for (let index = 0; index < strList2.length; index++) {
            //由str的长度添加<li><a></a></li>
            //并设置文字  href
            var a = document.createElement("a");
            a.innerHTML = strList2[index]
            a.href = hrefList2[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第3个的展开页
        var article_li = ul.children[2]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        for (let index = 0; index < hrefList3.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList3[index]
            a.href = hrefList3[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第4个的展开页
        var article_li = ul.children[3]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        for (let index = 0; index < strList4.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList4[index]
            a.href = hrefList4[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第5个的展开页
        var article_li = ul.children[4]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        for (let index = 0; index < strList5.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList5[index]
            a.href = hrefList5[index]
            if (strList5[index] == "本站统计") {
                a.target = "_blank";
            }
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第6个的展开页
        var article_li = ul.children[5]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "second-menu")
        for (let index = 0; index < strList6.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList6[index]
            a.href = hrefList6[index]
            a.target = "_blank"; //新页面
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        //移动端一级菜单点击展开二级菜单
        window.onload = function (params) {
            var navButton = document.querySelectorAll('.mobile-navbar li');
            for (let index = 1; index < navButton.length; index++) {
                const element = navButton[index];
                element.addEventListener("click", function (e) {
                    if (this.classList.contains('second-menu-open') == true) { //如果已经展开
                        this.classList.remove("second-menu-open") //关闭
                    } else { //如果没展开
                        this.classList.add("second-menu-open") //展开点击的地方
                    }
                    for (var j = 1; j < navButton.length; j++) { //把其他的关闭
                        if (navButton[j] != this) {
                            navButton[j].classList.remove("second-menu-open")
                        }
                    }
                })

            }
        }
    } else { //PC端导航栏

        //设置导航栏文字
        writePCNav();

        var href = [ //链接重新设置 
            "../../../../homePage.html",
            "javascript:void(0);",
            "javascript:void(0);",
            "../../../../about/search.html",
            "../../../../about",
            "javascript:void(0);"
        ]

        while (document.querySelectorAll(".tabbed ul li").length < str.length) { //li的数量为6
            var last = document.querySelectorAll(".tabbed ul li")[0].cloneNode(true);
            document.querySelector(".tabbed ul").appendChild(last);
        }

        var tabbed = document.querySelectorAll(".tabbed ul li")
        for (let index = 0; index < tabbed.length; index++) {
            //为每个li设置文字与链接
            const element = tabbed[index];
            element.querySelector("a").innerHTML = str[index]
            element.querySelector("a").href = href[index]
        }

        // 第2个的展开页
        var ul = document.querySelector(".tabbed ul")
        var article_li = ul.children[1]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        for (let index = 0; index < strList2.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList2[index]
            a.href = hrefList2[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第3个的展开页
        var article_li = ul.children[2]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        for (let index = 0; index < strList3.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList3[index]
            a.href = hrefList3[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第4个的展开页
        var article_li = ul.children[3]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        for (let index = 0; index < strList4.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList4[index]
            a.href = hrefList4[index]
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第5个的展开页
        var article_li = ul.children[4]
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        for (let index = 0; index < strList5.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList5[index]
            a.href = hrefList5[index]
            if (str[index] == "本站统计") {
                a.target = "_blank";
            }
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        // 第6个的展开页
        var article_li = ul.children[5]
        //article_li.classList.add("li-list")
        var ul2 = document.createElement("ul");
        ul2.setAttribute("class", "ul_c")
        for (let index = 0; index < strList6.length; index++) {
            var a = document.createElement("a");
            a.innerHTML = strList6[index]
            a.href = hrefList6[index]
            a.target = "_blank"; //新页面
            var li1 = document.createElement("li");
            li1.appendChild(a)
            ul2.appendChild(li1)
        }
        article_li.appendChild(ul2)

        window.addEventListener("scroll", function (e) { //pc导航栏背景
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
            const tabbed = document.querySelector('.tabbed');
            if (tabbed) { // 目录栏响应
                if (scrollTop > 100) { //防止移动端出现
                    tabbed.classList.add("tabbed-bg")
                } else {
                    tabbed.classList.remove("tabbed-bg")
                }
            }

        })
    }
};

setNav();