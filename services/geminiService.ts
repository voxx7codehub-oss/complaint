
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLegalInsights = async (query: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide information about the following activity in India from a legal perspective: ${query}. Include relevant IPC sections, potential punishments, and legal definitions.`,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    
    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("AI Insight Error:", error);
    throw error;
  }
};

export const categorizeIncident = async (description: string) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this incident description: "${description}", categorize it into a standard Indian legal violation category (e.g., Traffic, Public Nuisance, Corruption, Environmental, etc.). Return only the category name.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}').category || 'Uncategorized';
  } catch (error) {
    return 'General';
  }
};
