import { useFieldContext } from "@/hooks";
import { Select as BaseSelect } from "../ui/select";

export type Props = Omit<Parameters<typeof BaseSelect>[0], "onChange" | "value">;

export const Select = (props: Props) => {
    const field = useFieldContext<string>();
    return (
        <BaseSelect
            value={field.state.value}
            onValueChange={value => field.handleChange(value)}
            {...props}
        />
    );
};
