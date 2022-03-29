import { useEffect, useState } from "react";
import md5 from "md5";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CardCharactersPage from "../../components/CardCharactersPage";
import Layout from "../../components/Layout";
const dataCharacters = require("../../Characters.json");

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let page = 0;
  if (context?.query?.page <= "1") {
    page = 1;
  } else {
    page = parseInt(context?.query?.page?.toString());
  }

  const tab = [];
  if (page === 1) {
    for (let index = 0; index < 100; index++) {
      tab.push(dataCharacters[index]);
    }
  } else {
    for (let index = (page - 1) * 100 + 1; index < page * 100 + 1; index++) {
      tab.push(dataCharacters[index]);
    }
  }
  return {
    props: {
      data: tab,
      pageSelected: page,
    },
  };
};

export default function Characters({ data, pageSelected }: any) {
  return (
    <>
      <Layout>
        <Link href={`/characters?page=${pageSelected - 1}`}>
          <a> Back </a>
        </Link>
        <Link href={`/characters?page=${pageSelected + 1}`}>
          <a> Next </a>
        </Link>
        <div className="container-fluid">
          <div className="arow">
            {data.map((character: any) => {
              return (
                <CardCharactersPage
                  key={character[0].id}
                  idCharacter={`${character[0].id}`}
                  imgCard={`${character[0].thumbnail.path}`}
                  nameCard={character[0].name}
                />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
