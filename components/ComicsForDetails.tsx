import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComicsForDetails(props: any) {
  return (
    <div className="col-2" key={props.id}>
      <Link href={`/comics/${props.id}`}>
        <a>
          <img src={`${props.data}`} style={{ maxHeight: "350px" }} />
        </a>
      </Link>
    </div>
  );
}
