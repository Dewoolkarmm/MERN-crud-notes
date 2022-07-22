const noteModel = require("../models/noteModel");

const CreateNote = async (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !description) {
    return res.status(422).json({ message: "Please Enter the data" });
  }
  try {
    const note = new noteModel({
      title: title,
      description: description,
      userId: req.userId,
    });
    await note.save();
    res.status(201).json({ message: "Note created successfully..." });
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Error Occured.." });
  }
};

const ViewAlllNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId });
    if (!notes) {
      return res.status(422).json({ message: "NO notes are available.." });
    }
    res.status(201).json(notes);
  } catch (error) {
    console.log(error);
    res.status(422).json({ message: "Error Occured.." });
  }
};
const UpdateNote = async (req, res) => {
  try {
    const updatednote = await noteModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!updatednote) {
      return res.status(422).json({ message: "NO notes are available.." });
    }
    res.status(201).json(updatednote);
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteNote = async (req, res) => {
  try {
    const deletednote = await noteModel.findByIdAndRemove({
      _id: req.params.id,
    });
    if (!deletednote) {
      return res.status(422).json({ message: "NO notes are available.." });
    }
    res.status(201).json(deletednote);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  CreateNote,
  ViewAlllNotes,
  UpdateNote,
  DeleteNote,
};
