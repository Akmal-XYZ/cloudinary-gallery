export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { user, text } = req.body;

    if (!user || !text) {
      return res.status(400).json({ error: "Missing data" });
    }

    const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

    // ❗ TANPA .txt (biar cocok frontend)
    const public_id = `note_BY_${user}`;

    const body = new URLSearchParams();
    body.append(
      "file",
      `data:text/plain;base64,${Buffer.from(text).toString("base64")}`
    );
    body.append("public_id", public_id);
    body.append("overwrite", "true");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: "upload note error",
      message: err.message,
    });
  }
}
