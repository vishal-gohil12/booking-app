import { Packages } from "@/app/lib/TourPackage";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const allPackage = await Packages.find();
        return NextResponse.json(allPackage);
    } catch(e) {
        return NextResponse.json({
            Error: "Error while retriving data"
        }, { status: 500 });
    }
}
