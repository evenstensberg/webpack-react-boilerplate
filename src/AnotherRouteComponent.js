import React from "react";
import { useSearchParams } from 'react-router-dom';

const AnotherRouteComponent = () => {
    const [searchParams] = useSearchParams();
    for (const entry of searchParams.entries()) {
        console.log(entry);
      }
  return (
    <>
      <h2>Hello from another Route</h2>
    </>
  );
};
export default AnotherRouteComponent;
