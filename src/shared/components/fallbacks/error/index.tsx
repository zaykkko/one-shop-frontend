import ErrorStyles from "./error.scss";
import SharedStyles from "@shared/styles.scss";

type IErrorProps = {
    eventId: string | null;
    resetError(): void;
};

const Error = ({resetError}: IErrorProps) => (
    <section className={SharedStyles.container}>
        <div className={ErrorStyles.errorFallback}>
            <h1>Oops, ¡ocurrió un error!</h1>
            <h2>
                Al parecer ocurrió un error inesperado mientras cargábamos
                algunas cositas.
                <br />
                Podríamos intentar cargarlas de nuevo si quieres...
            </h2>
            <div>
                <button
                    type="button"
                    className={SharedStyles.btn_basic}
                    onClick={resetError}
                >
                    Reintentar
                </button>
            </div>
        </div>
    </section>
);

export default Error;
