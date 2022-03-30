import { useEffect, useState } from "react";
import md5 from "md5";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CardCharactersPage from "../../components/CardCharactersPage";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/database";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let page = 0;
  if (context?.query?.page <= "1") {
    page = 1;
  } else {
    page = parseInt(context?.query?.page?.toString());
  }

  const mongodb = await getDatabase();
  const dataCharacters = await mongodb
    .db()
    .collection("Characters")
    .find()
    .toArray();

  const tab = [];
  if (page === 1) {
    for (let index = 0; index < 100; index++) {
      tab.push({
        id: dataCharacters[index].id,
        name: dataCharacters[index].name,
        path: `${dataCharacters[index].thumbnail.path}`,
        extension: `${dataCharacters[index].thumbnail.extension}`,
      });
    }
  } else {
    for (let index = (page - 1) * 100 + 1; index < page * 100 + 1; index++) {
      tab.push({
        id: dataCharacters[index].id,
        name: dataCharacters[index].name,
        path: `${dataCharacters[index].thumbnail.path}`,
        extension: `${dataCharacters[index].thumbnail.extension}`,
      });
    }
  }

  return {
    props: {
      data: JSON.stringify(tab),
      pageSelected: page,
    },
  };
};

export default function Characters({ data, pageSelected }: any) {
  const dataJSON = JSON.parse(data);
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="arow">
            {dataJSON.map((character: any) => {
              return (
                <Link key={character.id} href={`/characters/${character.id}`}>
                  <a>
                    <CardCharactersPage
                      idCharacter={`${character.id}`}
                      imgCard={`${character.path}.${character.extension}`}
                      nameCard={character.name}
                      alt={`${character.path}`}
                    />
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <nav aria-label="navpagination">
          <ul className="pagination">
            <li className="page-item">
              <Link href={`/characters?page=${pageSelected - 1}`}>
                <a className="page-link" tabIndex={-1}>
                  Précédent
                </a>
              </Link>
            </li>

            <li className="page-item">
              <Link href={`/characters?page=${pageSelected + 1}`}>
                <a className="page-link" tabIndex={+1}>
                  Suivant
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </Layout>
    </>
  );
}
