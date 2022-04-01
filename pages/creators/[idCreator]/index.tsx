import { GetServerSideProps } from "next";
import CharactersForDetails from "../../../components/CharactersForDetails";
import ComicsForDetails from "../../../components/ComicsForDetails";
import CreatorsForDetails from "../../../components/CreatorsForDetails";
import EventsForDetails from "../../../components/EventForDetails";
import Layout from "../../../components/Layout";
import SerieForCharacterDetail from "../../../components/SerieForDetails";
import StorieForDetails from "../../../components/StorieForDetails";
import { getDatabase } from "../../../src/database";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context?.params?.idCreator);

  //data comics

  const mongodb = await getDatabase();
  const dataCreator = await mongodb
    .db()
    .collection("Creators")
    .findOne({ id: id });
  const dataComics = await dataCreator?.comics.items;
  const dataSeries = await dataCreator?.series.items;
  const dataStories = await dataCreator?.stories.items;
  const dataEvents = await dataCreator?.events.items;

  const seriesId = dataSeries.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });

  const filteredSeries = seriesId.filter(function (ele: any, pos: any) {
    return seriesId.indexOf(ele) == pos;
  });

  const arrayOfSeries = await mongodb
    .db()
    .collection("Comics")
    .find({
      id: { $in: filteredSeries },
    })
    .toArray();

  const comicsId = dataComics.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });

  const filteredComics = comicsId.filter(function (ele: any, pos: any) {
    return comicsId.indexOf(ele) == pos;
  });

  const arrayOfComics = await mongodb
    .db()
    .collection("Comics")
    .find({
      id: { $in: filteredComics },
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

  return {
    props: {
      dataCreators: JSON.stringify(dataCreator),
      dataSeries: JSON.stringify(arrayOfSeries),
      dataEvents: JSON.stringify(arrayOfEvents),
      dataStories: JSON.stringify(arrayOfStories),
      dataComics: JSON.stringify(arrayOfComics),
    },
  };
};

export default function CharacterDetails({
  dataComics,
  dataCreators,
  dataEvents,
  dataStories,
  dataSeries,
}: any): JSX.Element {
  const dataComicsJSON = JSON.parse(dataComics);
  const dataCreatorsJSON = JSON.parse(dataCreators);
  const dataEventsJSON = JSON.parse(dataEvents);
  const dataStoriesJSON = JSON.parse(dataStories);
  const dataSeriesJSON = JSON.parse(dataSeries);
  return (
    <Layout>
      <div className="container-fluid">
        <section>
          <div className="arow" style={{ width: "100%" }}>
            <div className="col-3 mx-auto">
              <img
                style={{ width: "20rem", height: "30rem" }}
                src={`${dataCreatorsJSON.thumbnail.path}.${dataCreatorsJSON.thumbnail.extension}`}
              />
            </div>
            <div className="ecol-3 mx-auto">
              <h1>{dataCreatorsJSON.fullName}</h1>
              <p>Work On {dataCreatorsJSON.comics.available} Comics</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Comics :</h2>
          <div className="row overflow-auto">
            {dataComicsJSON.map((element: any, index: number) => {
              return (
                <ComicsForDetails
                  key={element.title}
                  id={element.id}
                  name={element.title}
                  data={
                    `${element.thumbnail.path}`
                      .split("/")
                      .includes("image_not_available") === true
                      ? `/7z6qt753qe031.webp`
                      : `${element.thumbnail.path}.${element.thumbnail.extension}`
                  }
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Series :</h2>
          <div className="row overflow-auto" style={{ height: "28rem" }}>
            {dataSeriesJSON.map((element: any, index: number) => {
              return (
                <SerieForCharacterDetail
                  key={element.name}
                  id={element.id}
                  name={element.title}
                  data={
                    `${element.thumbnail.path}`
                      .split("/")
                      .includes("image_not_available") === true
                      ? `/7z6qt753qe031.webp`
                      : `${element.thumbnail.path}.${element.thumbnail.extension}`
                  }
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Stories:</h2>
          <div className="row overflow-auto">
            {dataStoriesJSON.map((element: any, index: number) => {
              return (
                <StorieForDetails
                  key={element.title}
                  id={element.id}
                  title={element.title}
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
                <EventsForDetails
                  key={element.title}
                  id={element.id}
                  title={element.title}
                  data={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                />
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
