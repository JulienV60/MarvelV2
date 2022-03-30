import Link from "next/link";
export default function NavComics(props: any) {
  return (
    <>
      {props.data[0]?.map((element: any, index: number) => {
        return (
          <div key={element.title} id={element.id} className="col-3">
            <Link href={`/comics/${element.id}`}>
              <a>
                <div className="card">
                  {element.thumbnail.path
                    .split("/")
                    .includes("image_not_available") === true ? (
                    <img src="/7z6qt753qe031.webp"></img>
                  ) : (
                    <img
                      className="card-img-top"
                      style={{ height: "12rem" }}
                      src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                      alt=""
                    ></img>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{element.title}</h5>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
