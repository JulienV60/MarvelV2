import Link from "next/link";
import { useEffect, useState } from "react";

export default function ComicsForCharacterDetail(props: any) {

  return (
    <div className="col-4">
      <Link href="#">
        <a>
          <img src={`${props.data}.jpg`} style={{ maxHeight: "250px" }} />
        </a>
      </Link>
    </div>
  );
}
