import Incident from "../models/Incident.js";

export const getDashboardStats = async (req, res) => {
  try {
    const incidents = await Incident.find();

    const stats = {
      total: incidents.length,

      critical: incidents.filter(
        (i) => i.severity === "Critical"
      ).length,

      high: incidents.filter(
        (i) => i.severity === "High"
      ).length,

      medium: incidents.filter(
        (i) => i.severity === "Medium"
      ).length,

      low: incidents.filter(
        (i) => i.severity === "Low"
      ).length,

      open: incidents.filter(
        (i) => i.status === "Open"
      ).length,

      assigned: incidents.filter(
        (i) => i.status === "Assigned"
      ).length,

      resolved: incidents.filter(
        (i) => i.status === "Resolved"
      ).length,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Incident.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  } 
};