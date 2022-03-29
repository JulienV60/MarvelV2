import md5 from "md5";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const time = Number(new Date());
    const hash = md5(
      time +
        `${process.env.REACT_APP_MARVEL_PRIVATE_KEY}` +
        `${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
    );

    let offset;
    if (req.query.page) {
      offset = parseInt(req.query.page.toString()) * 100;
    } else {
      offset = 100;
    }
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/${req.query.index}?ts=${time}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}`
    )
      .then((data) => data.json())
      .then((response) => response.data.results);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: response }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
