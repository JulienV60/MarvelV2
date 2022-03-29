import md5 from "md5";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const time = Number(new Date());
  const hash = md5(
    time +
      `${process.env.REACT_APP_MARVEL_PRIVATE_KEY}` +
      `${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
  );

  const response = await fetch(
    `http://gateway.marvel.com/v1/public/creators?ts=${time}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${hash}`
  )
    .then((data) => data.json())
    .then((response) => response.data.results);

  return {
    props: {
      data: response,
    },
  };
};

export default function Creators({ data }: any): JSX.Element {
  return <></>;
}
