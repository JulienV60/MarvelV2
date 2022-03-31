import md5 from "md5";
import { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
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

    for (let index = 1; index <= 120; index++) {
      console.log(index);
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/series?ts=${time}&apikey=${
          process.env.REACT_APP_MARVEL_PUBLIC_KEY
        }&hash=${hash}&limit=100&offset=${index * 100}`
      )
        .then((data) => data.json())
        .then((response) => response?.data?.results);
      fs.appendFile(
        "data2.json",
        `${JSON.stringify(response)}`,
        function (err: any) {
          if (err) throw err;
          console.log("Fichier mis à jour !");
        }
      );
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: "ok" }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
