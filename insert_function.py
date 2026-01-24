import sys

# Read the file
with open('src/services/googleSheetsAPI.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the insertion point (after rejectComment function)
insert_index = None
for i, line in enumerate(lines):
    if '/**' in line and i > 0:
        # Check if previous lines contain the end of rejectComment
        prev_lines = ''.join(lines[max(0, i-10):i])
        if 'rejectComment' in prev_lines and 'Exporter' in line:
            insert_index = i
            break

if insert_index is None:
    print("Could not find insertion point")
    sys.exit(1)

# Create the new function
new_function = """/**
 * Supprimer définitivement un commentaire
 */
export async function deleteComment(id: string): Promise<void> {
    try {
        const params = new URLSearchParams({
            action: 'deleteComment',
            id: id,
            _: new Date().getTime().toString()
        });

        const response = await fetch(`${API_URL}?${params.toString()}`);
        const result: APIResponse<any> = await response.json();

        if (!result.success) {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        throw error;
    }
}

"""

# Insert the function
lines.insert(insert_index, new_function)

# Write back
with open('src/services/googleSheetsAPI.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"Function inserted at line {insert_index}")
