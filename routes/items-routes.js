import express from "express";
const router = express.Router();
import {
  getAllItems,
  getAllInactive,
  getOneItem,
  add,
  edit,
  deleteItem,
  deactivateItem,
  search,
} from "../controllers/items-controller.js";

router.route('/')
    .get(getAllItems)

router.route('/inactive')
    .get(getAllInactive)

router.route('/inactive/:id')
    .post(deactivateItem)

router.route('/add')
    .post(add)

router.route('/search/:s')
    .get(search)

router.route('/:id')
    .get(getOneItem)
    .put(edit)
    .delete(deleteItem)

export default router;