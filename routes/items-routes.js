import express from "express";
const router = express.Router();
import {
  getAllItems,
  getOneItem,
  add,
  edit,
  deleteItem,
  search,
} from "../controllers/items-controller.js";

router.route('/')
    .get(getAllItems)
    .post(add)

router.route('/search/:s')
    .get(search)

router.route('')
    .get(getOneItem)
    .put(edit)
    .delete(deleteItem)

export default router;