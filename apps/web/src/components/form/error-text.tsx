interface Props {
    /**
     * Whether or not to require that the component has been touched once before displaying errors.
     * @default true
     */
    requireTouch?: boolean;
    /** The field API for a given form element. */
    field: {
        state: {
            meta: {
                isValid: boolean;
                isTouched: boolean;
                errors: Array<{ message: string } | undefined>;
            };
        };
    };
}

/**
 * A component that displays any errors associated with a given form field.
 */
export const ErrorText = ({ field, requireTouch = true }: Props) => {
    const condition = !field.state.meta.isValid && (!requireTouch || field.state.meta.isTouched);

    return (
        condition && (
            <em className="text-red-400" role="alert">
                {field.state.meta.errors
                    .filter(error => !!error)
                    .map(error => error.message)
                    .join(", ")}
            </em>
        )
    );
};
