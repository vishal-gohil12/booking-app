import { Packages } from "@/app/lib/TourPackage";
import { User } from "@/app/lib/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
   try {
    const { name, email, phone, travelers, specialRequest, tour_id } = await req.json();

    if (!name || !email || !phone || !travelers || !tour_id) {
        return NextResponse.json({ error: 'All required fields must be provided' }, { status: 400 });
    }

    const tourPackage = await Packages.findById(tour_id);
    if (!tourPackage) {
        return NextResponse.json({ error: 'Tour package not found' }, { status: 404 });
    }

    const newUser = new User({
        name,
        email,
        phone,
        travelers,
        specialRequest,
        tour_id
    });

    await newUser.save();
    return NextResponse.json({ message: 'User Successfully Booked The Tour',  user: newUser }, { status: 201 });
   } catch {
    return NextResponse.json({
        Error: "Error while "
    }, { status: 500 });
   }
}
