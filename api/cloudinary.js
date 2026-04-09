export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

    // 🔥 ambil IMAGE
    const imgRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const imgData = await imgRes.json();

    // 🔥 ambil RAW (txt + audio)
    const rawRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/raw`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const rawData = await rawRes.json();

    const resources = [
      ...(imgData.resources || []),
      ...(rawData.resources || []),
    ];

    res.status(200).json({ resources });

  } catch (err) {
    res.status(500).json({
      error: "cloudinary error",
      message: err.message,
    });
  }
}
