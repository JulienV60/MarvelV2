import Link from "next/link";
export default function NavCreators(props: any) {
  return (
    <>
      {props.data[0]?.map((element: any, index: number) => {
        return (
          <div key={element.firstName} id={element.id} className="col-3">
            <Link href={`/creators/${element.id}`}>
              <a>
                <div className="card">
                  {element.thumbnail.path
                    .split("/")
                    .includes("image_not_available") === true ? (
                    <img
                      style={{ height: "12rem" }}
                      src="/stock-vector-user-not-available-icon-1038380422.jpeg"
                    ></img>
                  ) : (
                    <img
                      className="card-img-top"
                      style={{ height: "12rem" }}
                      src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                      alt=""
                    ></img>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{element.firstName}</h5>
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
