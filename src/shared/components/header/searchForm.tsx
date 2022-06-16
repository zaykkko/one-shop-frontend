import HeaderStyles from "./header.scss";
import SharedStyles from "@shared/styles.scss";

import {useCallback} from "react";
import {useForm} from "react-hook-form";
import MagnifyingGlass from "@sprite/ms-glass.svg";

interface ISearchForm {
    query: string;
}

const SearchForm = () => {
    const {
        register,
        handleSubmit,
        //formState: {errors},
    } = useForm<ISearchForm>({
        defaultValues: {
            query: "",
        },
    });
    const onSubmit = useCallback((data: ISearchForm) => console.log(data), []);

    return (
        <form
            className={HeaderStyles.searchForm}
            method="GET"
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset className={HeaderStyles.searchForm__fieldset}>
                <label
                    className={SharedStyles["visually-hidden"]}
                    htmlFor="search-query"
                >
                    ¿Qué deseas buscar?
                </label>
                <input
                    id="search-query"
                    type="search"
                    placeholder="¿Qué deseas buscar?"
                    autoComplete="off"
                    spellCheck="false"
                    required={true}
                    {...register("query")}
                />
            </fieldset>
            <button type="submit">
                <MagnifyingGlass className={HeaderStyles.icon__search} />
            </button>
        </form>
    );
};

export default SearchForm;
