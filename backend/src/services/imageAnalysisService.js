

export const analyzeImage = async (base64Image, mimeType) => {
  try {
    const prompt = `
Analyze this emergency image.

Return ONLY valid JSON.

{
  "detected": [
    "vehicle accident",
    "fire",
    "injury",
    "crowd",
    "violence"
  ],
  "confidence": 0
}

Detect:
- Vehicle accidents
- Fire
- Injuries
- Violence
- Crowds
- Dangerous situations
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType,
            data: base64Image,
          },
        },
      ],
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Image Analysis Error:", error);

    return {
      detected: [],
      confidence: 0,
    };
  }
};