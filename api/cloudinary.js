export default async function handler(req, res) {
  const cloudName = "dzbpzdqao";
  const apiKey = "978144777229154";
  const apiSecret = "kb5h-WryZaiBzR7g3qulAF45iTo"; // ganti ini

  const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
