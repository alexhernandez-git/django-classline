import React from "react";
import Select from "react-select";
import Lenguages from "static/data/languages";

export const SelectLang = ({ field, form, ...props }) => {
  const { options } = props;

  return (
    <Select
      {...field}
      {...props}
      options={options}
      styles={{
        control: (base, state) => ({
          ...base,
          "&:hover": { borderColor: "1px solid #ccc" }, // border style on hover
          border: "1px solid #ccc", // default border color
          boxShadow: "none", // no box-shadow
        }),
      }}
      // value={programContext.myProgramState.program_language}

      getOptionLabel={(option) => option.label + " / " + option.nativeName}
      placeholder={<div>Selecciona tu idioma</div>}
      menuShouldScrollIntoView={false}
      value={
        !form.values.program_language
          ? false
          : Lenguages.filter(
              (lang) => lang.value == form.values.program_language.value
            )
      }
      onChange={(value) => form.setFieldValue("program_language", value)}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          text: "orangered",
          primary25: "#ccc",
          primary50: "#ccc",
          primary: "#212529",
        },
      })}
    />
  );
};
export default SelectLang;
