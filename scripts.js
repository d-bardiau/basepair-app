function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(function () {
  feather.replace();
});

const userObj = {
  "employee@uni-muenster.de": {
    name: "Max Mustermann",
    status: "Mitarbeiter",
    matrNo: "476890",
    imageName: "employee.png"
  },
  "student@uni-muenster.de": {
    name: "Louisa Musterfrau",
    status: "Studierende",
    matrNo: "387462",
    imageName: "student.png"
  },
  "student2@uni-muenster.de": {
    name: "Friedrich Frohsinn",
    status: "Studierender",
    matrNo: "682917",
    imageName: "student2.png"
  },
  "student3@uni-muenster.de": {
    name: "Franziska Bauer-Müller",
    status: "Studierende",
    matrNo: "434928",
    imageName: "student3.png"
  },
  "guest@uni-muenster.de": {
    name: "Gustav Gebauer",
    status: "Gast",
    matrNo: "387462",
    imageName: "guest.png"
  }
};

function appScope() {
  return {
    isLoggedIn: false,
    isInstitutionSelected: false,
    loginEmail: "student@uni-muenster.de",
    loginPassword: "",
    isPinpadVisible: false,
    submitLogin: function () {
      if (this.loginEmail && userObj[this.loginEmail]) {
        this.user = userObj[this.loginEmail];
        this.isLoggedIn = true;
        this.drawId(this.user.name, this.user.matrNo, this.user.imageName);
      }
    },
    logout: function () {
      this.isLoggedIn = false;
      this.isInstitutionSelected = false;
      this.loginPassword = "";
      this.user = undefined;
      this.isSideMenuActive = false;
      this.isPopupVisible = false;
      this.isPinpadVisible = false;
      this.activeTabName = "ID";
    },
    user: undefined,
    getUserName: function () {
      return (this.user && this.user.name) || "";
    },
    getUserStatus: function () {
      return (this.user && this.user.status) || "";
    },
    getIsUserStudent: function () {
      return (
        this.user &&
        (this.user.status === "Studierender" ||
          this.user.status === "Studierende")
      );
    },
    getUserImagePath() {
      if (!this.user) {
        return "";
      }
      return "images/" + this.user.imageName;
    },
    selectInstitution: function () {
      this.isInstitutionSelected = true;
    },
    isSideMenuActive: false,
    openSideMenu() {
      this.isSideMenuActive = true;
      this.isPopupVisible = false;
      this.isPinpadVisible = false;
    },
    closeSideMenu() {
      this.isSideMenuActive = false;
    },

    activeTabName: "printer",
    setActiveTabNameTo(newName) {
      this.isPopupVisible = false;
      this.isPinpadVisible = false;
      this.isSideMenuActive = false;
      if (this.activeTabName === newName) {
        //this.activeTabName = "info";
        return;
      }
      this.activeTabName = newName;
    },
    getIsActiveTabName(tabName) {
      if (typeof tabName === "object") {
        return tabName.includes(this.activeTabName);
      }
      return tabName === this.activeTabName;
    },

    isPopupVisible: false,
    handleQrCodeClick: function () {
      this.isPinpadVisible = true;
      this.isPopupVisible = false;
    },
    handlePopupClick: function () {
      this.isPopupVisible = false;
    },
    handlePaymentSubmitClick: function () {
      this.isPinpadVisible = false;
      this.isPopupVisible = true;
    },

    toggleStudentIdMax: function () {
      this.isStudentIdMaxed = !this.isStudentIdMaxed;
      this.isStudentTicketMaxed = false;
    },
    isStudentIdMaxed: false,
    toggleStudentTicketMax: function () {
      this.isStudentTicketMaxed = !this.isStudentTicketMaxed;
      this.isStudentIdMaxed = false;
    },
    isStudentTicketMaxed: false,

    itemRange: [1, 2, 3, 4, 5],

    drawId: function (name, matr, imageName) {
      if (!name || !matr) {
        return;
      }
      var canvas = this.$refs.idCanvas;
      var context = canvas.getContext("2d");
      var imageObj = new Image();
      imageObj.setAttribute("crossOrigin", "anonymous");
      imageObj.src = "images/studierendenkarte.png";
      imageObj.setAttribute("crossOrigin", "anonymous");
      var faceObj = new Image();
      faceObj.src = "images/" + imageName;
      let imagesLoadCounter = 0;
      function onLoad() {
        if (imagesLoadCounter < 0) {
          imagesLoadCounter += 1;
          return;
        }
        drawImages();
      }
      imageObj.addEventListener("load", onLoad);
      faceObj.addEventListener("load", onLoad);
      function drawImages() {
        context.drawImage(imageObj, 0, 0);
        //context.drawImage(faceObj, 216, 25, 63, 82);
        var scale = Math.min(63 / faceObj.width, 82 / faceObj.height);
        context.drawImage(
          faceObj,
          216,
          25,
          faceObj.width * scale,
          faceObj.width * scale
        );
        window.faceObj = faceObj;
        context.font = "12px Calibri";
        context.fillStyle = "black";
        context.fillText(name, 7, 128);
        context.fillText("gültig bis", 248, 128);
        context.fillText("Matr. Nr. " + matr, 7, 144);
        context.fillText("09.23", 248, 144);
        var dataURL = canvas.toDataURL();
        console.log(dataURL);
      }
    }
  };
}
