import { useFieldContext } from "@/hooks";
import { Textarea as BaseTextarea } from "../ui/textarea";

export type Props = Omit<Parameters<typeof BaseTextarea>[0], "onChange" | "value">;

export const Textarea = (props: Props) => {
    const field = useFieldContext<string>();
    return (
        <BaseTextarea
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            {...props}
        />
    );
};
