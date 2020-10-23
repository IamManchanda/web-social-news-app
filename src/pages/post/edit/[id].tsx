import { withUrqlClient } from "next-urql";
import React from "react";
import { LayoutWrapper } from "../../../components/layout-wrapper";
import { createUrqlClient } from "../../../utils/create-urql-client";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  return (
    <LayoutWrapper>
      <div>Edit Post</div>
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
