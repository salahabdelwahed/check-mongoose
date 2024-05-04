console.clear();
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

//midellware
app.use(express.json());
//

//connection DB
mongoose
  .connect("mongodb://localhost:27017/contact")
  .then(() => console.log("DB connceted"))
  .catch(() => console.log("DB not conncted", err));
//end

//crud

//get method
app.get("/", async (req, res) => {
  try {
    const allData = await contact.find();
    res.status(200).send({ msg: "allData", allData });
  } catch (error) {
    res.status(500).send({ msg: "invalid", error });
  }
});

// get person age>18
app.get("/person", async (req, res) => {
    try {
        const contactOne = await contact.find({age: {$gt: req.body.age}});
        // const filterContacts = await contactOne.filter(item=> item.age > parseInt(req.body.age));
        res.status(200).send({msg:`all contact greate than ${req.body.age} it's :`,contactOne})
    } catch (error) {
        res.status(500).send({ msg: "invalid", error });
    }
})
//end
//post method
app.post("/user", (req, res) => {
  try {
    const newContactList = new contact(req.body);
    newContactList.save();
    res
      .status(200)
      .send({ msg: "new contact added succsefully", newContactList });
  } catch (error) {
    res.status(500).send({ msg: "invalid", error });
  }
});
//end

//update method

app.put -
  ("/:id",
  async (req, res) => {
    try {
      const updateContact = await contact.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      const getContactupdate = await contact.findById({ _id: req.params.id });
      updateContact.modifiedCount
        ? res
            .status(200)
            .send({ msg: "contact updated succsefully", getContactupdate })
        : res.status(200).send({ msg: "contact  already updated" });
    } catch (error) {
      res.status(500).send({ msg: "invalid", error });
    }
  });
//end

//delete method
app.delete("/:id", async (req, res) => {
  try {
    const contactDel = await contact.deleteOne({ _id: req.params.id });
    res.status(200).send({ msg: "contact deleted succsefully", contactDel });
  } catch (error) {
    res.status(500).send({ msg: "invalid", error });
  }
});
//end

//end
app.listen(port, (err) => {
  if (err) throw console.log("error server", err);
  console.log(`Server running on http://localhost: ${port}`);
});
