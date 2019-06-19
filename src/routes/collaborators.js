const express = require("express");
const router = express.Router();
const validation = require("./validation");
const collaboratorController = require("../controllers/collaboratorController");


router.get("/wikis/:wikiId/collaborators", collaboratorController.index);
// router.post("/wikis/:wikiId/collaborators/new", collaboratorController.new);
// router.post("/wikis/:wikiId/collaborators/:id", collaboratorController.show);
// console.log('My Collaborator', collaboratorController.index );


module.exports = router;
