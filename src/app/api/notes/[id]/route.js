// src/app/api/notes/[id]/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req, context) {
  const { id } = await context.params; // ✅ Await params

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  const { text, done } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection("notes").updateOne(
    { _id: new ObjectId(String(id)) },
    { $set: { text, done } }
  );

  return Response.json({ success: true });
}

export async function DELETE(req, context) {
  const { id } = await context.params; // ✅ Await params

  if (!id) {
    return new Response("Missing ID", { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  await db.collection("notes").deleteOne({ _id: new ObjectId(String(id)) });

  return Response.json({ success: true });
}
