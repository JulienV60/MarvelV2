import { GetServerSideProps } from "next";
import ComicsForCharacterDetail from "../../../components/ComicsForCharacterDetail";
import EventForCharacterDetail from "../../../components/EventForCharacterDetail";
import Layout from "../../../components/Layout";
import StoriesForCharactersDetails from "../../../components/StoriesForCharactersDetails";
import Characters from "../../../Characters.json";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    `http://localhost:3000/api/call/detail/${context?.params?.idCharacter}?rubrique=characters`
  )
    .then((response) => response.json())
    .then((result) => result.data.results);
  return {
    props: {
      data: response,
    },
  };
};
const characters = [{ Element }];
console.log(Characters);
export default function CharacterDetails({ data }: any): JSX.Element {
  console.log(data);
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
                src={`${data[0].thumbnail.path}.jpg`}
              />
            </div>
            <div className="col-4 mx-auto">
              <h1>{data[0].name}</h1>
              <p>{data[0].description}</p>
              <br></br>
            </div>
          </div>
        </section>
        <br></br>
        <section>
          <h2>Comics :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {data[0].comics.items.map((element: any) => {
              return (
                <ComicsForCharacterDetail
                  key={element.name}
                  data={element.resourceURI}
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Events :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {data[0].events.items.map((element: any) => {
              return (
                <EventForCharacterDetail
                  key={element.title}
                  data={element.resourceURI}
                />
              );
            })}
          </div>
        </section>
        <br></br>
        <section>
          <h2>Stories :</h2>
          <div className="row overflow-auto" style={{ height: "25rem" }}>
            {data[0].stories.items.map((element: any) => {
              return (
                <StoriesForCharactersDetails
                  key={element.title}
                  data={element.resourceURI}
                />
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
