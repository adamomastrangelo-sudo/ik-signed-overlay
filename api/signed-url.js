export default async function handler(req, res) {
  try {
    res.status(200).json({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "missing",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "missing",
      endpoint: process.env.IMAGEKIT_URL_ENDPOINT || "missing"
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
