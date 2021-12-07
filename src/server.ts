import { app } from './app';

const port = process.env.PORT;

app.listen(process.env.PORT, () => console.log(`Server is running! ${port}`));