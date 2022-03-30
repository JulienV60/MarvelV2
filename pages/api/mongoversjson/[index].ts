import md5 from "md5";
import { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");
import { getDatabase } from "../../../src/database";
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


      const mongodb = await getDatabase();
    const data = await mongodb.db().collection("Comics").find().toArray();

    data.map((element,index)=>{
      fs.appendFile(
        "data.json",
        `[${JSON.stringify(element)}],`,
        function (err: any) {
          if (err) throw err;

        }
      );
    })
    console.log("Fichier mis à jour !");


    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: "ok" }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
