import cohere from "cohere-ai";
import express from "express";
import "dotenv/config";

cohere.init(process.env.COHERE_API_KEY);
async function generateBerateText(direction) {
  const response = await cohere.generate({
    model: "command",
    prompt: `I am building a hackathon project that berates user in a funny way if they don't look into someones eye while talking to them. You are to generate the funny berating text. Right now the user is looking ${direction}`,
    max_tokens: 50,
    temperature: 1
  })

  if (response.statusCode != 200) {
    console.log("\n\n-----\nGeneration failed.\n\n-----\n");
    return new Error("Generation failed.");
  }

  return response.body.generations[0].text;
}

const app = express();
app.get('/:direction', async (req, res) => {
  const direction = req.params.direction || "bottom";
  console.log(direction);

  const text = await generateBerateText(direction);
  //if (text instanceof Error) {
  //  res.send("error");
  //  return;
  //}

  console.log(text);
  res.send(text)
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
