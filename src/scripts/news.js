import comp from "./components"
import API from "./apiData"


const buildNews = {
  printNews(newsObj) {

    const news = new comp.section ({className: "news", id: `${newsObj.id}`},
    new comp.anchor({href: `${newsObj.url}`, target: "_blank"},  new comp.image({src: `${newsObj.articleImage}`, alt: "Article Image", height: "120", width: "120"})),
    new comp.title("h2", {}, `${newsObj.articleName}`),
    new comp.title("h4", {}, `Saved by: ${newsObj.user.firstName} | Date Saved: ${newsObj.dateSaved}`),
    new comp.title("h1", {}, newsObj.about)).render(".container--inner")
  },

  newsMap ()  {
    document.querySelector(".container--inner").innerHTML = ""
    API.getAllCategory("articles/?_expand=user&_sort=dateSaved&_order=desc")
    .then(newsObj => newsObj.forEach(news => {
      console.log(news);
      this.printNews(news)}))
      .then(() => this.newNews())

  },

  newNews () {
    const newNews = new comp.section ({className: "new--news"},
    new comp.title ("h1", {}, "Save News Article"),
    new comp.form(
      new comp.label({for: "articleName"}, "Article Name"),
      new comp.input({name: "articleName", placeholder: "Article Name", id: "articleName" }),
      new comp.label({for: "articleUrl"}, "Article Link"),
      new comp.input({name: "articleUrl", placeholder: "Article Link", id: "articleLink"}),
      new comp.label({for: "articleImageUrl"}, "Article Image Link"),
      new comp.input({name: "articleImageUrl", placeholder: "Article Image Link", id: "articleImage"}),
      new comp.label({for: "articleDescription"}, "Article Description"),
      new comp.input({name: "articleDescription", placeholder: "Article Description", id: "articleDescription"}),
      new comp.btn("Save New Article")
    ),
    ).render(".container--inner")

    document.querySelector("button").addEventListener("click", ()=>{
      let story = {
        articleName: document.querySelector("#articleName").value,
        url: document.querySelector("#articleLink").value,
        articleImage: document.querySelector("#articleImage").value,
        about: document.querySelector("#articleDescription").value,
        /*
        NEED TO UPDATE USER ID TO SAVE SESSION ASSIGNED ID
        */
        userId: 2,
        dateSaved: new Date()
      }
      buildNews.addNews(story)
    })
  },

  addNews(story){
    API.saveItem("articles", story).then(()=> this.newsMap())
  }

};


export default buildNews