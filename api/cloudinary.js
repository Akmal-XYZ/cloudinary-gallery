export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

    // 🔥 AMBIL SEMUA (image + raw)
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources?resource_type=all&max_results=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();

    // 🔥 HANDLE ERROR BIAR GAK CRASH
    if (!data.resources) {
      return res.status(500).json({
        error: "Cloudinary error",
        detail: data,
      });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
}
