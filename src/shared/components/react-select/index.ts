type ProvidedTypes = Record<string, unknown>;

type StateTypes = {
    isFocused: boolean;
    isSelected: boolean;
};

export default {
    control: (provided: ProvidedTypes) => ({
        ...provided,
        backgroundColor: "var(--white)",
    }),
    indicatorSeparator: (provided: ProvidedTypes) => ({
        ...provided,
        backgroundColor: "var(--black-30)",
    }),
    placeholder: (provided: ProvidedTypes) => ({
        ...provided,
        color: "var(--black-50)",
    }),
    option: (provided: ProvidedTypes, state: StateTypes) => ({
        ...provided,
        backgroundColor: state.isFocused
            ? "var(--blue-80)"
            : state.isSelected
            ? "var(--blue-120)"
            : "transparent",
    }),
    menu: (provided: ProvidedTypes) => ({
        ...provided,
        backgroundColor: "var(--white)",
        border: "2px solid var(--black-30)",
        borderTop: "unset",
    }),
    singleValue: (provided: ProvidedTypes) => ({
        ...provided,
        color: "var(--black-50)",
    }),
};
