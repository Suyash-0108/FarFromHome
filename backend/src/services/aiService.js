import ai from "../config/gemini.js";

export async function analyzeEmergency(description) {
  try {
    const prompt = `
You are an emergency triage officer.

Analyze the emergency report.

Priority Score Rules:

0-25 = Low
26-50 = Medium
51-75 = High
76-100 = Critical

Return ONLY valid JSON.

{
  "priorityScore": number,
  "severity": "Critical|High|Medium|Low",
  "emergencyType": "Medical|Crime|Fire|Disaster|Women Safety",
  "reasoning": "short reason"
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

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("No JSON found");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);

    return {
      priorityScore: 50,
      severity: "Medium",
      emergencyType: "Other",
      reasoning: "AI analysis unavailable",
    };
  }
}