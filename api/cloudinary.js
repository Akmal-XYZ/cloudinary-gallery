export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
} 
