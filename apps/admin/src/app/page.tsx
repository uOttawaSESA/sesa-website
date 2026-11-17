import { api } from "@/trpc/server";
import { AuthStatus } from "./auth-status";

export default async function Home() {
    const health = await api.health();

    return (
        <main className="p-8">
            <h1 className="font-bold text-2xl">SESA Admin</h1>
            <p className="text-muted-foreground">API: {health.ok ? "ok" : "down"}</p>
            <AuthStatus />
        </main>
    );
}
