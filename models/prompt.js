import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required. ']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required. '],
    }
});

// Get the prompt that already exists on the models object or create a new prompt based on the promptschema
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
