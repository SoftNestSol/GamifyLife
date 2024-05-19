const {getUserInterests} =  require("../repositories/UserRepository");
const { get } = require("../routes/user");

const axios = require('axios').default;

const suggestTask =  async (userId)=>{
    // const interests = getUserInterests(userId);
    const interests =['Fitness','Gaming','Yoga']
    const context = "I'm developing a task suggestion mechanism based on user interests. The user has indicated interests in various areas such as technology, art, cooking, and fitness. I need the AI agent to generate task suggestions tailored to these interests. For example, suggesting coding projects for technology enthusiasts, art tutorials for art lovers, new recipes for cooking enthusiasts, and workout routines for fitness enthusiasts. Can you provide recommendations for tasks or activities related to these interests?"
    const prompt =`Generate task suggestions based on user interests. Interests are ${interests}. Provide a short title and a brief description (50 words max) for each task. Example: "Create Digital Art: Use digital tools to express creativity. Experiment with colors, shapes, and textures to produce unique artworks."`
    const options = {
        method: 'POST',
        url: 'http://20.19.88.114:33337/v1/chat/completions',
        headers: {'Content-Type': 'application/json'},
        data: {
          messages: [
            {content: context, role: 'system'},
            {content: prompt, role: 'user'}
          ],
          model: "stable-zephyr-3b",
          stream: false,
          max_tokens: 2048,
          stop: ['hello'],
          frequency_penalty: 0,
          presence_penalty: 0,
          temperature: 0.7,
          top_p: 0.95
        }
      };
      console.log("here1")
      try {
        const{ resp }= await axios.request(options);
        // const data = resp['choices'][0]['message']['content']
        console.log(resp);
      } catch (error) {
        console.error(error);
      }
      console.log("here2")


}
module.exports ={
    suggestTask
}