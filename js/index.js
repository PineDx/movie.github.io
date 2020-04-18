!(function () {
  getjson("get", "./json/imdb.json");

  function getjson(type, url) {
    const request = new XMLHttpRequest();
    request.open(type, url);
    request.send(null);
    request.onload = function () {
      if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        var movielist = "";
        for (let i = 0; i < json.group.length; i++) {
          let title = json.group[i].title;
          let filelink = json.group[i].filelink;
          let newlist = `<li>
            <span>${title}</span>
            <div class="btn">
              <span downlink="${filelink}">复制</span>
            </div>
          </li>`;
          movielist += newlist;
        }
        document.querySelector(".movielist").innerHTML = movielist;
        let btns = document.querySelectorAll(".btn");
        btns.forEach((btn) => {
          btn.addEventListener("click", function () {
            let filelink = this.querySelector("span").attributes[0].value;
            var textArea = document.createElement("textarea");
            //设置属性
            textArea.style.position = "fixed";
            textArea.style.top = 0;
            textArea.style.left = 0;
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = 0;
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.value = filelink;
            //添加到页面body
            document.body.appendChild(textArea);
            textArea.select();
            //执行
            document.execCommand("copy");
            this.style.background = "#1dd1a1";
            //移除对象
            document.body.removeChild(textArea);
          });
        });
      }
    };
  }
  let navs = document.querySelectorAll("#nav");
  navs.forEach((nav)=>{
    nav.addEventListener("click", function () {
        let url = this.querySelector("span").attributes[0].value;
        getjson("get", url);
    });
  });
})();
