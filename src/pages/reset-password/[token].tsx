import { NextPage, GetServerSideProps } from "next";
import React from "react";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: NextPage<ResetPasswordProps> = ({ token }) => {
  return <div>token is {token}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      token: params?.token as string,
    },
  };
};

export default ResetPassword;
