import { GetServerSideProps } from "next";
import ComicsForCharacterDetail from "../../../components/ComicsForCharacterDetail";
import EventForCharacterDetail from "../../../components/EventForCharacterDetail";
import Layout from "../../../components/Layout";
import StoriesForCharactersDetails from "../../../components/StoriesForCharactersDetails";
import { getDatabase } from "../../../src/database";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context?.params?.idCharacter);

  //data character
  let character;
  const comics: any = [];
  const dataComicsPath: any = [];

  const mongodb = await getDatabase();
  const dataCharacter = await mongodb.db().collection("Characters").findOne({ id: id });
  const dataComics = await dataCharacter?.comics.items;
  const dataSeries = await dataCharacter?.series.items;
  const dataStories = await dataCharacter?.stories.items;
  const dataEvents = await dataCharacter?.events.items;

  const comicsId = dataComics.map((element:any) => {
    return `${element.resourceURI.split("/")[6]}`
  })

  const arrayOfComics = await mongodb.db().collection("Comics").find({
    id: { $in: comicsId }
  }).toArray();
console.log("test",arrayOfComics)
    // dataCharacters.filter((element: any) => {
    //   if ((element[0].id).toString() === id) {
    //     character = element[0];
    //     element[0].comics.items.map((comic: any) => {
    //       const idComic = comic.resourceURI.split("/")[6];
    //       dataComics.filter((datacomic: any) => {
    //         if ((datacomic[0].id).toString() === idComic) {
    //           dataComicsPath.push(datacomic[0]);
    //         }
    //       })
    //     })
    //   }
    // })

  //data comics

  //console.log(dataComicsPath)


  return {
    props: {
      datacharac: JSON.stringify(dataCharacter),
      dataComic: "dataComicsPath"
    },
  };
};

export default function CharacterDetails({ datacharac, dataComic, caracimg }: any): JSX.Element {
  const datacharacJSON = JSON.parse(datacharac);
  return (<Layout>
      <div className="container-fluid">
        <section>
          <div
            className="row"
            style={{ width: "100%", height: "30rem", alignContent: "center" }}
          >
            <div className="col-3 mx-auto">
              <img style={{ width: "400px" }}src={`${datacharacJSON.thumbnail.path}.${datacharacJSON.thumbnail.extension}`}/>
            </div>
            <div className="col-4 mx-auto">
              <h1>{datacharacJSON.name}</h1>
              <p>{datacharacJSON.description}</p>
              <br></br>
            </div>
          </div>
        </section>
        <br></br>
        <section>
          <h2>Comics :</h2>

        </section>
        <br></br>
      </div>
    </Layout>
  );

}
