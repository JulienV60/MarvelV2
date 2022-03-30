import { useEffect, useState } from "react";
import md5 from "md5";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CardCharactersPage from "../../components/CardCharactersPage";
import Layout from "../../components/Layout";
import { getDatabase } from "../../src/database";
import CardComics from "../../components/CardComics";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let page = 0;
  if (context?.query?.page <= "1") {
    page = 1;
  } else {
    page = parseInt(context?.query?.page?.toString());
  }

  const tab = [];
  if (page === 1) {
    const mongodb = await getDatabase();

    tab.push(
      await mongodb.db().collection("Comics").find().limit(50).toArray()
    );
  } else {
    const mongodb = await getDatabase();

    tab.push(
      await mongodb
        .db()
        .collection("Comics")
        .find()
        .skip((page - 1) * 50)
        .limit(50)
        .toArray()
    );
  }

  return {
    props: {
      data: JSON.stringify(tab),
      pageSelected: page,
    },
  };
};

export default function Comics({ data, pageSelected }: any) {
  const dataJSON = JSON.parse(data);

  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="arow">
            {dataJSON[0].map((comic: any) => {
              return (
                <Link key={comic.id} href={`/comics/${comic.id}`}>
                  <a>
                    <CardComics
                      id={`${comic.id}`}
                      idComic={`${comic.id}`}
                      imgCard={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      nameCard={comic.title}
                      alt={`${comic.thumbnail.path}`}
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
              <Link href={`/comics?page=${pageSelected - 1}`}>
                <a className="page-link" tabIndex={-1}>
                  Précédent
                </a>
              </Link>
            </li>

            <li className="page-item">
              <Link href={`/comics?page=${pageSelected + 1}`}>
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
