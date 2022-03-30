import { GetServerSideProps } from "next";
import ComicsForCharacterDetail from "../../../components/ComicsForDetails";
import EventForCharacterDetail from "../../../components/EventForDetails";
import Layout from "../../../components/Layout";
import SerieForCharacterDetail from "../../../components/SerieForDetails";
import { getDatabase } from "../../../src/database";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context?.params?.idCharacter);

  //data character

  const mongodb = await getDatabase();
  const dataCharacter = await mongodb
    .db()
    .collection("Characters")
    .findOne({ id: id });
  const dataComics = await dataCharacter?.comics.items;
  const dataSeries = await dataCharacter?.series.items;
  const dataStories = await dataCharacter?.stories.items;
  const dataEvents = await dataCharacter?.events.items;

  //recupere les id comics dans un tableau
  const comicsId = dataComics.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredComics = comicsId.filter(function (ele: any, pos: any) {
    return comicsId.indexOf(ele) == pos;
  });
  //recuperer les comics du tableau ci dessus en une requete
  const arrayOfComics = await mongodb
    .db()
    .collection("Comics")
    .find({
      id: { $in: filteredComics },
    })
    .toArray();

  //recupere les id events dans un tableau
  const eventsId = dataEvents.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredEvents = eventsId.filter(function (ele: any, pos: any) {
    return eventsId.indexOf(ele) == pos;
  });
  //recuperer les events du tableau ci dessus en une requete
  const arrayOfEvents = await mongodb
    .db()
    .collection("Events")
    .find({
      id: { $in: filteredEvents },
    })
    .toArray();

  //recupere les id series dans un tableau
  const seriesId = dataSeries.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredSeries = seriesId.filter(function (ele: any, pos: any) {
    return seriesId.indexOf(ele) == pos;
  });
  //recuperer les series du tableau ci dessus en une requete
  const arrayOfSeries = await mongodb
    .db()
    .collection("Series")
    .find({
      id: { $in: filteredSeries },
    })
    .toArray();

  //recupere les id stories dans un tableau
  const storiesId = dataStories.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredStories = storiesId.filter(function (ele: any, pos: any) {
    return storiesId.indexOf(ele) == pos;
  });
  //recuperer les stories du tableau ci dessus en une requete
  const arrayOfStories = await mongodb
    .db()
    .collection("Stories")
    .find({
      id: { $in: filteredStories },
    })
    .toArray();

  return {
    props: {
      datacharac: JSON.stringify(dataCharacter),
      dataComic: JSON.stringify(arrayOfComics),
      dataEvents: JSON.stringify(arrayOfEvents),
      dataSeries: JSON.stringify(arrayOfSeries),
      dataStories: JSON.stringify(arrayOfStories),
    },
  };
};

export default function CharacterDetails({
  datacharac,
  dataComic,
  dataEvents,
  dataSeries,
  dataStories,
}: any): JSX.Element {
  const datacharacJSON = JSON.parse(datacharac);
  const dataComicJSON = JSON.parse(dataComic);
  const dataEventsJSON = JSON.parse(dataEvents);
  const dataSeriesJSON = JSON.parse(dataSeries);
  const dataStoriesJSON = JSON.parse(dataStories);

  return (
    <Layout>
      <div className="container-fluid">
        <section>
          <div
            className="row"
            style={{ width: "100%", height: "30rem", alignContent: "center" }}
          >
            <div className="col-3 mx-auto">
              <img
                style={{ width: "400px" }}
                src={`${datacharacJSON.thumbnail.path}.${datacharacJSON.thumbnail.extension}`}
              />
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
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {dataComicJSON.map((element: any, index: number) => {
              return (
                <ComicsForCharacterDetail
                  key={element.title}
                  id={element.id}
                  data={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Events :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {dataEventsJSON.map((element: any, index: number) => {
              return (
                <EventForCharacterDetail
                  key={element.title}
                  id={element.id}
                  data={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Series :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {dataSeriesJSON.map((element: any, index: number) => {
              return (
                <SerieForCharacterDetail
                  key={element.title}
                  id={element.id}
                  data={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Stories :</h2>
        </section>
      </div>
    </Layout>
  );
}
