export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const cloudName = process.env.CLOUD_NAME;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;

    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const formData = await req.formData();

    const file = formData.get("file");
    const user = formData.get("user");

    if (!file || !user) {
      return res.status(400).json({ error: "Missing file/user" });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

    // ❗ TANPA .mp3 (biar cocok frontend)
    const public_id = `audio_BY_${user}`;

    const body = new URLSearchParams();
    body.append(
      "file",
      `data:audio/mpeg;base64,${buffer.toString("base64")}`
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
      error: "upload audio error",
      message: err.message,
    });
  }
}
