import React from "react";
import Select from "react-select";
import Prices from "static/data/prices/eur_prices_pack";

export const SelectPrice = ({ field, form, ...props }) => {
  const { options } = props;

  return (
    <Select
      {...field}
      {...props}
      options={options}
      placeholder={<div>Selecciona tu precio</div>}
      menuShouldScrollIntoView={false}
      value={
        !form.values.pack_price
          ? false
          : Prices.filter(
              (price) => price.level == form.values.pack_price.level
            )
      }
      onChange={(value) => form.setFieldValue("pack_price", value)}
      className="w-100 mr-2"
      styles={{
        control: (base, state) => ({
          ...base,
          "&:hover": { borderColor: "1px solid #ccc" }, // border style on hover
          border: "1px solid #ccc", // default border color
          boxShadow: "none", // no box-shadow
        }),
      }}
      searchable={false}
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
export default SelectPrice;
