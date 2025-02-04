const model = require("../models/travelModel");
const asyncHandler = require("../middleware/asyncHandler");
const services = require("../models/services");
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
      days: req.body.days ? JSON.parse(req.body.days || "[]") : [],
      services: req.body.services ? JSON.parse(req.body.services || "[]") : [],
      pax: req.body.pax ? JSON.parse(req.body.pax || "[]") : [],
      gallery: uploadedFiles,
      coverPhoto: coverPhotoFileName,
    };

    // Create new item in database
    const newItem = await model.create(input);

    // Send successful response
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const old = model.findById(req.params.id);
    const coverPhotoFileName =
      req.files["cover"] && req.files["cover"][0]
        ? req.files["cover"][0].filename
        : old.coverPhoto;

    let uploadedFiles = [];
    if (req.files && req.files.files && Array.isArray(req.files.files)) {
      for (let file of req.files.files) {
        uploadedFiles.push( file.filename );
      }
    } else {
      uploadedFiles = old.gallery;
    }

    const input = {
      ...req.body,

      days: req.body.days ? JSON.parse(req.body.days) : old.days,
      services: req.body.services
        ? JSON.parse(req.body.services)
        : old.services,
      pax: req.body.pax ? JSON.parse(req.body.pax) : old.pax,
      gallery: uploadedFiles,
      coverPhoto: coverPhotoFileName,
    };

    // Create new item in database
    const newItem = await model.findByIdAndUpdate(req.params.id,input);

    // Send successful response
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ success: false, error: error });
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
    const text = await model.findById(req.params.id).populate("services");
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const total = await model.countDocuments();
    const text = await model
      .find()
      .populate({
        path: "category",
        select: "_id name photo region",
      })
      .populate("services");
    return res.status(200).json({ success: true, total: total, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getCategoryTravel = asyncHandler(async (req, res, next) => {
  try {
    const { page = 1, limit = 100, sort, select, ...filter } = req.query;
    // Delete pagination-related parameters from the original query
    ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);
    // Calculate pagination values
    const total = await model.countDocuments(filter);
    const pageCount = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    let end = start + limit - 1;
    if (end > total) end = total;
    const pagination = { total, pageCount, start, end, limit };
    // Add next and previous page links if applicable
    if (page < pageCount) pagination.nextPage = page + 1;
    if (page > 1) pagination.prevPage = page - 1;
    // Log relevant information for debugging
    const data = await model
      .find({ category: req.params.travelId }, filter, select)
      .sort(sort)
      .skip(start - 1)
      .limit(limit);

    return res.status(200).json({ success: true, total, pagination, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});