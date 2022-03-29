import md5 from "md5";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const page: any = context.query.page;
  const time = Number(new Date());
  const hash = md5(
    time +
      `${process.env.REACT_APP_MARVEL_PRIVATE_KEY}` +
      `${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
  );

  const response = await fetch(
    `http://gateway.marvel.com/v1/public/comics?ts=${time}&apikey=${
      process.env.REACT_APP_MARVEL_PUBLIC_KEY
    }&hash=${hash}&limit=100&offset=${(page - 1) * 100}`
  )
    .then((data) => data.json())
    .then((response) => response.data.results);

  return {
    props: {
      data: response,
      pageSelected: page,
    },
  };
};

export default function Comics({ data, pageSelected }: any): JSX.Element {
  console.log(pageSelected);
  console.log(data);
  return <></>;
}
