import { Textarea as BaseTextarea } from "@repo/ui/components/textarea";
import { useFieldContext } from "@/hooks";

export type Props = Omit<Parameters<typeof BaseTextarea>[0], "onChange" | "value">;

export const Textarea = (props: Props) => {
    const field = useFieldContext<string>();
    return (
        <BaseTextarea
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={e => field.handleChange(e.target.value)}
            {...props}
        />
    );
};
