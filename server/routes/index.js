import { Router } from "express";
var router = Router();

router.get("/", greet);
function greet(req, res) {
  res.send("Hello World");
}

export default router;
