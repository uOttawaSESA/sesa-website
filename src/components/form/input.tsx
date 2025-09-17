import { useFieldContext } from "@/hooks";
import { Input } from "../ui/input";

export type Props = Omit<Parameters<typeof Input>[0], "onChange" | "value">;

export const TextInput = (props: Props) => {
    const field = useFieldContext<string>();
    return (
        <Input
            type="text"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            {...props}
        />
    );
};

export const NumberInput = (props: Props) => {
    const field = useFieldContext<number>();
    return (
        <Input
            type="number"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.valueAsNumber)}
            {...props}
        />
    );
};
