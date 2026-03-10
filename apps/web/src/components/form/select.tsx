import { Select as BaseSelect } from "@repo/ui/components/select";
import { useFieldContext } from "@/hooks";

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
