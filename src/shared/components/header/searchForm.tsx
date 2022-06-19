import HeaderStyles from "./header.scss";
import SharedStyles from "@shared/styles.scss";

import classnames from "classnames";
import {useCallback, useId} from "react";
import {useForm} from "react-hook-form";
import MagnifyingGlass from "@sprite/ms-glass.svg";

interface ISearchFormInputs {
    query: string;
}

const SearchForm = () => {
    const formId = useId();
    const {
        register,
        handleSubmit,
        //formState: {errors},
    } = useForm<ISearchFormInputs>({
        defaultValues: {
            query: "",
        },
    });
    const onSubmit = useCallback(
        (data: ISearchFormInputs) => console.log(data),
        []
    );

    return (
        <form
            className={HeaderStyles.searchForm}
            method="GET"
            onSubmit={handleSubmit(onSubmit)}
        >
            <fieldset className={HeaderStyles.searchForm__fieldset}>
                <label
                    className={SharedStyles["visually-hidden"]}
                    htmlFor={formId + "search-query"}
                >
                    ¿Qué deseas buscar?
                </label>
                <input
                    id={formId + "search-query"}
                    type="search"
                    placeholder="¿Qué deseas buscar?"
                    autoComplete="off"
                    spellCheck="false"
                    required={true}
                    {...register("query")}
                />
            </fieldset>
            <button type="submit">
                <MagnifyingGlass
                    className={classnames(
                        SharedStyles.icon,
                        HeaderStyles.icon__search
                    )}
                />
            </button>
        </form>
    );
};

export default SearchForm;
