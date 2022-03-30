import Link from "next/link";
import { useEffect, useState } from "react";

export default function SerieForCharacterDetail(props: any) {
  return (
    <div className="col-4">
      <Link href={`/series/${props.id}`}>
        <a>
          <img src={`${props.data}`} style={{ maxHeight: "350px" }} />
        </a>
      </Link>
    </div>
  );
}