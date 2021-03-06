import Link from "next/link";

export default function CardCreators(props: any) {
  return (
    <div className="comicspage" key={props.name} id={props.id}>
      <Link
        key={props.nameCard}
        href={`http://localhost:3000/creators/${props.id}`}
      >
        <a>
          <div className="col-3" key={props.name} id={props.id}>
            <div className="card">
              {props.imgCard.includes("image_not_available") === true ? (
                <img
                  className="card-img-top"
                  style={{ height: "12rem" }}
                  src="/stock-vector-user-not-available-icon-1038380422.jpeg"
                ></img>
              ) : (
                <img
                  className="card-img-top"
                  style={{ height: "12rem" }}
                  src={`${props.imgCard}`}
                ></img>
              )}

              <div className="card-body">
                <h5 className="card-title">{props.nameCard}</h5>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
