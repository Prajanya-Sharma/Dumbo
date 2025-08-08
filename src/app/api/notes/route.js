import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const notes = await db.collection("notes").find({}).toArray();

  return new Response(JSON.stringify(notes), { status: 200 });
}

export async function POST(req) {
  const { text } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const newNote = {
    text,
    done: false,
    createdAt: new Date(),
    color: getRandomColor(),
  };

  const result = await db.collection("notes").insertOne(newNote);
  return new Response(
    JSON.stringify({ ...newNote, _id: result.insertedId }),
    { status: 201 }
  );
}

function getRandomColor() {
  const colors = ["#FFD700", "#FFB6C1", "#90EE90", "#ADD8E6", "#FFDEAD"];
  return colors[Math.floor(Math.random() * colors.length)];
}
