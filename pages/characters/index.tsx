import { useEffect, useState } from "react";
import md5 from "md5";
import { GetServerSideProps } from "next";
import Link from "next/link";
import CardCharactersPage from "../../components/CardCharactersPage";
import Layout from "../../components/Layout";
import dataCaracters from "../../Characters.json";
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let page = 0;
  if (context?.query?.page <= "1") {
    page = 1;
  } else {
    page = parseInt(context?.query?.page?.toString());
  }

  return {
    props: {
      data: "result",
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
            {data.data.map((character: any) => {
              return (
                <CardCharactersPage
                  key={character.id}
                  idCharacter={`${character.id}`}
                  imgCard={`${character.thumbnail.path}`}
                  nameCard={character.name}
                />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
