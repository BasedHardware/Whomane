export default async function handler(req, res) {
  const { socials, question } = req.body;
  let urls = '';
  socials.slice(0, 5).forEach(social => {
    urls += social.url + ', ';
  });

  try {
    const response = await fetch('https://api.workflows.tryleap.ai/v1/runs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.LEAP_API_KEY,
      },
      body: JSON.stringify({
        workflow_id: "wkf_0CzZBKTedkvVrT",
        webhook_url: "https://google.com",
        input: {
          url: urls,
          question: question
        }
      })
    });

    const responseData = await response.json();
    const workflow_id = responseData.id;

    let finishedRunning= false;
    while (!finishedRunning) {
      const response = await fetch(`https://api.workflows.tryleap.ai/v1/runs/${workflow_id}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': process.env.LEAP_API_KEY,
        }
      });
      const responseData = await response.json();
      if (responseData.status === 'completed') {
        finishedRunning = true;

        const output = responseData.output;
        res.status(200).json({ linkedinSummary: output });
        return;
      }
      await new Promise(r => setTimeout(r, 1000));
    }
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
}