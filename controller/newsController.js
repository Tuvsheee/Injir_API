const model = require("../models/newsModel");
const asyncHandler = require("../middleware/asyncHandler");

exports.create = asyncHandler(async (req, res) => {
  try {
    // Handle cover photo (if exists)
    const coverPhotoFileName =
      req.files["cover"] && req.files["cover"][0]
        ? req.files["cover"][0].filename
        : "no cover photo provided";

    // Handle gallery files (if exists)
    const uploadedFiles = [];
    if (req.files && req.files.files && Array.isArray(req.files.files)) {
      for (let file of req.files.files) {
        uploadedFiles.push(file.filename);
      }
    }

    const input = {
      ...req.body,
      gallery: uploadedFiles,
      cover: coverPhotoFileName,
    };

    // Create new item in database
    const newItem = await model.create(input);

    // Send successful response
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ success: false, error: error });
  }
});
exports.update = asyncHandler(async (req, res) => {
  try {
    const old = await model.findById(req.params.id);

    const galleryFileName =
      req.files["cover"] && req.files["cover"][0]
        ? req.files["cover"][0].filename
        : old.coverPhoto;

    let uploadedFiles = [];
    if (req.files && req.files.files && Array.isArray(req.files.files)) {
      uploadedFiles = req.files.files.map((file) => file.filename);
    } else {
      uploadedFiles = old.gallery; // Retain old gallery if no new files
    }

    const input = {
      ...req.body,
      gallery: uploadedFiles,
      coverPhoto: galleryFileName,
    };

    const newItem = await model.findByIdAndUpdate(req.params.id, input, {
      new: true,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.findDelete = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findByIdAndDelete(req.params.id, {
      new: true,
    });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.detail = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findById(req.params.id);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
 
exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const total = await model.countDocuments();
    const text = await model.find()
    return res.status(200).json({ success: true, total: total, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

