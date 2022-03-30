import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventsForDetails(props: any) {
  return (
    <div className="col-4">
      <Link href={`/events/${props.id}`}>
        <a>
          <p>{props.name}</p>
          <p>{props.title}</p>
          <img src={`${props.data}`} style={{ maxHeight: "350px" }} />
        </a>
      </Link>
    </div>
  );
}
