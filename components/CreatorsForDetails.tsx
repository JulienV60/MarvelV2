import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreatorsForDetails(props: any) {
  return (
    <div className="creators" key={props.id}>
      <Link href={`/creators/${props.id}`}>
        <a>
          <p>{props.name}</p>
          {props.data.split("/")[10].includes("image_not_available") ===
          true ? (
            <img
              style={{ maxHeight: "350px" }}
              src="/stock-vector-user-not-available-icon-1038380422.jpeg"
            ></img>
          ) : (
            <img style={{ maxHeight: "350px" }} src={props.data}></img>
          )}
        </a>
      </Link>
    </div>
  );
}
