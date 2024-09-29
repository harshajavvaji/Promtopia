import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try{
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error){
        // 500 is server error
        return new Response("Failed to create new Prompt", { status: 500 });
    } finally{

    }
}