"use client";

import Button from "@/components/Button";

const Header = () => {
    return (
        <div className="w-full pt-8">
            <div className="mx-auto max-w-7xl text-center">
                <div className="color-gradient font-mono">Our events</div>
                <h1 className="mt-4 text-[48px] uppercase">
                    <span className="relative [background:linear-gradient(55.37deg,_rgba(136,_36,_220,_0.25),_rgba(177,_33,_97,_0.25))]">
                        STAY
                    </span>
                    <span className="ml-7">UP TO DATE</span>
                </h1>

                <p className="mx-auto mb-6 mt-6 max-w-[558px] font-mono text-[16px] text-thistle">
                    Add our calendar to yours to stay informed about all our activities, or select
                    specific events you’d like to add.
                </p>

                <Button
                    className="mx-auto mt-4 flex items-center gap-3 font-heading text-xl uppercase"
                    style={{ width: "fit-content" }}
                    onClick={() => {
                        // Add functionality here
                        console.log("Subscribed to calendar!");
                    }}
                >
                    SUBSCRIBE TO OUR CALENDAR FOR FREE
                </Button>

                <div className="mt-4 font-mono text-base text-thistle">
                    <p>Syncs with Apple or Google Calendar,</p>
                    <p>unsubscribe any time.</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
