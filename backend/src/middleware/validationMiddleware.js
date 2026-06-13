export const validateIncident = (req, res, next) => {
  const {
    type,
    description,
    latitude,
    longitude,
  } = req.body;

  if (
    !type ||
    !description ||
    latitude === undefined ||
    longitude === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  next();
};