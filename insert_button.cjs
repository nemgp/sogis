const fs = require('fs');

const content = fs.readFileSync('src/pages/Admin.tsx', 'utf8');
const lines = content.split('\n');

// Find the line with the reject button closing tag
let insertIndex = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('admin.action.reject') && i < 610) {
        // Find the next </button>
        for (let j = i; j < lines.length; j++) {
            if (lines[j].trim() === '</button>') {
                insertIndex = j + 1;
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

// Create the new button
const newButton = `                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="flex-1 btn-secondary flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 py-3 sm:py-2"
                                                >
                                                    <Trash2 size={20} />
                                                    {t('admin.action.delete')}
                                                </button>`;

// Insert the button
lines.splice(insertIndex, 0, newButton);

// Write back
fs.writeFileSync('src/pages/Admin.tsx', lines.join('\n'), 'utf8');

console.log(`Button inserted at line ${insertIndex}`);
