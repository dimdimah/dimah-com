import React from "react";

const page = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <main className="container max-w-[725px] leading-relaxed antialiased h-screen">
        <h1>last chapter {id} </h1>
      </main>
    </>
  );
};

export default page;
