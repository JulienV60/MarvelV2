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
      const data = await mongodb.db().collection("Characters").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 1450);
        dataFilted.push({
          name: data[random].name,
          id: data[random].id,
          path: `${data[random].thumbnail.path}`,
          extension: `${data[random].thumbnail.extension}`,
        });
      }
    } else if (select === "comics") {
      const mongodb = await getDatabase();
      const data = await mongodb.db().collection("Comics").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 10800);
        dataFilted.push({
          title: data[random].title,
          id: data[random].id,
          path: `${data[random].thumbnail.path}`,
          extension: `${data[random].thumbnail.extension}`,
        });
      }
    } else if (select === "creators") {
      const mongodb = await getDatabase();
      const data = await mongodb.db().collection("Creators").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 2767);
        dataFilted.push({
          firstName: data[random].firstName,
          id: data[random].id,
          path: `${data[random].thumbnail.path}`,
          extension: `${data[random].thumbnail.extension}`,
        });
      }
    } else if (select === "events") {
      const mongodb = await getDatabase();
      const data = await mongodb.db().collection("Events").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 74);
        dataFilted.push({
          title: data[random].title,
          id: data[random].id,
          path: `${data[random].thumbnail.path}`,
          extension: `${data[random].thumbnail.extension}`,
        });
      }
    } else if (select === "series") {
      const mongodb = await getDatabase();
      const data = await mongodb.db().collection("Series").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 1700);
        dataFilted.push({
          title: data[random].title,
          id: data[random].id,
          path: `${data[random].thumbnail.path}`,
          extension: `${data[random].thumbnail.extension}`,
        });
      }
    } else if (select === "stories") {
      const mongodb = await getDatabase();
      const data = await mongodb.db().collection("Stories").find().toArray();
      for (let index = 0; index < 4; index++) {
        const random = Math.floor(Math.random() * 2000);
        dataFilted.push({
          title: data[random].title,
          id: data[random].id,
          path: "null",
        });
      }
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: dataFilted }));
  } else {
    res.statusCode = 405;
    res.end();
  }
}
