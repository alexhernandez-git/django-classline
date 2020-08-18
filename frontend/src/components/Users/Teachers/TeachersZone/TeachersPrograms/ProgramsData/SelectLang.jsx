import React from "react";
import Select from "react-select";

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
                    '&:hover': { borderColor: '1px solid #ccc' }, // border style on hover
                    border: '1px solid #ccc', // default border color
                    boxShadow: 'none', // no box-shadow
                }),
            }}
            // value={programContext.myProgramState.program_language}

            getOptionLabel={(option) => option.label + ' / ' + option.nativeName}
            placeholder={<div>Selecciona tu idioma</div>}
            menuShouldScrollIntoView={false}
            value={form.values.lang}
            onChange={(value) => form.setFieldValue("lang", value)}
            theme={(theme) => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    text: 'orangered',
                    primary25: '#ccc',
                    primary50: '#ccc',
                    primary: '#212529',
                },
            })} />
    );
};
export default SelectLang;
