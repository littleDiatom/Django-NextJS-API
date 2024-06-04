import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getOnePlankton } from "../../../lib/PlanktonsServices";
import { Plankton } from "../../lib/interfaces";

const Plankton = () => {
  const router = useRouter();
  const { id } = router.query;

  const [plankton, setPlankton] = useState<Plankton>("");

  useEffect(() => {
    const fetchPlankton = async () => {
      try {
        const plankton = await getOnePlankton(id);
        setPlankton(plankton);
      } catch (error) {
        console.error("Failed to fetch the product:", error);
      }
    };

    fetchPlankton();
  }, []);

  return (
    <div>
      <p>plankton id: {id}</p>
      {plankton.name}
      <br />
      {plankton.description}
      <br />
      <p>{plankton.localisation}</p>
    </div>
  );
};

export default Plankton;
