import comp from "./components"
import logInFuncs from "./login"
import buildMessages from "./messages";
import buildNews from "./news";
import buildMissionControl from "./missionControl";
import buildTasks from "./tasks"


const navBar = {
  loadNavBar() {
    new comp.ul(
      {},
      new comp.li({}, "Home"),
      new comp.li({}, "Tasks"),
      new comp.li({}, "Events"),
      new comp.li({}, "Messages"),
      new comp.li({}, "News"),
      new comp.li({}, "Friends"),
      new comp.li({}, "Log Out")
    ).render("#navBar")

    document.querySelector("#navBar").addEventListener("click", (event) => {
      if (event.target.textContent === "Home") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
          buildMissionControl.printPlaceholder();
        }
      } else if (event.target.textContent == "Tasks") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
          buildTasks.buildContainers();
        }
      } else if (event.target.textContent == "Events") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
        console.log("Events function called.")
        }
      } else if (event.target.textContent == "Messages") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
        buildMessages.messageMap();
        }
      } else if (event.target.textContent == "News") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
        buildNews.newsMap();
        }
      } else if (event.target.textContent == "Friends") {
        if (sessionStorage.getItem("currentUser") === null){
          console.log("Not logged in.");
          logInFuncs.loadLogIn();
        } else {
        console.log("Friends function calles.")
        }
      } else if (event.target.textContent == "Log Out") {
        console.log("Log Out function called.");
        sessionStorage.removeItem("currentUser");
        logInFuncs.loadLogIn()
      }
    })
  }

}

export default navBar