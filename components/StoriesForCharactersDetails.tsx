import Link from "next/link";
import { useEffect, useState } from "react";

export default function StoriesForCharactersDetails(props: any) {
  const [stories, setStories] = useState("");
  const [affiche, setAffiche] = useState([]);

  async function getComics() {
    const idStories = props.data.split("/")[6];
    const result = await fetch(
      `http://localhost:3000/api/call/detail/${idStories}?rubrique=stories`
    )
      .then((response) => response.json())
      .then((result) => result.data);

    setStories(result[0].thumbnail.image);
  }

  getComics();

  return (
    <div className="col-4">
      <Link href="#">
        <a>
          <img src={`${stories}.jpg`} style={{ maxHeight: "250px" }} />
        </a>
      </Link>
    </div>
  );
}