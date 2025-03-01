import { GoalCard } from "./GoalCard";
import { goalsData } from "./GoalsData";

export default function Goals() {
    return (
        <>
            <section className="relative mt-20 w-full items-center justify-between text-white">
                <GoalCard goal={goalsData[0]} />
            </section>
        </>
    );
}
