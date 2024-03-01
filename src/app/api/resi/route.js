import connectMongoDB from "../../../libs/mongodbConn";
import Resi from "../../../models/Resi";
import { NextResponse } from "next/server";

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);

export async function GET() {
  await connectMongoDB();
  const resis = await Resi.find();
  return NextResponse.json(resis, { status: 200 });
}

export async function POST(req, res) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    const noResi = formData.get("noResi");
    const name = formData.get("name");
    const telp = formData.get("telp");
    const vendor = formData.get("vendor");

    const file = formData.getAll("photo")[0];

    const photo = `./public/images/${Date.now()}-${file.name}`;
    const filePath = `/images/${Date.now()}-${file.name}`;
    await pump(file.stream(), fs.createWriteStream(photo));

    await Resi.create({ noResi, name, telp, vendor, photo: filePath });

    return NextResponse.json(
      { message: "Resi berhasil ditambahkan" },
      { status: 201 },
      { file }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { status: 400 },
      { message: "Gagal menambahkan resi" }
    );
  }
}

export async function PUT(req, res) {
  try {
    await connectMongoDB();
    const { noResi } = await req.json();
    const isAccepted = true;

    const resi = await Resi.findOne({ noResi });
    if (!resi) {
      return NextResponse.json(
        { message: "Resi tidak ditemukan" },
        { status: 404 }
      );
    }

    await Resi.findOneAndUpdate({ noResi }, { isAccepted });

    return NextResponse.json(
      { message: "Resi diterima!", noResi },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { status: 400 },
      { message: "Gagal menerima resi" }
    );
  }
}
