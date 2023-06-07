import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req: Request, { params }: any) => {
  try {
    await connectToDB();
    const user = await User.findById(params.id);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch users", { status: 500 });
  }
};
