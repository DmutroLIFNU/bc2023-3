const fs = require('fs');

const inputFilePath = 'data.json';
const outputFilePath = 'output.txt';

fs.readFile(inputFilePath, (err, data) => {
    if (err) {
        console.error('Помилка при зчитуванні з файлу:', err);
    } else {
        try {
            const jsonData = JSON.parse(data);
            const formatData = jsonData.map(item => {
                const date = new Date(item.exchangedate);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${month}.${day}.${year}:${item.rate}`;
            }).join('\n');

            fs.writeFile(outputFilePath, formatData, err => {
                if (err) {
                    console.error('Помилка при записі у файл:', err);
                } else {
                    console.log('Дані успішно записані у текстовий файл', outputFilePath);
                }
            });
        } catch (parseError) {
            console.error('Помилка при парсингу JSON:', parseError);
        }
    }
});

