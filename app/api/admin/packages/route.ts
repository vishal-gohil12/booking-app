import { Packages } from "@/app/lib/TourPackage"
import { NextRequest, NextResponse  } from "next/server"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

interface CloudinaryUpload {
    public_id: string;
    secure_url: string;
    [key: string]: unknown;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); 
        const file = formData.get('images') as File | null;

        if(!file) {
            return NextResponse.json({
                error: "File is not found"
            }, { status : 404});
        }

        const bytes = await file.arrayBuffer();
        const buffer =  Buffer.from(bytes);

        const result = await new Promise<CloudinaryUpload>((resolve, reject) => {
            const uploadImage = cloudinary.uploader.upload_stream({
                folder: "Images"
            }, (err, res) => {
                if(err) reject(err);
                else resolve(res as CloudinaryUpload);
            })
            uploadImage.end(buffer)
        });

        const newPackageData = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: formData.get("price"),
            availableDates: formData.get("availableDates"),
            images: result.secure_url, 
        };

        const newPackage = new Packages(newPackageData);
        const savedPackage = await newPackage.save();

        return NextResponse.json({
            data: savedPackage,
        });
    } catch {
        return NextResponse.json({
            Error: "Error while posting data"
        }, { status: 500 });
    }  
}
