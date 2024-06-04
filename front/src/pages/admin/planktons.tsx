import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { createPlankton } from "../../../lib/PlanktonsServices";
import Navbar from "../components/Navbar";
import bgStyles from "../../styles/bg.module.css";
import fontStyles from "../../styles/font.module.css";

const CreateForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      picture: null,
      localisation: "",
      water_temp: "",
      bloom_period: "",
    },
    onSubmit: async (values: any) => {
      try {
        const response = await createPlankton(values);
        alert("Adding plankton to the list successfully");
      } catch (error) {
        console.error("Failed:", error);
        alert("Failed to add plankton. Please try again.");
      }
    },
  });

  const handleFileChange = (event: any) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("picture", file);
  };

  return (
    <div className={`${bgStyles.backgroundImage}`}>
      <Navbar />
      <div
        className={`flex flex-col justify-center items-center rounded-md m-auto bg-[#08252D] w-[800px] pt-8 bg-opacity-70`}
      >
        <h2 className={`text-[#EEEE] ${fontStyles.secondaryFont}`}>
          Ajouts d'un plancton à la base de données
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className={`flex flex-col items-center ${fontStyles.tertiaryFontRegular} mt-10 w-[700px]`}
        >
          <div
            className={`input input-bordered flex items-center gap-2 mb-5 w-[700px] `}
          >
            <label className={fontStyles.tertiaryFontBold} htmlFor="name">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nom"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-[700px] ml-5 text-[#186377]"
            />
          </div>

          <div
            className={`textarea flex items-center gap-2 mb-5 w-[700px] ${fontStyles.tertiaryFontRegular}`}
          >
            <label
              className={fontStyles.tertiaryFontBold}
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
              className="w-[700px] text-[#186377] h-40"
            ></textarea>
          </div>

          <div className="input input-bordered flex items-center gap-2 mb-5 w-[700px]">
            <label className={fontStyles.tertiaryFontBold} htmlFor="picture">
              Image
            </label>
            <input
              id="picture"
              name="picture"
              type="file"
              onChange={handleFileChange}
              className="w-[700px] ml-5 text-[#186377]"
            />
          </div>

          <div className="input input-bordered flex items-center gap-2 mb-5 w-[700px]">
            <label
              className={fontStyles.tertiaryFontBold}
              htmlFor="localisation"
            >
              Localisation
            </label>
            <input
              id="localisation"
              name="localisation"
              type="text"
              placeholder="Localisation"
              onChange={formik.handleChange}
              value={formik.values.localisation}
              className="w-[700px] ml-5 text-[#186377]"
            />
          </div>

          <button
            type="submit"
            className={`mb-6 bg-[#186377] text-[#EEEEEE] hover:text-[#c0bbb7] hover:bg-[#08252D] w-[200px] h-[40px] rounded-md ${fontStyles.secondaryFont} ${fontStyles.corps} xs:max-sm:w-[250px] xs:max-sm:h-[40px] sm:max-sm:btn-sm md:max-md:btn-md`}
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
