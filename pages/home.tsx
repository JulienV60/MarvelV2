import Layout from "../components/Layout";
import md5 from "md5";
import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      data: "dataCharacters",
    },
  };
};
export default function home({ data }: any): JSX.Element {

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
