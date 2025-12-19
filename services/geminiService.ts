export async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + import.meta.env.VITE_GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Aucune réponse générée."
    );
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Erreur lors de la génération de la réponse.";
  }
}
