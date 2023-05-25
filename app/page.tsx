import React from "react";
import Feed from "@components/Feed";

type Props = {};

const Home = (props: Props) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient texxt-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus nisl suscipit tincidunt sollicitudin. Vestibulum faucibus purus at turpis luctus, in
        molestie orci bibendum. Curabitur lectus libero, porta eu pellentesque eu, sollicitudin et ligula. Sed euismod ullamcorper odio. Quisque rutrum ultrices
        lectus eu mattis. Aenean eu facilisis eros.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
