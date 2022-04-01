import Link from "next/link";
import { useEffect, useState } from "react";

export default function StoriesForCharacterDetail(props: any) {
  return (
    <div className="col-2">
      <Link href={`/stories/${props.id}`}>
        <a>
          <p
            style={{
              fontSize: "0.6rem",
              textAlign: "left",
            }}
          >
            {props.title}
          </p>
          <img src={"/7z6qt753qe031.webp"} style={{ maxHeight: "20rem" }} />
        </a>
      </Link>
    </div>
  );
}
