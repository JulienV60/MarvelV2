import Link from "next/link";
import error404 from "../pages/404";

export default function CardCharactersPage(props: any) {
  return (
    <div className="characterspage">
      <Link
        key={props.nameCard}
        href={`http://localhost:3000/characters/${props.idCharacter}`}
      >
        <a>
          <div className="col-3">
            <div className="card">
              {props.imgCard.includes("image_not_available") === true ||
              props.imgCard === null ? (
                <img
                  className="card-img-top"
                  style={{ height: "12rem" }}
                  src="/7z6qt753qe031.webp"
                ></img>
              ) : (
                <img
                  className="card-img-top"
                  style={{ height: "12rem" }}
                  src={`${props.imgCard}.jpg`}
                  alt=""
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
