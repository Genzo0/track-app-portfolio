import connectMongoDB from "../../../../libs/mongodbConn";
import Resi from "../../../../models/Resi";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectMongoDB();
  const resi = await Resi.findOne({ noResi: params.id });
  if (!resi) {
    return NextResponse.json(
      { message: "Resi tidak ditemukan" },
      { status: 404 }
    );
  }
  return NextResponse.json(resi, { status: 200 });
}
