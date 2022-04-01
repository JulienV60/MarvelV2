import Link from "next/link";

export default function CardStories(props: any) {
  return (
    <div className="comicspage" key={props.name} id={props.id}>
      <Link
        key={props.nameCard}
        href={`http://localhost:3000/stories/${props.id}`}
      >
        <a>
          <div className="col-3" key={props.name} id={props.id}>
            <div className="card">
              <img
                className="card-img-top"
                style={{ height: "12rem" }}
                src="/7z6qt753qe031.webp"
              ></img>

              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ height: "9rem", fontSize: "0.7rem" }}
                >
                  {props.nameCard}
                </h5>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
