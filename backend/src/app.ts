import express, { NextFunction, Request, response, Response } from "express";
import cors from "cors";

let user = {
  name: "",
  phone: "",
};

let status = "Dados recebidos";

const app = express();

app.use(express.json());
app.use(cors());

// app.post("/donate", (req: Request, res: Response) => {
//   const amount = req.body.amount || 0;

//   if (amount > 0) {
//     donation.amount += amount;
//     donation.user += 1;
//   }

//   return res.json({ message: "Thank you 🙏" });
// });

// const middleware = (req: Request, res: Response, next: NextFunction) => {
//   const headers = {
//     "Content-Type": "text/event-stream",
//     Connection: "keep-alive",
//     "Cache-Control": "no-cache",
//   };

//   res.writeHead(200, headers);

//   const data = `data: ${JSON.stringify("Dados recebidos")}\n\n`;

//   res.write(data);

//   next();
// };

app.post("/short-form", (req: Request, res: Response) => {
  const { name, phone } = req.body;

  if (name && phone) {
    setTimeout(() => {
      user = { name, phone };
    }, 10000);
  }

  return res.json({ name, phone });
});

const SEND_INTERVAL = 3000;

// const writeEvent = (res: Response, sseId: string, data: string) => {
//   res.write(`id: ${sseId}\n`);
//   res.write(`data: ${data}\n\n`);
// };

// const sendEvent = (_req: Request, res: Response) => {
//   res.writeHead(200, {
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//     "Content-Type": "text/event-stream",
//   });

//   const sseId = new Date().toDateString();

//   setInterval(() => {
//     writeEvent(res, sseId, JSON.stringify(user));
//   }, SEND_INTERVAL);

//   writeEvent(res, sseId, JSON.stringify(user));
// };

// app.get("/short-form", (req: Request, res: Response) => {
//   if (req.headers.accept === "text/event-stream") {
//     sendEvent(req, res);
//   } else {
//     res.json({ message: "Ok" });
//   }
// });

app.get("/sse", (req, res) => {
  // if (user.name === "") {
  //   setInterval(() => {
  //     res.write(`data: ${JSON.stringify("Dado não atualizado")}\n\n`);
  //   }, 2000);
  // }

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });
  let count = 1;

  setInterval(() => {
    res.write(`count: ${JSON.stringify(user)}\n\n`);
    count++;
  }, 2000);
});

// app.get("/dashboard", (req: Request, res: Response) => {
//   if (req.headers.accept === "text/event-stream") {
//     sendEvent(req, res);
//   } else {
//     res.json({ message: "Ok" });
//   }
// });

app.listen(3333, () => console.log("Application started on URL 🎉"));
