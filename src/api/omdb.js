const configuredKey = import.meta.env.VITE_OMDB_API_KEY?.trim() || "";
const apiKey = configuredKey.match(/(?:apikey=)([^&]+)/i)?.[1] || configuredKey;

export async function requestOmdb(params, signal) {
  if (!apiKey) {
    throw new Error("OMDb API key is missing. Please check your .env file.");
  }

  const searchParams = new URLSearchParams({ apikey: apiKey, ...params });
  const response = await fetch(`https://www.omdbapi.com/?${searchParams}`, { signal });

  if (!response.ok) {
    throw new Error("OMDb is temporarily unavailable. Please try again.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movie data found.");
  }

  return data;
}