import { Invoice } from "@/app/lib/Invoice";
import { Packages } from "@/app/lib/TourPackage";
import { User } from "@/app/lib/User";
import { NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { user, tour_id, travelers, specialRequest } = await req.json();
        const packageDetails = await Packages.findById(tour_id);
        const userDetail = await User.findById(user._id);

        if (!packageDetails) {
            return NextResponse.json(
                { error: "Tour package not found" },
                { status: 404 }
            );
        }
      
        if (!userDetail) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }
      
        const totalPrice = packageDetails.price * travelers;

        const invoice = new Invoice({
            user: userDetail._id, 
            package: packageDetails._id, 
            numberOfTravelers: travelers,
            specialRequest,
            totalPrice,
        });

        await invoice.save();
    
        return NextResponse.json({ message: "Invoice generated", invoice }, { status: 201 });
    } catch {
        return NextResponse.json({
            Error: "Error while generating  data"
        }, { status: 500 });
    }
}
