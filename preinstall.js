const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '.env');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('PORT=')) {
            console.log("find!");
            lines[i] = "PORT=3005";
        }
    }

    const updatedData = lines.join('\n');

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }

        
    });
});
