import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreatorsForDetails(props: any) {
  return (
    <div className="col-2" key={props.name}>
      <Link href={`/creators/${props.id}`}>
        <a>
          <p>{props.name}</p>
          <img src={`${props.data}`} style={{ maxHeight: "350px" }} />
        </a>
      </Link>
    </div>
  );
}
