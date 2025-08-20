import { NextResponse, NextRequest } from "next/server";
import { resourceService } from "@/lib/services/resourceService";

export async function GET() {
    try {
        const resources = await resourceService.getAllResources();
        return NextResponse.json({
            success: true,
            data: resources,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newResource = await resourceService.createResource(body);
        return NextResponse.json(
            {
                success: true,
                data: newResource,
            },
            { status: 201 },
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 },
        );
    }
}
