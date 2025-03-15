import Chapter from "./components/Chapter";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Chapter />
    </div>
  );
};

export default Home;
