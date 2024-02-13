const usersController = require("../controllers/auth/users");

router.post("/auth/create-user", usersController.createUser);
