import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

//all items of the user
export const getAllItems = async (_req, res) => {
  try {
    const inventoryItems = await knex("items")
    .where("active", true);

    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting fuzzy buddies: ${error}`);
  }
};

//singling out one item of the user
export const getOneItem = async (req, res) => {
  const { id } = req.params;

  try {
    const inventoryItem = await knex("items")
      // .select(
      //   "items.id",
      //   "items.brand",
      //   "items.citizenship",
      //   "items.type",
      //   "items.nickname",
      //   "items.size",
      //   "items.photo",
      //   "items.birthdate",
      //   "items.address",
      //   "items.serial_num",
      //   "items.active",

      //   "items.created_at",
      //   "items.updated_at"
      // )

      //this is the line that select the first item that matches the id
      .where("items.id", id)
      .first();

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found." });
    }

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(400).send(`Error getting inventory item: ${error}`);
  }
};

//post/add exisiting item
export const add = async (req, res) => {
  const {
    id,
    citizenship,
    brand,
    type,
    nickname,
    size,
    photo,
    birthdate,
    address,
    serial_num,
  } = req.body;

  //rmb to set auto id generator later
  if (
    !id ||
    !citizenship ||
    !brand ||
    !type ||
    !nickname ||
    !size ||
    !photo ||
    !birthdate ||
    !address ||
    !serial_num
  ) {
    return res.status(400).json({
      message: "☹️ Oh no, need more info",
    });
  }

  try {
    const result = await knex("items").insert({
      id: null,
      brand,
      citizenship,
      type,
      nickname,
      size,
      photo,
      birthdate,
      address,
      serial_num,
      active,
    });

    const [id] = result;
    const newRecord = await knex("items").where({ id }).first();

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({
      message: `Cannot be documented 😭: ${error}`,
    });
  }
};

//PUT/UPDATE existing item in the inventories table
export const edit = async (req, res) => {
  const { id } = req.params;
  const {
    citizenship,
    brand,
    photo,
    type,
    nickname,
    size,
    birthdate,
    address,
    serial_num
  } = req.body;

  if (
    !citizenship ||
    !brand ||
    !photo ||
    !type ||
    !nickname ||
    !size ||
    !birthdate ||
    !address ||
    !serial_num
  ) {
    return res.status(400).json({
      message: "☹️ Oh no, need more info",
    });
  }

  const item = await knex("items").where({ id }).first();

  if (!item) {
    return res.status(400).json({
      message: "Nothing was edited",
    });
  }

  try {
    const updatedItem = await knex("items")
      .where({ id: req.params.id })
      .update({
        citizenship,
        brand,
        type,
        nickname,
        size,
        photo,
        birthdate,
        address,
        serial_num
      });

    if (!updatedItem) {
      return res.status(404).json({
        message: `Could not find the fuzzy buddy: ${req.params.id}`,
      });
    }

    const newItem = await knex("items")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({
      message: `Error updating your fuzzy buddy: ${error}`,
    });
  }
};

//deleting an item
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCount = await knex("items").where({ id }).delete();

    if (deletedCount === 0) {
      return res.status(404).json({
        message: "Cannot find our fuzzy buddy",
      });
    }

    res.status(200).json({
      message: "Our sincere condolences 😢",
    });
  } catch (error) {
    console.error("Error deleting fuzzy buddy:", error);
    res.status(500).json({
      message: "Error deleting the fuzzy buddy",
    });
  }
};

//inactive items 
export const getAllInactive = async (_req, res) => {
  try {
    const inventoryItems = await knex("items")
    .where('active', false);

    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting all inactive fuzzy buddies: ${error}`);
  }
};

//deactivate 
export const deactivateItem = async (req, res) => {
  const id = req.params.id
  const item = await knex("items").where({ id }).first();

  if (!item) {
    return res.status(400).json({
      message: "Nothing was edited",
    });
  }

  try {
    const updatedItem = await knex("items")
      .where({ id: id})
      .update({
        active: false
      });

    if (!updatedItem) {
      return res.status(404).json({
        message: `Could not find the fuzzy buddy: ${req.params.id}`,
      });
    }

    const newItem = await knex("items")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({
      message: `Error updating your fuzzy buddy: ${error}`,
    });
  }
}

//SEARCH BY GIVEN STRING
export const search = async (_req, res) => {
  const s = _req.params.s;
  try {
    const inventoryItems = await knex("items")
      .select(
        "items.brand",
        "items.citizenship",
        "items.type",
        "items.nickname",
        "items.size",
        "items.photo",
        "items.birthdate",
        "items.address",
        "items.serial_num"
      )
      .whereILike("items.", `%${s}%`)
      .orWhereILike("items.brand", `%${s}%`)
      .orWhereILike("items.citizenship", `%${s}%`)
      .orWhereILike("items.type", `%${s}%`)
      .orWhereILike("items.nickname", `%${s}%`)
      .orWhereILike("items.serial_num", `%${s}%`)
      .orWhereILike("items.address", `%${s}%`);
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(400).send(`Error getting fuzzy buddy: ${error}`);
  }

  //allocating item to another table 
};
