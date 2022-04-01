import { GetServerSideProps } from "next";
import CharactersForDetails from "../../../components/CharactersForDetails";
import ComicsForDetails from "../../../components/ComicsForDetails";
import CreatorsForDetails from "../../../components/CreatorsForDetails";
import EventsForDetails from "../../../components/EventForDetails";
import Layout from "../../../components/Layout";
import StorieForDetails from "../../../components/StorieForDetails";
import { getDatabase } from "../../../src/database";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id: number = Number(context?.params?.idStorie);

  const mongodb = await getDatabase();
  const dataStories = await mongodb
    .db()
    .collection("Stories")
    .findOne({ id: id });

  const dataCreators = await dataStories?.creators.items;
  const dataCharacters = await dataStories?.characters.items;
  const dataComics = await dataStories?.comics.items;
  const dataSeries = await dataStories?.series.items;
  const dataEvents = await dataStories?.events.items;

  //recupere les id creators dans un tableau
  const creatorsId = dataCreators.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });

  //recuperer les creators du tableau ci dessus en une requete
  const filteredCreators = creatorsId.filter(function (ele: any, pos: any) {
    return creatorsId.indexOf(ele) == pos;
  });
  const arrayOfCreators = await mongodb
    .db()
    .collection("Creators")
    .find({
      id: { $in: filteredCreators },
    })
    .toArray();
  //recupere les id characters dans un tableau
  const charactersId = dataCharacters.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });

  //recuperer les characters du tableau ci dessus en une requete
  const filteredCharacters = charactersId.filter(function (ele: any, pos: any) {
    return charactersId.indexOf(ele) == pos;
  });

  const arrayOfCharacters = await mongodb
    .db()
    .collection("Characters")
    .find({
      id: { $in: filteredCharacters },
    })
    .toArray();

  //recupere les id events dans un tableau
  const comicsId = dataComics.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredComics = comicsId.filter(function (ele: any, pos: any) {
    return comicsId.indexOf(ele) == pos;
  });
  //recuperer les events du tableau ci dessus en une requete
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
    .collection("Comics")
    .find({
      id: { $in: filteredEvents },
    })
    .toArray();
  const seriesId = dataSeries.map((element: any) => {
    return parseInt(element.resourceURI.split("/")[6]);
  });
  const filteredSeries = seriesId.filter(function (ele: any, pos: any) {
    return seriesId.indexOf(ele) == pos;
  });
  //recuperer les events du tableau ci dessus en une requete
  const arrayOfSeries = await mongodb
    .db()
    .collection("Series")
    .find({
      id: { $in: filteredSeries },
    })
    .toArray();
  return {
    props: {
      dataSeries: JSON.stringify(arrayOfSeries),
      dataCreators: JSON.stringify(arrayOfCreators),
      dataCharac: JSON.stringify(arrayOfCharacters),
      dataEvents: JSON.stringify(arrayOfEvents),
      dataStories: JSON.stringify(dataStories),
      dataComics: JSON.stringify(arrayOfComics),
    },
  };
};

export default function CharacterDetails({
  dataSeries,
  dataComics,
  dataCreators,
  dataEvents,
  dataStories,
  dataCharac,
}: any): JSX.Element {
  const dataStoriesJSONdataSeriesJSON = JSON.parse(dataSeries);
  const dataCharacJSON = JSON.parse(dataCharac);
  const dataComicsJSON = JSON.parse(dataComics);
  const dataCreatorsJSON = JSON.parse(dataCreators);
  const dataEventsJSON = JSON.parse(dataEvents);
  const dataStoriesJSON = JSON.parse(dataStories);

  return (
    <Layout>
      {" "}
      <div className="container-fluid">
        <section>
          <div className="arow" style={{ height: "40rem" }}>
            <div className="col-4 mx-auto">
              <img style={{ width: "20rem" }} src={"/7z6qt753qe031.webp"} />
            </div>

            <div className="col-4 mx-auto">
              <h1>{dataStoriesJSON.title}</h1>
              <p>{dataStoriesJSON.description}</p>
            </div>
          </div>
        </section>{" "}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h2>Creators:</h2>
        <div className="row overflow-auto">
          {dataCreatorsJSON.map((element: any, index: number) => {
            return (
              <CreatorsForDetails
                key={element.title}
                id={element.id}
                name={element.fullName}
                data={`${element.thumbnail.path}.${element.thumbnail.extension}`}
              />
            );
          })}
        </div>
        <section>
          <h2>Comics:</h2>
          <div className="row overflow-auto" style={{ height: "29rem" }}>
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
        <section>
          <h2>Charactors</h2>
          <div className="row overflow-auto" style={{ maxHeight: "40rem" }}>
            {dataCharacJSON.map((element: any, index: number) => {
              return (
                <CharactersForDetails
                  key={element.name}
                  id={element.id}
                  name={element.name}
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
          <h2>Events:</h2>
          <div className="row overflow-auto" style={{ maxHeight: "40rem" }}>
            {dataEventsJSON.map((element: any, index: number) => {
              return (
                <EventsForDetails
                  key={element.title}
                  id={element.id}
                  title={element.title}
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
      </div>
    </Layout>
  );
}
