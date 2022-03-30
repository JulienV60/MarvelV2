import Layout from "../components/Layout";
import md5 from "md5";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const dataCharacters = require("../Characters.json");
  const time = Number(new Date());
  const hash = md5(
    time +
      `${process.env.REACT_APP_MARVEL_PRIVATE_KEY}` +
      `${process.env.REACT_APP_MARVEL_PUBLIC_KEY}`
  );

  return {
    props: {
      data: dataCharacters,
    },
  };
};
export default function home({ data }: any): JSX.Element {

  const allData = [];
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * 100);
    allData.push(data[random]);
  }

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
