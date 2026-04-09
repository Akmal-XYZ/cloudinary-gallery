export default async function handler(req, res) {
  const cloudName = process.env.dzbpzdqao;
  const apiKey = process.env.978144777229154;
  const apiSecret = process.env.kb5h-WryZaiBzR7g3qulAF45iTo;

  const { max_results, cursor } = req.query;

  const auth = Buffer.from(apiKey + ":" + apiSecret).toString("base64");

  let url = `https://api.cloudinary.com/v1_1/${cloudName}/resources?resource_type=all&max_results=${max_results || 50}`;

  if (cursor) {
    url += `&next_cursor=${cursor}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();

  res.status(200).json(data);
}
