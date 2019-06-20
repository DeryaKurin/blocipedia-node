const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const collaboratorController = require("../controllers/collaboratorController");

const validation = require("./validation");

const helper = require("../auth/helpers");


router.get("/wikis", wikiController.index);

router.get("/wikis/new", wikiController.new);

router.post("/wikis/create", validation.validateWikis, wikiController.create);

router.get("/wikis/:id", wikiController.show);

router.post("/wikis/:id/destroy", wikiController.destroy);

router.get("/wikis/:id/edit", wikiController.edit);

router.post("/wikis/:id/update", wikiController.update);

router.get("/wikis/:id/collaborators", wikiController.getCollaborators);

router.post("/wikis/:id/collaborators/create", wikiController.addCollaborator);

router.post("/wikis/:id/collaborators/destroy", wikiController.removeCollaborator);



module.exports = router;
