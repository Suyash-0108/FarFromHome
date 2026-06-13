import axios from "axios";

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

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.1:8b",
        prompt,
        stream: false,
      }
    );

    const text = response.data.response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (error) {
    console.error("Ollama Analysis Error:", error);

    return {
      priorityScore: 50,
      severity: "Medium",
      emergencyType: "Other",
      reasoning: "AI analysis unavailable",
    };
  }
}