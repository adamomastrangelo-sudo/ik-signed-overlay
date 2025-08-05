import ImageKit from "imagekit";

export default async function handler(req, res) {
  try {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });

    const path = req.query.path || "";
    const text = req.query.text || "";

    const raw =
      `tr=f-jpg,q-90,w-1080,h-1350,fo-auto:` +
      `l-text,i-${encodeURIComponent(text)},fs-96,co-FFFFFF,bg-000000B0,pa-24,` +
      `lx-bw_mul_0.05,ly-bh_mul_0.88,l-end`;

    const url = imagekit.url({
      path,
      transformation: [{ raw }],
      signed: true,
      expireSeconds: 600,
    });

    res.status(200).json({ url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
