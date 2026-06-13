import Incident from "../models/Incident.js";
import cloudinary from "../config/cloudinary.js";
import { analyzeEmergency } from "../services/aiService.js";
import { getIO } from "../sockets/incidentSocket.js";
export const createIncident = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        const {
            type,
            description,
            latitude,
            longitude,
        } = req.body;

        let imageUrl = "";

        if (req.file) {
            const base64Image =
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

            const uploaded = await cloudinary.uploader.upload(
                base64Image,
                {
                    folder: "sentinelai",
                }
            );

            imageUrl = uploaded.secure_url;
        }

        const aiResult = await analyzeEmergency(description);

        const incident = await Incident.create({
                type,
                description,

                latitude: Number(latitude),
                longitude: Number(longitude),

                imageUrl,
                priorityScore: aiResult.priorityScore,
                severity: aiResult.severity,
                emergencyType: aiResult.emergencyType,
                reasoning: aiResult.reasoning,
});

        getIO().emit("incidentCreated", incident);

        res.status(201).json({
            success: true,
            incident,
        });
    } catch (error) {
   console.error("CREATE INCIDENT ERROR:");
   console.error(error);

   res.status(500).json({
      success:false,
      message:error.message,
      stack:error.stack
   });
}
};

export const getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find()
            .sort({ priorityScore: -1 });

        res.status(200).json({
            success: true,
            count: incidents.length,
            incidents,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found",
            });
        }

        res.status(200).json({
            success: true,
            incident,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateIncidentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const incident = await Incident.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found",
            });
        }

        getIO().emit("incidentUpdated", incident);

        res.status(200).json({
            success: true,
            incident,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};