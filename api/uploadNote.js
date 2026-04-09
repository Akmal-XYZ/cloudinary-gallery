export default async function handler(req, res) {
  const cloudName = process.env.dzbpzdqao;
  const apiKey = process.env.978144777229154;
  const apiSecret = process.env.kb5h-WryZaiBzR7g3qulAF45iTo;

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { user, text } = req.body;

  const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

  const public_id = `note_BY_${user}`;

  const formData = new FormData();
  formData.append(
    "file",
    `data:text/plain;base64,${Buffer.from(text).toString("base64")}`
  );
  formData.append("public_id", public_id);
  formData.append("resource_type", "raw");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
