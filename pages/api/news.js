import axios from "axios";

export default async function handler(req, res) {
  const { page = 1, pageSize = 10 } = req.query;  

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
  }
}
