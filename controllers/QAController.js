const conexion = require("../database/db");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.ConsultQA = async (req, res) => {
  try {
    conexion.query("SELECT * FROM qa", async (err, results) => {
      res.send(results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.ConsultQAById = async (req, res) => {
  try {
    conexion.query(
      "SELECT * FROM qa where id=?",
      [req.params.id],
      async (err, results) => {
        res.send(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.CreateQA = async (req, res) => {
  try {
    const question = req.body.question;
    const answer = req.body.answer;
    const data = {
      question,
      answer,
    };
    conexion.query("INSERT INTO qa SET ?", data, (err, conn) => {
      if (err) {
        console.log(err);
      }
      res.send(req.body);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.generateText = async (req, res) => {
    try {
      let text = 'Actúa como un consultor experto en finanzas y criptomonedas bajo el seudónimo "CryptoBot".Tu respuesta no debe ser superior a 300 caracteres. Usa un nivel de temperatura=5.La pregunta es:' + req.body.prompt 
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: text,
          max_tokens: 300,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            }
          });
        }
      }
};

exports.generateAnalisis = async (req, res) => {
  try {
    let text = 'Actúa como un analista financiero profesional. Necesito que analices el precio histórico donde expliques, en un párrafo de máximo 5 lineas, el comportamiento de los siguientes datos de una criptomoneda.Ten en cuenta el precio máximo alcanzado y precio mínimo alcanzado. Los datos son los siguientes:' + req.body.prompt 
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 300,
      });
      res.status(200).json({ result: completion.data.choices[0].text });
    } catch(error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: 'An error occurred during your request.',
          }
        });
      }
    }
};


exports.EditQA = async (req, res) => {
  try {
    conexion.query(
      "UPDATE qa set ? WHERE id = ?",
      [req.body, req.params.id],
      (err, conn) => {
        res.send(req.body);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.DeleteQA = async (req, res) => {
  try {
    conexion.query(
      "DELETE FROM qa WHERE id = ?",
      [req.params.id],
      (err, conn) => {
        res.send({});
      }
    );
  } catch (error) {
    console.log(error);
  }
};
