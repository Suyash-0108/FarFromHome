import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        latitude: {
            type: Number,
            required: true,
        },

        longitude: {
            type: Number,
            required: true,
        },

        imageUrl: {
            type: String,
            default: "",
        },

        priorityScore: {
            type: Number,
            default: 0,
        },

        severity: {
            type: String,
            enum: ["Critical", "High", "Medium", "Low"],
            default: "Low",
        },

        emergencyType: {
            type: String,
            default: "Other",
        },

        reasoning: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Open", "Assigned", "Resolved"],
            default: "Open",
        },
    },
    {
        timestamps: true,
    }
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;