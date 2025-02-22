import colors from 'colors';
import app from './server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(colors.blue.italic(`Server is running on port ${PORT} 😘`));
});
