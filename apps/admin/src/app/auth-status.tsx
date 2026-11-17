"use client";

import { authClient } from "@repo/auth/client";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";

export function AuthStatus() {
    const { data: session, isPending } = authClient.useSession();
    const [error, setError] = useState<string | null>(null);

    const signIn = async () => {
        setError(null);

        try {
            const result = await authClient.signIn.social({
                provider: "discord",
                callbackURL: "/",
            });

            if (result.error) {
                setError(result.error.message ?? "Discord login failed");
            }
        } catch (signInError) {
            setError(signInError instanceof Error ? signInError.message : "Discord login failed");
        }
    };

    const signOut = async () => {
        setError(null);

        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        window.location.reload();
                    },
                },
            });
        } catch (signOutError) {
            setError(signOutError instanceof Error ? signOutError.message : "Sign out failed");
        }
    };

    return (
        <section className="mt-6 rounded-lg border p-4">
            <h2 className="font-semibold">Authentication</h2>

            {isPending ? (
                <p className="mt-2 text-muted-foreground">Checking login status...</p>
            ) : session ? (
                <div className="mt-3 space-y-3">
                    <p>
                        Logged in as <strong>{session.user.name}</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">{session.user.email}</p>
                    <Button type="button" variant="outline" size="sm" onClick={signOut}>
                        Sign out
                    </Button>
                </div>
            ) : (
                <div className="mt-3 space-y-3">
                    <p className="text-muted-foreground">Not logged in</p>
                    <Button type="button" size="sm" onClick={signIn}>
                        Login with Discord
                    </Button>
                </div>
            )}

            {error ? <p className="mt-3 text-red-500 text-sm">{error}</p> : null}
        </section>
    );
}
