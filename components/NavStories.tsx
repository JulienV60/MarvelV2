import Link from "next/link";
export default function NavStories(props: any) {
  return (
    <>
      {props.data[0]?.map((element: any, index: number) => {
        return (
          <div key={element.id} id={element.id} className="col-3">
            <Link href={`/stories/${element.id}`}>
              <a>
                <div className="card">
                  <img
                    className="card-img-top"
                    style={{ height: "12rem" }}
                    src="/7z6qt753qe031.webp"
                    alt="Card image cap"
                  ></img>

                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ height: "9rem", fontSize: "0.7rem" }}
                    >
                      {element.title}
                    </h5>
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
