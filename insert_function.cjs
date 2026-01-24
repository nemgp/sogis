const fs = require('fs');

// Read the file
const content = fs.readFileSync('src/services/googleSheetsAPI.ts', 'utf8');
const lines = content.split('\n');

// Find the line with "Exporter les demandes"
let insertIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Exporter les demandes')) {
        // Go back to find the /** comment start
        for (let j = i; j >= 0; j--) {
            if (lines[j].trim() === '/**') {
                insertIndex = j;
                break;
            }
        }
        break;
    }
}

if (insertIndex === -1) {
    console.error('Could not find insertion point');
    process.exit(1);
}

// Create the new function
const newFunction = `/**
 * Supprimer définitivement un commentaire
 */
export async function deleteComment(id: string): Promise<void> {
    try {
        const params = new URLSearchParams({
            action: 'deleteComment',
            id: id,
            _: new Date().getTime().toString()
        });

        const response = await fetch(\`\${API_URL}?\${params.toString()}\`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        throw error;
    }
}

`;

// Insert the function
lines.splice(insertIndex, 0, newFunction);

// Write back
fs.writeFileSync('src/services/googleSheetsAPI.ts', lines.join('\n'), 'utf8');

console.log(`Function inserted at line ${insertIndex}`);
