import { GetServerSideProps } from "next";
import ComicsForCharacterDetail from "../../../components/ComicsForCharacterDetail";
import EventForCharacterDetail from "../../../components/EventForCharacterDetail";
import Layout from "../../../components/Layout";
import StoriesForCharactersDetails from "../../../components/StoriesForCharactersDetails";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.idCharacter;
  const dataCharacters = require("../../../Characters.json");
  const dataComics = require("../../../Comics.json")

  //data character
  let character;
  const comics: any = [];
  const dataComicsPath:any = [];

    dataCharacters.filter((element: any) => {
      if ((element[0].id).toString() === id) {
        character = element[0];
        element[0].comics.items.map((comic: any) => {
          const idComic = comic.resourceURI.split("/")[6];
          dataComics.filter((datacomic: any) => {
            if ((datacomic[0].id).toString() === idComic) {
              dataComicsPath.push(datacomic[0]);
            }
          })
        })
      }
    })

  //data comics

  //console.log(dataComicsPath)


  return {
    props: {
      datacharac: character,
      dataComic: dataComicsPath
    },
  };
};

export default function CharacterDetails({ datacharac, dataComic }: any): JSX.Element {
  console.log(dataComic)
  return (
    <Layout>
      <div className="container-fluid">
        <section>
          <div
            className="row"
            style={{ width: "100%", height: "30rem", alignContent: "center" }}
          >
            <div className="col-3 mx-auto">
              <img style={{ width: "400px" }}src={`${datacharac.thumbnail.path}.${datacharac.thumbnail.extension}`}/>
            </div>
            <div className="col-4 mx-auto">
              <h1>{datacharac.name}</h1>
              <p>{datacharac.description}</p>
              <br></br>
            </div>
          </div>
        </section>
        <br></br>
        <section>
          <h2>Comics :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {dataComic.map((element:any) => {
              return <ComicsForCharacterDetail key={element.title} data={element.thumbnail.path} />;
            })}
          </div>
        </section>
        <br></br>
      </div>
    </Layout>
  );
}
