import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/enhance", async (req,res)=>{
  try{

    const {image} = req.body;

    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: "enhance this image high quality",
      size:"1024x1024"
    });

    res.json({
      image:`data:image/png;base64,${result.data[0].b64_json}`
    });

  }catch(err){
    res.status(500).json({error:err.message})
  }
});

app.listen(3000,()=>{
  console.log("Server running on port 3000");
});
