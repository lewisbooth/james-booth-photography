const express = require("express")
const router = express.Router()
const pageController = require("../controllers/pageController")
const authController = require("../controllers/authController")
const imageController = require("../controllers/imageController")
const { catchErrors } = require("../helpers/errorHandlers")
const passport = require('passport')
const multer = require("multer")
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: "50MB",
    files: 1
  }
})

// NOTE: Use catchErrors() to wrap any async controller methods
// This will safely pass any errors on to a middleware handler

router.get("/",
  catchErrors(pageController.homepage)
)

router.get("/images",
  catchErrors(pageController.getImageList)
)

router.get("/checklogin",
  authController.checkLogin
)

router.get("/logout",
  authController.logout
)

// Authentication
router.post("/login",
  // Passport returns 401 automatically for bad login
  passport.authenticate('local'),
  (req, res) => {
    res.status(200)
    res.send()
  }
)

router.get(/admin/,
  authController.isLoggedIn
)

router.post(/admin/,
  authController.isLoggedIn
)

router.post("/admin/new",
  upload.single("file"),
  catchErrors(imageController.newPhoto)
)
router.post("/admin/edit/:id",
  catchErrors(imageController.editPhoto)
)
router.post("/admin/delete/:id",
  catchErrors(imageController.deletePhoto)
)
router.post("/admin/swap/:start/:finish",
  catchErrors(imageController.swapPosition)
)

module.exports = router