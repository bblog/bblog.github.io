//首页显示文章列表的js文件、文章列表包括原创文章、原创技术文章、转载文章、转载技术文章、全部文章五种 
/*
    *加载主页和sentence的内容AJAX　　
    * 即异步加载json的数据到HTMl中
    *json数据将会随页码变化  网页不跳转
    *<li>将在HTML中设置  这里不再设置  要十个
    *文件只有一个函数
    调用方法：
    *调用函数：getArticleData(file_name)
    *参数：file_name为json文件名（带json后缀）
    
    更多：
    *卡片数量可以动态更改：
    *修改per_page_amount即可
 */
function getArticleData(file_name) { //file_name为要加载的json文件名  需要在相应的HTML中调用
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var articles = JSON.parse(this.responseText).articles //例化
            var per_page_amount = 10 //决定每页卡片数量  可以调整
            var nth_page = 0 //第几页  
            document.querySelector(".pagination").addEventListener("click", function (e) { //监听页码点击事件 确定在第几页为nth_page赋值
                for (let index = 0; index < document.querySelectorAll('.pagination li').length; index++) {
                    document.querySelectorAll(".pagination li")[index].classList.remove("active") //清除之前就存在的active
                    if (document.querySelectorAll(".pagination li")[index] == e.target.parentElement || document.querySelectorAll(".pagination li")[index] == e.target.parentElement.parentElement) {
                        // 确定触发源
                        if (index == 0) { //到首页
                            nth_page = 0
                        } else if (index == document.querySelectorAll('.pagination li').length - 1) { //到有页码的页
                            nth_page = document.querySelectorAll('.pagination li').length - 3
                        } else { //到末页
                            nth_page = index - 1
                        }
                    }
                }
                document.querySelectorAll(".pagination li")[nth_page + 1].classList.add("active") //显示是第几页
                setCardHTML(nth_page); //设置对应的HTML
            })
            // ==================HTML的设置函数
            var top = new Array; //存储top的序号
            var art = new Array; //存储没有top的所有序号
            var i, //json中的序号
                art_index; //art数组的序号
            var randomPictureApi = [
                "http://api.mtyqx.cn/api/random.php",
                "http://www.dmoe.cc/random.php",
                "https://api.ixiaowai.cn/api/api.php",
                "https://bing.ioliu.cn/v1/rand?w=1920&h=1200",
                "https://bing.ioliu.cn/v1/rand?w=600&h=800"

            ]
            // var date=new Date;
            // var currentDate=date.toLocaleDateString().match(/\d+/g).join("");//当前日期的字符串


            for (let index = 0; index < articles.length; index++) {
                if (articles[index].top == true) { //用数组来分类  取序号
                    top.push(index)
                } else {
                    art.push(index)
                }
            }

            function setCardHTML(nth_page) { //每次点击页码就执行，更新内容
                if (nth_page == 0) {
                    art_index = art.length - per_page_amount * nth_page; //
                } else {
                    art_index = art.length - per_page_amount * nth_page + top.length; //第二页开始的art数组的索引
                }
                var articlesHTML = document.querySelectorAll("#article_ul li") //卡片
                //nth_card是json中的序号
                for (let index = 0; index < articlesHTML.length; index++) { //遍历一页的卡片
                    const element = articlesHTML[index];
                    if (art_index > 0) { //还存在json对象数据
                        if (index < top.length && nth_page == 0) { //第一页显示置顶的文章
                            i = top[index]
                            // 设置置顶项的值
                            element.querySelector("span a").href = articles[i].url //图片的目的链接
                            element.querySelector("span a img").src = articles[i].img_url //图片链接src用于图片显示
                            element.querySelector(".blogtitle a").innerHTML = "【置顶】" + articles[i].title //标题
                            element.querySelector(".blogtitle a").href = articles[i].url //标题的目的链接
                            element.querySelector(".bloginfo p").innerHTML = articles[i].introduction //文章简介
                            element.querySelector(".lm a").innerHTML = articles[i].tag //标签
                            element.querySelector(".lm a").href = '../../../../about/search.html' + '#' + articles[i].tag
                            element.querySelector(".dtime a").innerHTML = articles[i].time //发表时间
                            element.querySelector(".dtime a").href = '../../../../about/search.html' + '#' + articles[i].time
                            element.querySelector(".writer a").innerHTML = articles[i].writer //作者
                            element.querySelector(".writer a").href = '../../../../about/search.html' + '#' + articles[i].writer
                        } else { //非置顶的文章
                            art_index--;
                            i = art[art_index] //取数组的值
                            // 设置未置顶项的值
                            element.querySelector("span a").href = articles[i].url //图片的目的链接
                            element.querySelector("span a img").src = articles[i].img_url //图片链接src用于图片显示
                            element.querySelector(".blogtitle a").innerHTML = articles[i].title //标题
                            element.querySelector(".blogtitle a").href = articles[i].url //标题的目的链接
                            element.querySelector(".bloginfo p").innerHTML = articles[i].introduction //文章简介
                            element.querySelector(".lm a").innerHTML = articles[i].tag //标签
                            element.querySelector(".lm a").href = '../../../../about/search.html' + '#' + articles[i].tag
                            element.querySelector(".dtime a").innerHTML = articles[i].time //发表时间
                            element.querySelector(".dtime a").href = '../../../../about/search.html' + '#' + articles[i].time
                            element.querySelector(".writer a").innerHTML = articles[i].writer //作者
                            element.querySelector(".writer a").href = '../../../../about/search.html' + '#' + articles[i].writer
                        }
                    } else { //无数据，加载默认内容
                        element.querySelector("span a img").src = randomPictureApi[Math.floor(Math.random() * randomPictureApi.length)]
                        // 图片采用API 图片动态更新
                        element.querySelector(".blogtitle a").innerHTML = "没有更多文章了！^o^"
                        element.querySelector(".bloginfo p").innerHTML = "欢迎来到至简博客，至简是少即是多的意思，简简单单、更少很多时候才会获得更多。"
                        element.querySelector(".lm a").innerHTML = "demo"
                        element.querySelector(".dtime a").innerHTML = "2012-12-12"
                        element.querySelector(".writer a").innerHTML = "佚名"
                    }
                }
            }
            setCardHTML(0); //未点击前自动加载第一页
        }

    }
    xmlhttp.open("GET", file_name, true);
    xmlhttp.send();
}

//文章列表上面的按钮显示效果、点击哪个就active哪个
const topItems = document.querySelectorAll(".top-items li");
if (document.querySelector(".top-items")) {
    document.querySelector(".top-items").addEventListener("click", function (e) {
        for (let index = 0; index < topItems.length; index++) {
            const element = topItems[index];
            element.classList.remove("active")
        }
        e.target.classList.add("active")
    });
}

//根据跳转时的锚点来响应展示的内容
var target = decodeURI(document.location.hash.substring(1));
if (target == "article") {
    getArticleData("json/article.json"); //展示把他的文章
    topItems[1].classList.add("active"); //按钮添加active
    document.documentElement.scrollTop = window.innerHeight - 60 //直接滚到下面
} else if (target == "knowledge") {
    getArticleData("json/knowledge.json");
    topItems[2].classList.add("active");
    document.documentElement.scrollTop = window.innerHeight - 60
} else if (target == "myArticle") {
    getArticleData("json/myArticle.json");
    topItems[3].classList.add("active");
    document.documentElement.scrollTop = window.innerHeight - 60
} else if (target == "myKnowledge") {
    getArticleData("json/myKnowledge.json");
    topItems[4].classList.add("active");
    document.documentElement.scrollTop = window.innerHeight - 60
} else {
    getArticleData("json/index.json");
    topItems[0].classList.add("active");
}
//pc菜单点击 响应
const reprint = document.querySelector(".nav-list")
if (reprint) {
    reprint.addEventListener("click", function (e) {
        var target = e.target.textContent
        for (let index = 0; index < topItems.length; index++) {
            const element = topItems[index];
            element.classList.remove("active")
        }
        if (target == "经典文章") {
            getArticleData("json/article.json");
            topItems[1].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight - 60
        } else if (target == "技术文章") {
            getArticleData("json/knowledge.json");
            topItems[2].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight - 60
        } else if (target == "个人经典文章") {
            getArticleData("json/myArticle.json");
            topItems[3].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight - 60
        } else if (target == "原创技术文章") {
            getArticleData("json/myKnowledge.json");
            topItems[4].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight - 60
        } else {
            getArticleData("json/index.json");
            topItems[0].classList.add("active");
        }
    });
}

//移动端菜单点击 响应
const mobileNav = document.querySelector(".mobile-navbar")
if (mobileNav) {
    mobileNav.addEventListener("click", function (e) {
        var target = e.target.textContent
        for (let index = 0; index < topItems.length; index++) {
            const element = topItems[index];
            element.classList.remove("active")
        }
        if (target == "经典文章") {
            getArticleData("json/article.json");
            topItems[1].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight
        } else if (target == "技术文章") {
            getArticleData("json/knowledge.json");
            topItems[2].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight
        } else if (target == "个人经典文章") {
            getArticleData("json/myArticle.json");
            topItems[3].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight
        } else if (target == "原创技术文章") {
            getArticleData("json/myKnowledge.json");
            topItems[4].classList.add("active");
            document.documentElement.scrollTop = window.innerHeight
        } else {
            getArticleData("json/index.json");
            topItems[0].classList.add("active");
        }
        if (target == "经典文章" || target == "技术文章" || target == "个人经典文章" || target == "原创技术文章") {
            if (document.querySelector(".menubar").classList.contains('arrow')) {
                document.querySelector(".menubar").classList.remove("arrow");
                document.querySelector(".nav-container").style.display = "none";
            } else {
                document.querySelector(".menubar").classList.add("arrow");
                document.querySelector(".nav-container").style.display = "block";
            }
        }
    });
}

document.querySelector(".top_svg").style.height = window.innerHeight + "px";
document.querySelector("#headerDown").addEventListener("click", function (e) {
    document.documentElement.scrollTop = window.innerHeight - 60
})