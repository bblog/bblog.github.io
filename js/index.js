    //============================= 加载主页和sentence的内容AJAX　　
    // 即异步加载ｊｓｏｎ的数据到HTMl中
    //json数据将会随页码变化  网页不跳转
    // <li>将在HTML中设置  这里不再设置  要十个
    function getArticleData(file_name) { //file_name为要加载的json文件名  需要在相应的HTML中调用
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var articles = JSON.parse(this.responseText).articles //例化
                var per_page_amount = 10 //决定每页卡片数量  可以调整
                var nth_page = 0 //第几页  
                setCardHTML(0);
                document.querySelector(".pagination").addEventListener("click", function (e) { //监听页码
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
                function setCardHTML(nth_page) {
                    var start_card = articles.length - 1 - per_page_amount * nth_page //该页起始的序号
                    var articlesHTML = document.querySelectorAll("#article_ul li") //
                    for (let nth_card = start_card; nth_card > start_card - per_page_amount; nth_card--) { //遍历所有的s十个json对象
                        //nth_card是json中的序号
                        var nth_li = start_card - nth_card //nth_li是HTML里的序号
                        if (nth_card >= 0) { //还存在json对象数据
                            articlesHTML[nth_li].querySelector("span a").href = articles[nth_card].url //图片的目的链接
                            articlesHTML[nth_li].querySelector("span a img").src = articles[nth_card].img_url //图片链接src用于图片显示
                            articlesHTML[nth_li].querySelector(".blogtitle a").innerHTML = articles[nth_card].title //标题
                            articlesHTML[nth_li].querySelector(".blogtitle a").href = articles[nth_card].url //标题的目的链接
                            articlesHTML[nth_li].querySelector(".bloginfo p").innerHTML = articles[nth_card].introduction //文章简介
                            articlesHTML[nth_li].querySelector(".classname").innerHTML = articles[nth_card].tag //标签
                            articlesHTML[nth_li].querySelector(".dtime").innerHTML = articles[nth_card].time //发表时间
                            articlesHTML[nth_li].querySelector(".writer").innerHTML = articles[nth_card].writer //作者
                        } else { //无数据，加载默认内容
                            articlesHTML[nth_li].querySelector("span a img").src = "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
                            // 图片采用必应API 图片动态更新
                            // 延时几毫秒使图片不同？  待实现
                            articlesHTML[nth_li].querySelector(".blogtitle a").innerHTML = "敬请期待！"
                            articlesHTML[nth_li].querySelector(".bloginfo p").innerHTML = "敬请期待！"
                            articlesHTML[nth_li].querySelector(".classname").innerHTML = "暂无"
                            articlesHTML[nth_li].querySelector(".dtime").innerHTML = "2012-12-12"
                            articlesHTML[nth_li].querySelector(".writer").innerHTML = "无"
                        }
                    }
                }
            }
        }
        xmlhttp.open("GET", file_name, true);
        xmlhttp.send();
    }