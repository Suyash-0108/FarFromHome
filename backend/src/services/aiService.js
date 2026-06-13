import ai from "../config/gemini.js";
import { womenSafetyBoost }
from "../utils/womenSafetyBoost.js";
export const analyzeEmergency = async (description) => {
    try {
        const prompt = `
Analyze the following emergency report.

Return ONLY valid JSON.

{
  "priorityScore": 0,
  "severity": "Critical|High|Medium|Low",
  "emergencyType": "Medical|Fire|Crime|Women Safety|Disaster|Other",
  "reasoning": "short explanation"
}

Emergency Report:
${description}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const result = JSON.parse(text);

if (womenSafetyBoost(description)) {
  result.priorityScore = Math.min(
    result.priorityScore + 15,
    100
  );

  result.severity = "Critical";
  result.emergencyType = "Women Safety";
}

return result;
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return {
            priorityScore: 50,
            severity: "Medium",
            emergencyType: "Other",
            reasoning: "AI analysis unavailable",
        };
    }
};