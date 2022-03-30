import md5 from "md5";
import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const select = req.query.index;
    const dataFilted = [];
    if (select === "characters") {
      const mongodb = await getDatabase();
      dataFilted.push(await mongodb.db().collection("Characters").find().limit(4).toArray());
    } else if (select === "comics") {
      const mongodb = await getDatabase();
     dataFilted.push(await mongodb.db().collection("Comics").find().limit(4).toArray());
    } else if (select === "creators") {
      const mongodb = await getDatabase();
      dataFilted.push(await mongodb.db().collection("Creators").find().limit(4).toArray());
    } else if (select === "events") {
      const mongodb = await getDatabase();
     dataFilted.push(await mongodb.db().collection("Events").find().limit(4).toArray());
    } else if (select === "series") {
      const mongodb = await getDatabase();
      dataFilted.push(await mongodb.db().collection("Series").find().limit(4).toArray());
    } else if (select === "stories") {
      const mongodb = await getDatabase();
      dataFilted.push(await mongodb.db().collection("Stories").find().limit(4).toArray());
    }
//console.log("data",dataFilted)
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: dataFilted }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
